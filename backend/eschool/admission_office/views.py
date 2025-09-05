from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

from .models import Exam, ExamResult, Attendance, Admission
from .serializers import (
    ExamSerializer, ExamDetailSerializer, ExamListSerializer,
    ExamResultSerializer, AttendanceSerializer, AttendanceListSerializer,
    AdmissionSerializer
)


class ExamViewSet(viewsets.ModelViewSet):
    """ViewSet for Exam model"""
    
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['exam_type', 'subject', 'level', 'section', 'status', 'academic_year']
    search_fields = ['exam_name', 'subject__s_name', 'instructions']
    ordering_fields = ['exam_date', 'start_time', 'exam_name']
    ordering = ['-exam_date', 'start_time']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return ExamListSerializer
        elif self.action == 'retrieve':
            return ExamDetailSerializer
        return ExamSerializer
    
    @action(detail=True, methods=['get'])
    def results(self, request, pk=None):
        """Get results for a specific exam"""
        exam = self.get_object()
        results = exam.exam_results.all()
        serializer = ExamResultSerializer(results, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_result(self, request, pk=None):
        """Add a result to an exam"""
        exam = self.get_object()
        serializer = ExamResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(exam=exam)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming exams"""
        from datetime import date
        today = date.today()
        upcoming_exams = Exam.objects.filter(
            exam_date__gte=today, status='scheduled'
        )
        serializer = ExamListSerializer(upcoming_exams, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's exams"""
        from datetime import date
        today = date.today()
        today_exams = Exam.objects.filter(exam_date=today)
        serializer = ExamListSerializer(today_exams, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_subject(self, request):
        """Get exams grouped by subject"""
        from django.db.models import Count
        
        subjects = Exam.objects.values('subject__s_name').annotate(
            count=Count('id')
        ).order_by('subject__s_name')
        
        return Response(list(subjects))
    
    @action(detail=False, methods=['get'])
    def by_level(self, request):
        """Get exams grouped by level"""
        from django.db.models import Count
        
        levels = Exam.objects.values('level__level_name').annotate(
            count=Count('id')
        ).order_by('level__level_no')
        
        return Response(list(levels))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get exam statistics"""
        from django.db.models import Count
        from datetime import date
        
        today = date.today()
        
        stats = {
            'total_exams': Exam.objects.count(),
            'upcoming_exams': Exam.objects.filter(
                exam_date__gte=today, status='scheduled'
            ).count(),
            'today_exams': Exam.objects.filter(exam_date=today).count(),
            'completed_exams': Exam.objects.filter(status='completed').count(),
            'by_type': list(Exam.objects.values('exam_type').annotate(count=Count('id'))),
            'by_subject': list(Exam.objects.values('subject__s_name').annotate(count=Count('id'))),
            'by_level': list(Exam.objects.values('level__level_name').annotate(count=Count('id'))),
        }
        return Response(stats)


class ExamResultViewSet(viewsets.ModelViewSet):
    """ViewSet for ExamResult model"""
    
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['exam', 'student', 'is_passed', 'grade']
    search_fields = ['exam__exam_name', 'student__name', 'student__student_number']
    ordering_fields = ['marks_obtained', 'grade', 'graded_at']
    ordering = ['-marks_obtained']
    
    @action(detail=False, methods=['get'])
    def by_grade(self, request):
        """Get results grouped by grade"""
        from django.db.models import Count
        
        grades = ExamResult.objects.values('grade').annotate(
            count=Count('id')
        ).order_by('grade')
        
        return Response(list(grades))
    
    @action(detail=False, methods=['get'])
    def top_performers(self, request):
        """Get top performing students"""
        top_results = ExamResult.objects.order_by('-marks_obtained')[:10]
        serializer = ExamResultSerializer(top_results, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get exam result statistics"""
        from django.db.models import Count, Avg
        
        stats = {
            'total_results': ExamResult.objects.count(),
            'passed_count': ExamResult.objects.filter(is_passed=True).count(),
            'failed_count': ExamResult.objects.filter(is_passed=False).count(),
            'average_marks': round(
                ExamResult.objects.aggregate(Avg('marks_obtained'))['marks_obtained__avg'] or 0, 2
            ),
            'by_grade': list(ExamResult.objects.values('grade').annotate(count=Count('id'))),
        }
        return Response(stats)


class AttendanceViewSet(viewsets.ModelViewSet):
    """ViewSet for Attendance model"""
    
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student', 'subject', 'status', 'date']
    search_fields = ['student__name', 'student__student_number', 'subject__s_name']
    ordering_fields = ['date', 'check_in_time']
    ordering = ['-date']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return AttendanceListSerializer
        return AttendanceSerializer
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's attendance"""
        from datetime import date
        today = date.today()
        attendance = Attendance.objects.filter(date=today)
        serializer = AttendanceListSerializer(attendance, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_student(self, request):
        """Get attendance by student"""
        student_id = request.query_params.get('student_id')
        if student_id:
            attendance = Attendance.objects.filter(student__s_id=student_id)
            serializer = AttendanceListSerializer(attendance, many=True)
            return Response(serializer.data)
        return Response({'error': 'student_id parameter is required'}, status=400)
    
    @action(detail=False, methods=['get'])
    def by_subject(self, request):
        """Get attendance by subject"""
        subject_code = request.query_params.get('subject_code')
        if subject_code:
            attendance = Attendance.objects.filter(subject__s_code=subject_code)
            serializer = AttendanceListSerializer(attendance, many=True)
            return Response(serializer.data)
        return Response({'error': 'subject_code parameter is required'}, status=400)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get attendance statistics"""
        from django.db.models import Count
        from datetime import date
        
        today = date.today()
        
        stats = {
            'total_records': Attendance.objects.count(),
            'today_attendance': Attendance.objects.filter(date=today).count(),
            'present_today': Attendance.objects.filter(date=today, status='present').count(),
            'absent_today': Attendance.objects.filter(date=today, status='absent').count(),
            'by_status': list(Attendance.objects.values('status').annotate(count=Count('id'))),
        }
        return Response(stats)


class AdmissionViewSet(viewsets.ModelViewSet):
    """ViewSet for Admission model"""
    
    queryset = Admission.objects.all()
    serializer_class = AdmissionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'level_applying_for', 'gender']
    search_fields = ['student_name', 'parent_name', 'parent_email']
    ordering_fields = ['application_date', 'admission_date']
    ordering = ['-application_date']
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Get pending admissions"""
        pending_admissions = Admission.objects.filter(status='pending')
        serializer = AdmissionSerializer(pending_admissions, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def approved(self, request):
        """Get approved admissions"""
        approved_admissions = Admission.objects.filter(status='approved')
        serializer = AdmissionSerializer(approved_admissions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve an admission"""
        admission = self.get_object()
        admission.status = 'approved'
        admission.admission_date = timezone.now().date()
        admission.save()
        serializer = AdmissionSerializer(admission)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Reject an admission"""
        admission = self.get_object()
        admission.status = 'rejected'
        admission.save()
        serializer = AdmissionSerializer(admission)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_level(self, request):
        """Get admissions grouped by level"""
        from django.db.models import Count
        
        levels = Admission.objects.values('level_applying_for__level_name').annotate(
            count=Count('id')
        ).order_by('level_applying_for__level_no')
        
        return Response(list(levels))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get admission statistics"""
        from django.db.models import Count
        
        stats = {
            'total_applications': Admission.objects.count(),
            'pending_applications': Admission.objects.filter(status='pending').count(),
            'approved_applications': Admission.objects.filter(status='approved').count(),
            'rejected_applications': Admission.objects.filter(status='rejected').count(),
            'by_status': list(Admission.objects.values('status').annotate(count=Count('id'))),
            'by_level': list(Admission.objects.values('level_applying_for__level_name').annotate(count=Count('id'))),
            'by_gender': list(Admission.objects.values('gender').annotate(count=Count('id'))),
        }
        return Response(stats)