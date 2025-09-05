from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from .models import Employee, EmployeeAttendance, Experience
from .serializers import (
    EmployeeSerializer, EmployeeDetailSerializer, EmployeeListSerializer,
    EmployeeAttendanceSerializer, ExperienceSerializer
)


class EmployeeViewSet(viewsets.ModelViewSet):
    """ViewSet for Employee model"""
    
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['role', 'status', 'department', 'position']
    search_fields = ['name', 'email', 'position', 'skills']
    ordering_fields = ['name', 'join_date', 'created_at']
    ordering = ['name']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return EmployeeListSerializer
        elif self.action == 'retrieve':
            return EmployeeDetailSerializer
        return EmployeeSerializer
    
    @action(detail=True, methods=['get'])
    def attendance(self, request, pk=None):
        """Get attendance records for a specific employee"""
        employee = self.get_object()
        attendance = employee.attendance_records.all()
        serializer = EmployeeAttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def experience(self, request, pk=None):
        """Get experience records for a specific employee"""
        employee = self.get_object()
        experience = employee.experiences.all()
        serializer = ExperienceSerializer(experience, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_attendance(self, request, pk=None):
        """Mark attendance for an employee"""
        employee = self.get_object()
        serializer = EmployeeAttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employee=employee)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_role(self, request):
        """Get employees grouped by role"""
        from django.db.models import Count
        
        roles = Employee.objects.values('role').annotate(
            count=Count('id')
        ).order_by('role')
        
        return Response(list(roles))
    
    @action(detail=False, methods=['get'])
    def by_department(self, request):
        """Get employees grouped by department"""
        from django.db.models import Count
        
        departments = Employee.objects.values(
            'department__d_name'
        ).annotate(
            count=Count('id')
        ).order_by('department__d_name')
        
        return Response(list(departments))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get employee statistics"""
        from django.db.models import Count, Avg
        from datetime import date
        
        stats = {
            'total_employees': Employee.objects.count(),
            'active_employees': Employee.objects.filter(status='active').count(),
            'by_role': list(Employee.objects.values('role').annotate(count=Count('id'))),
            'by_department': list(Employee.objects.values('department__d_name').annotate(count=Count('id'))),
            'average_years_of_service': round(
                Employee.objects.aggregate(
                    avg_years=Avg('join_date')
                )['avg_years'] or 0, 2
            ),
        }
        return Response(stats)


class EmployeeAttendanceViewSet(viewsets.ModelViewSet):
    """ViewSet for EmployeeAttendance model"""
    
    queryset = EmployeeAttendance.objects.all()
    serializer_class = EmployeeAttendanceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['employee', 'status', 'date']
    search_fields = ['employee__name', 'notes']
    ordering_fields = ['date', 'check_in_time']
    ordering = ['-date']
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's attendance records"""
        from datetime import date
        today = date.today()
        attendance = EmployeeAttendance.objects.filter(date=today)
        serializer = EmployeeAttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get attendance summary"""
        from django.db.models import Count
        from datetime import date, timedelta
        
        today = date.today()
        week_ago = today - timedelta(days=7)
        
        summary = {
            'today_attendance': EmployeeAttendance.objects.filter(date=today).count(),
            'present_today': EmployeeAttendance.objects.filter(
                date=today, status='present'
            ).count(),
            'absent_today': EmployeeAttendance.objects.filter(
                date=today, status='absent'
            ).count(),
            'week_summary': list(
                EmployeeAttendance.objects.filter(
                    date__gte=week_ago
                ).values('status').annotate(count=Count('id'))
            ),
        }
        return Response(summary)


class ExperienceViewSet(viewsets.ModelViewSet):
    """ViewSet for Experience model"""
    
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['employee', 'department']
    search_fields = ['employee__name', 'department__d_name', 'position']
    ordering_fields = ['start_date', 'end_date']
    ordering = ['-start_date']