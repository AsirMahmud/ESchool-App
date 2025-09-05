from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Level, Section, LevelSubject, SectionSubject
from .serializers import (
    LevelSerializer, LevelDetailSerializer,
    SectionSerializer, SectionDetailSerializer,
    LevelSubjectSerializer, SectionSubjectSerializer
)


class LevelViewSet(viewsets.ModelViewSet):
    """ViewSet for Level model"""
    
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['level_type', 'is_active']
    search_fields = ['level_name', 'description']
    ordering_fields = ['level_no', 'level_name']
    ordering = ['level_no']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'retrieve':
            return LevelDetailSerializer
        return LevelSerializer
    
    @action(detail=True, methods=['get'])
    def sections(self, request, pk=None):
        """Get sections for a specific level"""
        level = self.get_object()
        sections = level.sections.filter(is_active=True)
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def subjects(self, request, pk=None):
        """Get subjects for a specific level"""
        level = self.get_object()
        subjects = level.level_subjects.filter(is_active=True)
        serializer = LevelSubjectSerializer(subjects, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        """Get students for a specific level"""
        level = self.get_object()
        students = level.students.filter(status='active')
        from student.serializers import StudentListSerializer
        serializer = StudentListSerializer(students, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_section(self, request, pk=None):
        """Add a section to level"""
        level = self.get_object()
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(level=level)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_subject(self, request, pk=None):
        """Add a subject to level"""
        level = self.get_object()
        serializer = LevelSubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(level=level)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get level statistics"""
        from django.db.models import Count
        
        stats = {
            'total_levels': Level.objects.count(),
            'active_levels': Level.objects.filter(is_active=True).count(),
            'by_type': list(Level.objects.values('level_type').annotate(count=Count('id'))),
            'total_students': sum(level.student_count for level in Level.objects.all()),
            'total_sections': sum(level.section_count for level in Level.objects.all()),
        }
        return Response(stats)


class SectionViewSet(viewsets.ModelViewSet):
    """ViewSet for Section model"""
    
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['level', 'section_type', 'is_active', 'class_teacher']
    search_fields = ['section_name', 'sec_no']
    ordering_fields = ['level__level_no', 'sec_no']
    ordering = ['level__level_no', 'sec_no']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'retrieve':
            return SectionDetailSerializer
        return SectionSerializer
    
    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        """Get students for a specific section"""
        section = self.get_object()
        students = section.students.filter(status='active')
        from student.serializers import StudentListSerializer
        serializer = StudentListSerializer(students, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_student(self, request, pk=None):
        """Add a student to section"""
        section = self.get_object()
        student_id = request.data.get('student_id')
        if not student_id:
            return Response(
                {'error': 'student_id is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            from student.models import Student
            student = Student.objects.get(s_id=student_id)
            student.section = section
            student.level = section.level
            student.save()
            return Response({'message': 'Student added to section successfully'})
        except Student.DoesNotExist:
            return Response(
                {'error': 'Student not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'])
    def available_spots(self, request):
        """Get sections with available spots"""
        sections = Section.objects.filter(is_active=True)
        available = []
        for section in sections:
            if not section.is_full:
                available.append({
                    'section_id': section.id,
                    'section_name': section.section_name,
                    'level_name': section.level.level_name,
                    'available_spots': section.available_spots,
                    'max_students': section.max_students,
                })
        return Response(available)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get section statistics"""
        from django.db.models import Count, Avg
        
        stats = {
            'total_sections': Section.objects.count(),
            'active_sections': Section.objects.filter(is_active=True).count(),
            'by_type': list(Section.objects.values('section_type').annotate(count=Count('id'))),
            'average_capacity': round(
                Section.objects.aggregate(
                    avg_capacity=Avg('max_students')
                )['avg_capacity'] or 0, 2
            ),
            'full_sections': Section.objects.filter(is_active=True).count() - 
                           sum(1 for s in Section.objects.filter(is_active=True) if not s.is_full),
        }
        return Response(stats)


class LevelSubjectViewSet(viewsets.ModelViewSet):
    """ViewSet for LevelSubject model"""
    
    queryset = LevelSubject.objects.all()
    serializer_class = LevelSubjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['level', 'subject', 'is_compulsory', 'is_active']
    search_fields = ['level__level_name', 'subject__s_name']
    ordering_fields = ['level__level_no', 'subject__s_name']
    ordering = ['level__level_no', 'subject__s_name']


class SectionSubjectViewSet(viewsets.ModelViewSet):
    """ViewSet for SectionSubject model"""
    queryset = SectionSubject.objects.all()
    serializer_class = SectionSubjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['section', 'section__level', 'subject', 'teacher', 'is_active']
    search_fields = ['section__section_name', 'subject__s_name', 'subject__s_code', 'teacher__teacher_name']
    ordering_fields = ['section__level__level_no', 'section__sec_no', 'subject__s_name']
    ordering = ['section__level__level_no', 'section__sec_no', 'subject__s_name']