"""
URL configuration for eschool project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Import all viewsets
from department.views import DepartmentViewSet, FinanceViewSet
from employee.views import EmployeeViewSet, EmployeeAttendanceViewSet, ExperienceViewSet
from teacher.views import TeacherViewSet, TeacherSubjectViewSet, TeacherClassViewSet, TeacherPerformanceViewSet
from student.views import StudentViewSet, StudentParentViewSet, StudentActivityViewSet, StudentDiaryViewSet, ScholarshipViewSet, StudentScholarshipViewSet
from level.views import LevelViewSet, SectionViewSet, LevelSubjectViewSet, SectionSubjectViewSet
from subject.views import SubjectViewSet, SubjectSyllabusViewSet, SubjectMaterialViewSet
from classroom.views import ClassViewSet, ClassScheduleViewSet, ClassBookingViewSet
from parent.views import ParentViewSet, PaymentViewSet, PaymentHistoryViewSet
from events.views import EventViewSet, EventParticipantViewSet, EventResourceViewSet
from admission_office.views import ExamViewSet, ExamResultViewSet, AttendanceViewSet, AdmissionViewSet

# Create router and register viewsets
router = DefaultRouter()

# Department routes
router.register(r'departments', DepartmentViewSet)
router.register(r'finances', FinanceViewSet)

# Employee routes
router.register(r'employees', EmployeeViewSet)
router.register(r'employee-attendance', EmployeeAttendanceViewSet)
router.register(r'experiences', ExperienceViewSet)

# Teacher routes
router.register(r'teachers', TeacherViewSet)
router.register(r'teacher-subjects', TeacherSubjectViewSet)
router.register(r'teacher-classes', TeacherClassViewSet)
router.register(r'teacher-performance', TeacherPerformanceViewSet)

# Student routes
router.register(r'students', StudentViewSet)
router.register(r'student-parents', StudentParentViewSet)
router.register(r'student-activities', StudentActivityViewSet)
router.register(r'student-diary', StudentDiaryViewSet)
router.register(r'scholarships', ScholarshipViewSet)
router.register(r'student-scholarships', StudentScholarshipViewSet)

# Level routes
router.register(r'levels', LevelViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'level-subjects', LevelSubjectViewSet)
router.register(r'section-subjects', SectionSubjectViewSet)

# Subject routes
router.register(r'subjects', SubjectViewSet)
router.register(r'subject-syllabi', SubjectSyllabusViewSet)
router.register(r'subject-materials', SubjectMaterialViewSet)

# Class/Room routes
router.register(r'classes', ClassViewSet)
router.register(r'class-schedules', ClassScheduleViewSet)
router.register(r'class-bookings', ClassBookingViewSet)

# Parent routes
router.register(r'parents', ParentViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'payment-history', PaymentHistoryViewSet)

# Event routes
router.register(r'events', EventViewSet)
router.register(r'event-participants', EventParticipantViewSet)
router.register(r'event-resources', EventResourceViewSet)

# Admission/Exam routes
router.register(r'exams', ExamViewSet)
router.register(r'exam-results', ExamResultViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'admissions', AdmissionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API routes
    path('api/', include(router.urls)),
    
    # Additional payment endpoints
    path('api/payments/summary/<int:student_id>/', PaymentViewSet.as_view({'get': 'summary_by_student'}), name='payment-summary-by-student'),
    path('api/payments/monthly/<int:student_id>/<int:year>/<int:month>/', PaymentViewSet.as_view({'get': 'monthly'}), name='payment-monthly'),
    
    # Authentication routes
    path('api/auth/', include('accounts.urls')),
    
    # API documentation
    path('api-auth/', include('rest_framework.urls')),
]
