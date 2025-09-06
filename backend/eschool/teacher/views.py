from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Teacher, TeacherSubject, TeacherClass, TeacherPerformance
from .serializers import (
    TeacherSerializer, TeacherDetailSerializer, TeacherListSerializer,
    TeacherSubjectSerializer, TeacherClassSerializer, TeacherPerformanceSerializer
)


class TeacherViewSet(viewsets.ModelViewSet):
    """ViewSet for Teacher model"""
    
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_class_teacher', 'teacher_id__department', 'specialization']
    search_fields = ['teacher_id__name', 'qualification', 'specialization']
    ordering_fields = ['teacher_id__name', 'years_of_experience']
    ordering = ['teacher_id__name']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return TeacherListSerializer
        elif self.action == 'retrieve':
            return TeacherDetailSerializer
        return TeacherSerializer
    
    @action(detail=True, methods=['get'])
    def subjects(self, request, pk=None):
        """Get subjects taught by a specific teacher from section assignments"""
        from level.models import SectionSubject
        
        teacher = self.get_object()
        
        # Get section subjects for this teacher
        section_subjects = SectionSubject.objects.filter(teacher=teacher, is_active=True)
        
        # Convert to the expected format
        subjects_data = []
        for ss in section_subjects:
            subjects_data.append({
                'id': ss.id,
                'subject': ss.subject.s_code,
                'subject_name': ss.subject.s_name,
                'subject_code': ss.subject.s_code,
                'is_active': ss.is_active,
                'start_date': ss.created_at.date(),
                'end_date': None,
                'section_name': ss.section.section_name,
                'section_id': ss.section.id
            })
        
        return Response(subjects_data)
    
    @action(detail=True, methods=['get'])
    def classes(self, request, pk=None):
        """Get classes taught by a specific teacher"""
        teacher = self.get_object()
        classes = teacher.classes_taught.filter(is_active=True)
        serializer = TeacherClassSerializer(classes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def performance(self, request, pk=None):
        """Get performance records for a specific teacher"""
        teacher = self.get_object()
        performance = teacher.performance_records.all()
        serializer = TeacherPerformanceSerializer(performance, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_subject(self, request, pk=None):
        """Add a subject to teacher's teaching load"""
        teacher = self.get_object()
        serializer = TeacherSubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(teacher=teacher)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_class(self, request, pk=None):
        """Add a class to teacher's teaching load"""
        teacher = self.get_object()
        serializer = TeacherClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(teacher=teacher)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_specialization(self, request):
        """Get teachers grouped by specialization"""
        from django.db.models import Count
        
        specializations = Teacher.objects.values('specialization').annotate(
            count=Count('id')
        ).order_by('specialization')
        
        return Response(list(specializations))
    
    @action(detail=False, methods=['get'])
    def class_teachers(self, request):
        """Get all class teachers"""
        class_teachers = Teacher.objects.filter(is_class_teacher=True)
        serializer = TeacherListSerializer(class_teachers, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get teacher statistics"""
        from django.db.models import Count, Avg
        
        stats = {
            'total_teachers': Teacher.objects.count(),
            'class_teachers': Teacher.objects.filter(is_class_teacher=True).count(),
            'by_specialization': list(
                Teacher.objects.values('specialization').annotate(count=Count('id'))
            ),
            'average_experience': round(
                Teacher.objects.aggregate(
                    avg_exp=Avg('years_of_experience')
                )['avg_exp'] or 0, 2
            ),
        }
        return Response(stats)


class TeacherSubjectViewSet(viewsets.ModelViewSet):
    """ViewSet for TeacherSubject model"""
    
    queryset = TeacherSubject.objects.all()
    serializer_class = TeacherSubjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['teacher', 'subject', 'is_active']
    search_fields = ['teacher__teacher_id__name', 'subject__s_name']
    ordering_fields = ['start_date', 'end_date']
    ordering = ['-start_date']


class TeacherClassViewSet(viewsets.ModelViewSet):
    """ViewSet for TeacherClass model"""
    
    queryset = TeacherClass.objects.all()
    serializer_class = TeacherClassSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['teacher', 'class_room', 'subject', 'is_active']
    search_fields = ['teacher__teacher_id__name', 'subject__s_name', 'class_room__room_name']
    ordering_fields = ['start_date', 'end_date']
    ordering = ['-start_date']


class TeacherPerformanceViewSet(viewsets.ModelViewSet):
    """ViewSet for TeacherPerformance model"""
    
    queryset = TeacherPerformance.objects.all()
    serializer_class = TeacherPerformanceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['teacher', 'overall_rating', 'evaluator']
    search_fields = ['teacher__teacher_id__name', 'evaluator__name']
    ordering_fields = ['evaluation_date', 'overall_rating']
    ordering = ['-evaluation_date']
    
    @action(detail=False, methods=['get'])
    def by_rating(self, request):
        """Get performance records grouped by rating"""
        from django.db.models import Count
        
        ratings = TeacherPerformance.objects.values('overall_rating').annotate(
            count=Count('id')
        ).order_by('overall_rating')
        
        return Response(list(ratings))