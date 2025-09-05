from datetime import timezone
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Parent, Payment, PaymentHistory
from .serializers import (
    ParentSerializer, ParentDetailSerializer, ParentListSerializer,
    PaymentSerializer, PaymentHistorySerializer
)


class ParentViewSet(viewsets.ModelViewSet):
    """ViewSet for Parent model"""
    
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['gender', 'occupation', 'is_primary_contact', 'is_emergency_contact']
    search_fields = ['name', 'email', 'phone', 'workplace']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return ParentListSerializer
        elif self.action == 'retrieve':
            return ParentDetailSerializer
        return ParentSerializer
    
    @action(detail=True, methods=['get'])
    def children(self, request, pk=None):
        """Get children for a specific parent"""
        parent = self.get_object()
        children = parent.children.filter(is_active=True)
        from student.serializers import StudentListSerializer
        serializer = StudentListSerializer([sp.student for sp in children], many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def payments(self, request, pk=None):
        """Get payments for a specific parent"""
        parent = self.get_object()
        payments = parent.payments.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def make_payment(self, request, pk=None):
        """Make a payment for a parent"""
        parent = self.get_object()
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(parent=parent)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_occupation(self, request):
        """Get parents grouped by occupation"""
        from django.db.models import Count
        
        occupations = Parent.objects.values('occupation').annotate(
            count=Count('id')
        ).order_by('occupation')
        
        return Response(list(occupations))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get parent statistics"""
        from django.db.models import Count
        
        stats = {
            'total_parents': Parent.objects.count(),
            'primary_contacts': Parent.objects.filter(is_primary_contact=True).count(),
            'emergency_contacts': Parent.objects.filter(is_emergency_contact=True).count(),
            'by_occupation': list(Parent.objects.values('occupation').annotate(count=Count('id'))),
            'by_gender': list(Parent.objects.values('gender').annotate(count=Count('id'))),
        }
        return Response(stats)


class PaymentViewSet(viewsets.ModelViewSet):
    """ViewSet for Payment model"""
    
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['parent', 'student', 'payment_type', 'status', 'academic_year']
    search_fields = ['parent__name', 'student__name', 'transaction_id']
    ordering_fields = ['due_date', 'payment_date', 'amount']
    ordering = ['-due_date']
    
    @action(detail=False, methods=['get'])
    def overdue(self, request):
        """Get overdue payments"""
        overdue_payments = Payment.objects.filter(
            status='pending', due_date__lt=timezone.now().date()
        )
        serializer = PaymentSerializer(overdue_payments, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Get pending payments"""
        pending_payments = Payment.objects.filter(status='pending')
        serializer = PaymentSerializer(pending_payments, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get payments grouped by type"""
        from django.db.models import Count, Sum
        
        types = Payment.objects.values('payment_type').annotate(
            count=Count('id'),
            total_amount=Sum('amount')
        ).order_by('payment_type')
        
        return Response(list(types))
    
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """Get payments grouped by status"""
        from django.db.models import Count, Sum
        
        statuses = Payment.objects.values('status').annotate(
            count=Count('id'),
            total_amount=Sum('amount')
        ).order_by('status')
        
        return Response(list(statuses))
    
    @action(detail=True, methods=['post'])
    def mark_paid(self, request, pk=None):
        """Mark a payment as paid"""
        payment = self.get_object()
        payment.status = 'paid'
        payment.payment_date = timezone.now().date()
        payment.save()
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get payment summary"""
        from django.db.models import Sum, Count
        from django.utils import timezone
        
        today = timezone.now().date()
        
        summary = {
            'total_payments': Payment.objects.count(),
            'total_amount': Payment.objects.aggregate(Sum('amount'))['amount__sum'] or 0,
            'paid_amount': Payment.objects.filter(status='paid').aggregate(Sum('amount'))['amount__sum'] or 0,
            'pending_amount': Payment.objects.filter(status='pending').aggregate(Sum('amount'))['amount__sum'] or 0,
            'overdue_count': Payment.objects.filter(
                status='pending', due_date__lt=today
            ).count(),
            'by_status': list(Payment.objects.values('status').annotate(
                count=Count('id'),
                total=Sum('amount')
            )),
        }
        return Response(summary)
    
    @action(detail=False, methods=['get'])
    def summary_by_student(self, request, student_id=None):
        """Get payment summary for a specific student"""
        from django.db.models import Sum, Count
        from django.utils import timezone
        
        if not student_id:
            return Response({'error': 'Student ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        today = timezone.now().date()
        student_payments = Payment.objects.filter(student_id=student_id)
        
        summary = {
            'total_due': student_payments.filter(status__in=['pending', 'overdue']).aggregate(Sum('total_amount'))['total_amount__sum'] or 0,
            'total_paid': student_payments.filter(status='paid').aggregate(Sum('total_amount'))['total_amount__sum'] or 0,
            'total_overdue': student_payments.filter(status='overdue').aggregate(Sum('total_amount'))['total_amount__sum'] or 0,
            'pending_payments': student_payments.filter(status='pending').count(),
            'overdue_payments': student_payments.filter(status='overdue').count(),
            'payment_rate': 0
        }
        
        if summary['total_due'] > 0:
            summary['payment_rate'] = round((summary['total_paid'] / (summary['total_due'] + summary['total_paid'])) * 100, 2)
        
        return Response(summary)
    
    @action(detail=False, methods=['get'])
    def monthly(self, request, student_id=None, year=None, month=None):
        """Get monthly payments for a specific student"""
        if not all([student_id, year, month]):
            return Response({'error': 'Student ID, year, and month are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        monthly_payments = Payment.objects.filter(
            student_id=student_id,
            due_date__year=year,
            due_date__month=month
        )
        
        serializer = PaymentSerializer(monthly_payments, many=True)
        return Response(serializer.data)


class PaymentHistoryViewSet(viewsets.ModelViewSet):
    """ViewSet for PaymentHistory model"""
    
    queryset = PaymentHistory.objects.all()
    serializer_class = PaymentHistorySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['payment', 'status', 'payment_date']
    search_fields = ['payment__student__name', 'transaction_id']
    ordering_fields = ['due_date', 'payment_date', 'amount']
    ordering = ['-due_date']