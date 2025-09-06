from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import datetime, timedelta
from decimal import Decimal

from .models import FinancialTransaction, FinancialSummary, Budget
from .serializers import (
    FinancialTransactionSerializer, FinancialSummarySerializer,
    BudgetSerializer, FinancialOverviewSerializer
)


class FinancialTransactionViewSet(viewsets.ModelViewSet):
    """ViewSet for FinancialTransaction model"""
    
    queryset = FinancialTransaction.objects.all()
    serializer_class = FinancialTransactionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['transaction_type', 'category', 'payment_method', 'reference_type']
    search_fields = ['description', 'reference_id', 'notes']
    ordering_fields = ['transaction_date', 'amount', 'created_at']
    ordering = ['-transaction_date', '-created_at']
    
    def perform_create(self, serializer):
        """Set created_by when creating a transaction"""
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['get'])
    def overview(self, request):
        """Get financial overview with key metrics"""
        # Get date range from query params
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=365)  # Last year by default
        
        if request.query_params.get('start_date'):
            start_date = datetime.strptime(request.query_params.get('start_date'), '%Y-%m-%d').date()
        if request.query_params.get('end_date'):
            end_date = datetime.strptime(request.query_params.get('end_date'), '%Y-%m-%d').date()
        
        # Get transactions in date range
        transactions = FinancialTransaction.objects.filter(
            transaction_date__range=[start_date, end_date]
        )
        
        # Calculate totals
        revenue_total = transactions.filter(transaction_type='revenue').aggregate(
            total=Sum('amount')
        )['total'] or Decimal('0.00')
        
        expense_total = transactions.filter(transaction_type='expense').aggregate(
            total=Sum('amount')
        )['total'] or Decimal('0.00')
        
        # Calculate specific categories
        student_fees = transactions.filter(
            transaction_type='revenue',
            category='student_fees'
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
        
        other_revenue = revenue_total - student_fees
        
        salary_expenses = transactions.filter(
            transaction_type='expense',
            category='salaries'
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
        
        operational_expenses = expense_total - salary_expenses
        
        net_profit = revenue_total - expense_total
        profit_margin = (net_profit / revenue_total * 100) if revenue_total > 0 else Decimal('0.00')
        
        total_transactions = transactions.count()
        
        overview_data = {
            'total_revenue': revenue_total,
            'total_expenses': expense_total,
            'net_profit': net_profit,
            'profit_margin': profit_margin,
            'student_fees_revenue': student_fees,
            'other_revenue': other_revenue,
            'salary_expenses': salary_expenses,
            'operational_expenses': operational_expenses,
            'total_transactions': total_transactions,
        }
        
        serializer = FinancialOverviewSerializer(overview_data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def monthly_trend(self, request):
        """Get monthly revenue and expense trends"""
        year = int(request.query_params.get('year', timezone.now().year))
        
        monthly_data = []
        for month in range(1, 13):
            transactions = FinancialTransaction.objects.filter(
                transaction_date__year=year,
                transaction_date__month=month
            )
            
            revenue = transactions.filter(transaction_type='revenue').aggregate(
                total=Sum('amount')
            )['total'] or Decimal('0.00')
            
            expenses = transactions.filter(transaction_type='expense').aggregate(
                total=Sum('amount')
            )['total'] or Decimal('0.00')
            
            monthly_data.append({
                'month': month,
                'month_name': datetime(year, month, 1).strftime('%B'),
                'revenue': revenue,
                'expenses': expenses,
                'net_profit': revenue - expenses
            })
        
        return Response(monthly_data)
    
    @action(detail=False, methods=['get'])
    def category_breakdown(self, request):
        """Get breakdown by category"""
        transaction_type = request.query_params.get('type', 'expense')
        
        # Get date range
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=365)
        
        if request.query_params.get('start_date'):
            start_date = datetime.strptime(request.query_params.get('start_date'), '%Y-%m-%d').date()
        if request.query_params.get('end_date'):
            end_date = datetime.strptime(request.query_params.get('end_date'), '%Y-%m-%d').date()
        
        breakdown = FinancialTransaction.objects.filter(
            transaction_type=transaction_type,
            transaction_date__range=[start_date, end_date]
        ).values('category').annotate(
            total=Sum('amount'),
            count=Count('transaction_id')
        ).order_by('-total')
        
        return Response(list(breakdown))
    
    @action(detail=False, methods=['post'])
    def record_student_payment(self, request):
        """Record a student payment and create corresponding financial transaction"""
        from parent.models import Payment
        from parent.serializers import PaymentSerializer
        
        # Create payment record
        payment_serializer = PaymentSerializer(data=request.data)
        if payment_serializer.is_valid():
            payment = payment_serializer.save()
            
            # Create financial transaction
            transaction_data = {
                'transaction_type': 'revenue',
                'category': 'student_fees',
                'amount': payment.total_amount,
                'description': f"Student fee payment - {payment.get_payment_type_display()}",
                'transaction_date': payment.payment_date or timezone.now().date(),
                'payment_method': payment.payment_method,
                'reference_id': str(payment.pay_id),
                'reference_type': 'payment',
                'notes': payment.description
            }
            
            transaction_serializer = FinancialTransactionSerializer(data=transaction_data)
            if transaction_serializer.is_valid():
                transaction_serializer.save(created_by=request.user)
                
                return Response({
                    'payment': payment_serializer.data,
                    'transaction': transaction_serializer.data
                }, status=status.HTTP_201_CREATED)
            else:
                # If transaction creation fails, delete the payment
                payment.delete()
                return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def record_salary_payment(self, request):
        """Record a salary payment and create corresponding financial transaction"""
        from employee.models import EmployeeSalary
        from employee.serializers import EmployeeSalarySerializer
        
        # Create salary record
        salary_serializer = EmployeeSalarySerializer(data=request.data)
        if salary_serializer.is_valid():
            salary = salary_serializer.save()
            
            # Create financial transaction
            transaction_data = {
                'transaction_type': 'expense',
                'category': 'salaries',
                'amount': salary.net_salary,
                'description': f"Salary payment - {salary.employee.name} ({salary.month})",
                'transaction_date': salary.paid_date or timezone.now().date(),
                'payment_method': 'bank_transfer',  # Default for salaries
                'reference_id': str(salary.sal_id),
                'reference_type': 'salary',
                'notes': salary.notes
            }
            
            transaction_serializer = FinancialTransactionSerializer(data=transaction_data)
            if transaction_serializer.is_valid():
                transaction_serializer.save(created_by=request.user)
                
                return Response({
                    'salary': salary_serializer.data,
                    'transaction': transaction_serializer.data
                }, status=status.HTTP_201_CREATED)
            else:
                # If transaction creation fails, delete the salary record
                salary.delete()
                return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(salary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FinancialSummaryViewSet(viewsets.ModelViewSet):
    """ViewSet for FinancialSummary model"""
    
    queryset = FinancialSummary.objects.all()
    serializer_class = FinancialSummarySerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['period_type', 'year', 'month']
    ordering_fields = ['year', 'month', 'total_revenue', 'total_expenses', 'net_profit']
    ordering = ['-year', '-month']
    
    @action(detail=False, methods=['post'])
    def generate_summary(self, request):
        """Generate financial summary for a specific period"""
        period_type = request.data.get('period_type', 'monthly')
        year = int(request.data.get('year', timezone.now().year))
        month = request.data.get('month')
        
        if period_type == 'monthly' and not month:
            return Response(
                {'error': 'Month is required for monthly summaries'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Calculate date range
        if period_type == 'monthly':
            start_date = datetime(year, int(month), 1).date()
            if int(month) == 12:
                end_date = datetime(year + 1, 1, 1).date() - timedelta(days=1)
            else:
                end_date = datetime(year, int(month) + 1, 1).date() - timedelta(days=1)
        else:  # yearly
            start_date = datetime(year, 1, 1).date()
            end_date = datetime(year, 12, 31).date()
        
        # Get transactions for the period
        transactions = FinancialTransaction.objects.filter(
            transaction_date__range=[start_date, end_date]
        )
        
        # Calculate totals
        total_revenue = transactions.filter(transaction_type='revenue').aggregate(
            total=Sum('amount')
        )['total'] or Decimal('0.00')
        
        total_expenses = transactions.filter(transaction_type='expense').aggregate(
            total=Sum('amount')
        )['total'] or Decimal('0.00')
        
        student_fees_revenue = transactions.filter(
            transaction_type='revenue',
            category='student_fees'
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
        
        salary_expenses = transactions.filter(
            transaction_type='expense',
            category='salaries'
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
        
        operational_expenses = total_expenses - salary_expenses
        transaction_count = transactions.count()
        
        # Create or update summary
        summary, created = FinancialSummary.objects.update_or_create(
            period_type=period_type,
            year=year,
            month=int(month) if month else None,
            defaults={
                'total_revenue': total_revenue,
                'total_expenses': total_expenses,
                'student_fees_revenue': student_fees_revenue,
                'salary_expenses': salary_expenses,
                'operational_expenses': operational_expenses,
                'transaction_count': transaction_count,
            }
        )
        
        serializer = FinancialSummarySerializer(summary)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class BudgetViewSet(viewsets.ModelViewSet):
    """ViewSet for Budget model"""
    
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['budget_type', 'category', 'year', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['year', 'quarter', 'month', 'budgeted_amount', 'actual_amount']
    ordering = ['-year', '-quarter', '-month']
    
    @action(detail=False, methods=['get'])
    def current_year(self, request):
        """Get budgets for current year"""
        current_year = timezone.now().year
        budgets = Budget.objects.filter(year=current_year, is_active=True)
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def over_budget(self, request):
        """Get budgets that are over budget"""
        from django.db import models as django_models
        over_budget = Budget.objects.filter(
            actual_amount__gt=django_models.F('budgeted_amount'),
            is_active=True
        )
        serializer = BudgetSerializer(over_budget, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_actual(self, request, pk=None):
        """Update actual amount for a budget"""
        budget = self.get_object()
        actual_amount = request.data.get('actual_amount')
        
        if actual_amount is None:
            return Response(
                {'error': 'actual_amount is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            budget.actual_amount = Decimal(str(actual_amount))
            budget.save()
            serializer = BudgetSerializer(budget)
            return Response(serializer.data)
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid actual_amount value'},
                status=status.HTTP_400_BAD_REQUEST
            )
