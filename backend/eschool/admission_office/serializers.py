from rest_framework import serializers
from .models import Exam, ExamResult, Attendance, Admission


class ExamSerializer(serializers.ModelSerializer):
    """Serializer for Exam model"""
    
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    subject_code = serializers.CharField(source='subject.s_code', read_only=True)
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    section_name = serializers.CharField(source='section.section_name', read_only=True)
    class_room_name = serializers.CharField(source='class_room.full_room_identifier', read_only=True)
    invigilator_name = serializers.CharField(source='invigilator.name', read_only=True)
    is_ongoing = serializers.ReadOnlyField()
    participant_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Exam
        fields = [
            'exam_id', 'exam_name', 'exam_type', 'subject', 'subject_name',
            'subject_code', 'level', 'level_name', 'section', 'section_name',
            'duration', 'total_marks', 'passing_marks', 'exam_date',
            'start_time', 'end_time', 'class_room', 'class_room_name',
            'invigilator', 'invigilator_name', 'status', 'instructions',
            'academic_year', 'semester', 'is_ongoing', 'participant_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['exam_id', 'is_ongoing', 'participant_count', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate exam data"""
        if data.get('end_time') and data.get('start_time'):
            if data['end_time'] <= data['start_time']:
                raise serializers.ValidationError("End time must be after start time.")
        
        if data.get('passing_marks', 0) > data.get('total_marks', 0):
            raise serializers.ValidationError("Passing marks cannot be greater than total marks.")
        
        return data


class ExamResultSerializer(serializers.ModelSerializer):
    """Serializer for ExamResult model"""
    
    exam_name = serializers.CharField(source='exam.exam_name', read_only=True)
    subject_name = serializers.CharField(source='exam.subject.s_name', read_only=True)
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_number = serializers.CharField(source='student.student_number', read_only=True)
    total_marks = serializers.CharField(source='exam.total_marks', read_only=True)
    graded_by_name = serializers.CharField(source='graded_by.name', read_only=True)
    
    class Meta:
        model = ExamResult
        fields = [
            'id', 'exam', 'exam_name', 'subject_name', 'student', 'student_name',
            'student_number', 'marks_obtained', 'total_marks', 'grade',
            'is_passed', 'remarks', 'submitted_at', 'graded_by', 'graded_by_name',
            'graded_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'grade', 'is_passed', 'created_at', 'updated_at']
    
    def validate_marks_obtained(self, value):
        """Validate marks obtained"""
        if value < 0:
            raise serializers.ValidationError("Marks obtained cannot be negative.")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    """Serializer for Attendance model"""
    
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_number = serializers.CharField(source='student.student_number', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    class_room_name = serializers.CharField(source='class_room.full_room_identifier', read_only=True)
    teacher_name = serializers.CharField(source='teacher.name', read_only=True)
    is_present = serializers.ReadOnlyField()
    working_hours = serializers.ReadOnlyField()
    
    class Meta:
        model = Attendance
        fields = [
            'id', 'student', 'student_name', 'student_number', 'subject',
            'subject_name', 'class_room', 'class_room_name', 'date',
            'check_in_time', 'check_out_time', 'status', 'teacher',
            'teacher_name', 'notes', 'is_present', 'working_hours',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_present', 'working_hours', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate attendance data"""
        if data.get('check_in_time') and data.get('check_out_time'):
            if data['check_in_time'] >= data['check_out_time']:
                raise serializers.ValidationError("Check-out time must be after check-in time.")
        return data


class AdmissionSerializer(serializers.ModelSerializer):
    """Serializer for Admission model"""
    
    level_name = serializers.CharField(source='level_applying_for.level_name', read_only=True)
    processed_by_name = serializers.CharField(source='processed_by.name', read_only=True)
    
    class Meta:
        model = Admission
        fields = [
            'admission_id', 'student_name', 'date_of_birth', 'gender',
            'parent_name', 'parent_email', 'parent_phone', 'address',
            'previous_school', 'level_applying_for', 'level_name',
            'application_date', 'status', 'admission_date', 'admission_fee',
            'admission_fee_paid', 'documents_submitted', 'notes',
            'processed_by', 'processed_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['admission_id', 'application_date', 'created_at', 'updated_at']
    
    def validate_parent_email(self, value):
        """Validate parent email"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value.lower()
    
    def validate_parent_phone(self, value):
        """Validate parent phone"""
        if value and not value.replace('+', '').replace('-', '').replace(' ', '').isdigit():
            raise serializers.ValidationError("Enter a valid phone number.")
        return value


class ExamDetailSerializer(ExamSerializer):
    """Detailed serializer for Exam with related data"""
    
    exam_results = ExamResultSerializer(many=True, read_only=True)
    
    class Meta(ExamSerializer.Meta):
        fields = ExamSerializer.Meta.fields + ['exam_results']


class ExamListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Exam list view"""
    
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    participant_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Exam
        fields = [
            'exam_id', 'exam_name', 'exam_type', 'subject_name', 'level_name',
            'exam_date', 'start_time', 'end_time', 'status', 'participant_count'
        ]


class AttendanceListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Attendance list view"""
    
    student_name = serializers.CharField(source='student.name', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    is_present = serializers.ReadOnlyField()
    
    class Meta:
        model = Attendance
        fields = [
            'id', 'student_name', 'subject_name', 'date', 'status', 'is_present'
        ]



