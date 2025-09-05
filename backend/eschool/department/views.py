from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from .models import Department, Finance
from .serializers import (
    DepartmentSerializer, DepartmentDetailSerializer,
    FinanceSerializer
)


class DepartmentViewSet(viewsets.ModelViewSet):
    """ViewSet for Department model"""
    
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['d_type', 'location']
    search_fields = ['d_name', 'description', 'location']
    ordering_fields = ['d_name', 'created_at']
    ordering = ['d_name']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'retrieve':
            return DepartmentDetailSerializer
        return DepartmentSerializer
    
    @action(detail=True, methods=['get'])
    def finances(self, request, pk=None):
        """Get finances for a specific department"""
        department = self.get_object()
        finances = department.finances.all()
        serializer = FinanceSerializer(finances, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def employees(self, request, pk=None):
        """Get employees for a specific department"""
        department = self.get_object()
        employees = department.employees.all()
        from employee.serializers import EmployeeListSerializer
        serializer = EmployeeListSerializer(employees, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        """Get students for a specific department"""
        department = self.get_object()
        students = department.students.all()
        from student.serializers import StudentListSerializer
        serializer = StudentListSerializer(students, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        """Get department statistics"""
        department = self.get_object()
        stats = {
            'employee_count': department.employee_count,
            'student_count': department.student_count,
            'total_finances': department.finances.count(),
            'active_events': department.events.filter(status='confirmed').count(),
        }
        return Response(stats)


class FinanceViewSet(viewsets.ModelViewSet):
    """ViewSet for Finance model"""
    
    queryset = Finance.objects.all()
    serializer_class = FinanceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['department', 'status', 'date']
    search_fields = ['report', 'department__d_name']
    ordering_fields = ['date', 'total_fee', 'total_expense']
    ordering = ['-date']
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get financial summary"""
        from django.db.models import Sum, Avg
        
        total_fee = Finance.objects.aggregate(Sum('total_fee'))['total_fee__sum'] or 0
        total_expense = Finance.objects.aggregate(Sum('total_expense'))['total_expense__sum'] or 0
        avg_collection_rate = Finance.objects.aggregate(Avg('fee_collection_rate'))['fee_collection_rate__avg'] or 0
        
        summary = {
            'total_fee': total_fee,
            'total_expense': total_expense,
            'net_balance': total_fee - total_expense,
            'average_collection_rate': round(avg_collection_rate, 2),
            'total_reports': Finance.objects.count(),
        }
        return Response(summary)
    
    @action(detail=False, methods=['get'])
    def by_department(self, request):
        """Get finances grouped by department"""
        from django.db.models import Sum
        
        departments = Department.objects.annotate(
            total_fee=Sum('finances__total_fee'),
            total_expense=Sum('finances__total_expense')
        ).values('d_name', 'total_fee', 'total_expense')
        
        return Response(list(departments))