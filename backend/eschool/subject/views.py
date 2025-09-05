from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Subject, SubjectSyllabus, SubjectMaterial
from .serializers import (
    SubjectSerializer, SubjectDetailSerializer, SubjectListSerializer,
    SubjectSyllabusSerializer, SubjectMaterialSerializer
)


class SubjectViewSet(viewsets.ModelViewSet):
    """ViewSet for Subject model"""
    
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['subject_type', 'difficulty_level', 'department', 'is_active']
    search_fields = ['s_name', 's_code', 'description']
    ordering_fields = ['s_code', 's_name']
    ordering = ['s_code']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return SubjectListSerializer
        elif self.action == 'retrieve':
            return SubjectDetailSerializer
        return SubjectSerializer
    
    @action(detail=True, methods=['get'])
    def syllabi(self, request, pk=None):
        """Get syllabi for a specific subject"""
        subject = self.get_object()
        syllabi = subject.syllabi.filter(is_active=True)
        serializer = SubjectSyllabusSerializer(syllabi, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def materials(self, request, pk=None):
        """Get materials for a specific subject"""
        subject = self.get_object()
        materials = subject.materials.filter(is_active=True)
        serializer = SubjectMaterialSerializer(materials, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def teachers(self, request, pk=None):
        """Get teachers teaching this subject"""
        subject = self.get_object()
        teachers = subject.teachers_teaching.filter(is_active=True)
        from teacher.serializers import TeacherListSerializer
        serializer = TeacherListSerializer([t.teacher for t in teachers], many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def levels(self, request, pk=None):
        """Get levels where this subject is taught"""
        subject = self.get_object()
        levels = subject.levels.filter(is_active=True)
        from level.serializers import LevelSerializer
        serializer = LevelSerializer([ls.level for ls in levels], many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_syllabus(self, request, pk=None):
        """Add a syllabus to subject"""
        subject = self.get_object()
        serializer = SubjectSyllabusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(subject=subject)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_material(self, request, pk=None):
        """Add a material to subject"""
        subject = self.get_object()
        serializer = SubjectMaterialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(subject=subject)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get subjects grouped by type"""
        from django.db.models import Count
        
        types = Subject.objects.values('subject_type').annotate(
            count=Count('id')
        ).order_by('subject_type')
        
        return Response(list(types))
    
    @action(detail=False, methods=['get'])
    def by_department(self, request):
        """Get subjects grouped by department"""
        from django.db.models import Count
        
        departments = Subject.objects.values('department__d_name').annotate(
            count=Count('id')
        ).order_by('department__d_name')
        
        return Response(list(departments))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get subject statistics"""
        from django.db.models import Count
        
        stats = {
            'total_subjects': Subject.objects.count(),
            'active_subjects': Subject.objects.filter(is_active=True).count(),
            'by_type': list(Subject.objects.values('subject_type').annotate(count=Count('id'))),
            'by_department': list(Subject.objects.values('department__d_name').annotate(count=Count('id'))),
            'by_difficulty': list(Subject.objects.values('difficulty_level').annotate(count=Count('id'))),
        }
        return Response(stats)


class SubjectSyllabusViewSet(viewsets.ModelViewSet):
    """ViewSet for SubjectSyllabus model"""
    
    queryset = SubjectSyllabus.objects.all()
    serializer_class = SubjectSyllabusSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['subject', 'level', 'academic_year', 'is_active']
    search_fields = ['subject__s_name', 'level__level_name', 'academic_year']
    ordering_fields = ['academic_year', 'subject__s_name']
    ordering = ['-academic_year', 'subject__s_name']


class SubjectMaterialViewSet(viewsets.ModelViewSet):
    """ViewSet for SubjectMaterial model"""
    
    queryset = SubjectMaterial.objects.all()
    serializer_class = SubjectMaterialSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['subject', 'level', 'material_type', 'is_required', 'is_active']
    search_fields = ['subject__s_name', 'title', 'description']
    ordering_fields = ['title', 'material_type']
    ordering = ['subject__s_name', 'title']