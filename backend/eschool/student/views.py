from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Student, StudentParent, StudentActivity, StudentDiary, Scholarship, StudentScholarship
from .serializers import (
    StudentSerializer, StudentDetailSerializer, StudentListSerializer,
    StudentParentSerializer, StudentActivitySerializer, StudentDiarySerializer,
    ScholarshipSerializer, StudentScholarshipSerializer
)


class StudentViewSet(viewsets.ModelViewSet):
    """ViewSet for Student model"""
    
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'level', 'section', 'department', 'gender']
    search_fields = ['name', 'student_number', 'email', 'phone']
    ordering_fields = ['name', 'enroll_date', 'created_at']
    ordering = ['name']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return StudentListSerializer
        elif self.action == 'retrieve':
            return StudentDetailSerializer
        return StudentSerializer
    
    @action(detail=True, methods=['get'])
    def parents(self, request, pk=None):
        """Get parents for a specific student"""
        student = self.get_object()
        parents = student.parents.filter(is_active=True)
        serializer = StudentParentSerializer(parents, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def activities(self, request, pk=None):
        """Get activities for a specific student"""
        student = self.get_object()
        activities = student.activities.filter(is_active=True)
        serializer = StudentActivitySerializer(activities, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def diary(self, request, pk=None):
        """Get diary entries for a specific student"""
        student = self.get_object()
        diary = student.diary_entries.all()
        serializer = StudentDiarySerializer(diary, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def scholarships(self, request, pk=None):
        """Get scholarships for a specific student"""
        student = self.get_object()
        scholarships = student.scholarships.filter(is_active=True)
        serializer = StudentScholarshipSerializer(scholarships, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_parent(self, request, pk=None):
        """Add a parent to student"""
        student = self.get_object()
        serializer = StudentParentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=student)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_activity(self, request, pk=None):
        """Add an activity to student"""
        student = self.get_object()
        serializer = StudentActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=student)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_level(self, request):
        """Get students grouped by level"""
        from django.db.models import Count
        
        levels = Student.objects.values('level__level_name').annotate(
            count=Count('id')
        ).order_by('level__level_no')
        
        return Response(list(levels))
    
    @action(detail=False, methods=['get'])
    def by_department(self, request):
        """Get students grouped by department"""
        from django.db.models import Count
        
        departments = Student.objects.values('department__d_name').annotate(
            count=Count('id')
        ).order_by('department__d_name')
        
        return Response(list(departments))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get student statistics"""
        from django.db.models import Count, Avg
        from datetime import date
        
        stats = {
            'total_students': Student.objects.count(),
            'active_students': Student.objects.filter(status='active').count(),
            'by_level': list(Student.objects.values('level__level_name').annotate(count=Count('id'))),
            'by_department': list(Student.objects.values('department__d_name').annotate(count=Count('id'))),
            'by_gender': list(Student.objects.values('gender').annotate(count=Count('id'))),
            'average_age': round(
                Student.objects.aggregate(
                    avg_age=Avg('date_of_birth')
                )['avg_age'] or 0, 2
            ),
        }
        return Response(stats)


class StudentParentViewSet(viewsets.ModelViewSet):
    """ViewSet for StudentParent model"""
    
    queryset = StudentParent.objects.all()
    serializer_class = StudentParentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student', 'parent', 'relationship', 'is_active']
    search_fields = ['student__name', 'parent__name']
    ordering_fields = ['created_at']
    ordering = ['-created_at']


class StudentActivityViewSet(viewsets.ModelViewSet):
    """ViewSet for StudentActivity model"""
    
    queryset = StudentActivity.objects.all()
    serializer_class = StudentActivitySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student', 'activity_type', 'is_active']
    search_fields = ['student__name', 'activity_name']
    ordering_fields = ['start_date', 'end_date']
    ordering = ['-start_date']


class StudentDiaryViewSet(viewsets.ModelViewSet):
    """ViewSet for StudentDiary model"""
    
    queryset = StudentDiary.objects.all()
    serializer_class = StudentDiarySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student', 'subject', 'is_completed']
    search_fields = ['student__name', 'subject__s_name', 'task']
    ordering_fields = ['due_date', 'completion_date']
    ordering = ['-due_date']
    
    @action(detail=False, methods=['get'])
    def overdue(self, request):
        """Get overdue diary entries"""
        from datetime import date
        today = date.today()
        overdue = StudentDiary.objects.filter(
            due_date__lt=today, is_completed=False
        )
        serializer = StudentDiarySerializer(overdue, many=True)
        return Response(serializer.data)


class ScholarshipViewSet(viewsets.ModelViewSet):
    """ViewSet for Scholarship model"""
    
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['scholarship_type', 'is_active']
    search_fields = ['name', 'description', 'criteria']
    ordering_fields = ['name', 'amount']
    ordering = ['name']


class StudentScholarshipViewSet(viewsets.ModelViewSet):
    """ViewSet for StudentScholarship model"""
    
    queryset = StudentScholarship.objects.all()
    serializer_class = StudentScholarshipSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student', 'scholarship', 'academic_year', 'is_active']
    search_fields = ['student__name', 'scholarship__name']
    ordering_fields = ['award_date', 'amount_awarded']
    ordering = ['-award_date']