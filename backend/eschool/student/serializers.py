from rest_framework import serializers
from .models import Student, StudentParent, StudentActivity, StudentDiary, Scholarship, StudentScholarship


class StudentSerializer(serializers.ModelSerializer):
    """Serializer for Student model"""
    
    age = serializers.ReadOnlyField()
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    section_name = serializers.CharField(source='section.section_name', read_only=True)
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    
    class Meta:
        model = Student
        fields = [
            's_id', 'student_number', 'name', 'email', 'phone', 'gender',
            'date_of_birth', 'age', 'enroll_date', 'address', 'previous_education',
            'status', 'level', 'level_name', 'section', 'section_name',
            'department', 'department_name', 'emergency_contact_name',
            'emergency_contact_phone', 'medical_conditions', 'achievements',
            'photo', 'created_at', 'updated_at'
        ]
        read_only_fields = ['s_id', 'age', 'created_at', 'updated_at']
    
    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value.lower()
    
    def validate_student_number(self, value):
        """Validate student number format"""
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError("Student number must be at least 3 characters long.")
        normalized = value.strip().upper()
        # Ensure uniqueness at serializer level to avoid 500 IntegrityError
        qs = Student.objects.filter(student_number=normalized)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Student number already exists.")
        return normalized


class StudentParentSerializer(serializers.ModelSerializer):
    """Serializer for StudentParent relationship"""
    
    student_name = serializers.CharField(source='student.name', read_only=True)
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    parent_email = serializers.CharField(source='parent.email', read_only=True)
    parent_phone = serializers.CharField(source='parent.phone', read_only=True)
    
    class Meta:
        model = StudentParent
        fields = [
            'id', 'student', 'student_name', 'parent', 'parent_name',
            'parent_email', 'parent_phone', 'relationship',
            'is_primary_contact', 'is_emergency_contact', 'is_active', 'created_at'
        ]
        # Allow POST without providing 'student' explicitly; it is injected in the view
        read_only_fields = ['id', 'created_at', 'student']


class StudentActivitySerializer(serializers.ModelSerializer):
    """Serializer for StudentActivity model"""
    
    student_name = serializers.CharField(source='student.name', read_only=True)
    
    class Meta:
        model = StudentActivity
        fields = [
            'id', 'student', 'student_name', 'activity_name', 'activity_type',
            'description', 'start_date', 'end_date', 'position', 'achievements',
            'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate(self, data):
        """Validate activity data"""
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] <= data['start_date']:
                raise serializers.ValidationError("End date must be after start date.")
        return data


class StudentDiarySerializer(serializers.ModelSerializer):
    """Serializer for StudentDiary model"""
    
    student_name = serializers.CharField(source='student.name', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    
    class Meta:
        model = StudentDiary
        fields = [
            'id', 'student', 'student_name', 'subject', 'subject_name',
            'task', 'due_date', 'completion_date', 'feedback', 'grade',
            'is_completed', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate diary data"""
        if data.get('completion_date') and data.get('due_date'):
            if data['completion_date'] > data['due_date']:
                raise serializers.ValidationError("Completion date cannot be after due date.")
        return data


class ScholarshipSerializer(serializers.ModelSerializer):
    """Serializer for Scholarship model"""
    
    class Meta:
        model = Scholarship
        fields = [
            'sch_id', 'name', 'scholarship_type', 'description', 'amount',
            'criteria', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['sch_id', 'created_at', 'updated_at']


class StudentScholarshipSerializer(serializers.ModelSerializer):
    """Serializer for StudentScholarship model"""
    
    student_name = serializers.CharField(source='student.name', read_only=True)
    scholarship_name = serializers.CharField(source='scholarship.name', read_only=True)
    
    class Meta:
        model = StudentScholarship
        fields = [
            'id', 'student', 'student_name', 'scholarship', 'scholarship_name',
            'award_date', 'amount_awarded', 'academic_year', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class StudentDetailSerializer(StudentSerializer):
    """Detailed serializer for Student with related data"""
    
    current_parents = serializers.SerializerMethodField()
    parents = StudentParentSerializer(many=True, read_only=True)
    activities = StudentActivitySerializer(many=True, read_only=True)
    diary_entries = StudentDiarySerializer(many=True, read_only=True)
    scholarships = StudentScholarshipSerializer(many=True, read_only=True)
    
    class Meta(StudentSerializer.Meta):
        fields = StudentSerializer.Meta.fields + [
            'current_parents', 'parents', 'activities', 'diary_entries', 'scholarships'
        ]
    
    def get_current_parents(self, obj):
        """Get current parents/guardians"""
        return StudentParentSerializer(obj.current_parents, many=True).data


class StudentListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Student list view"""
    
    age = serializers.ReadOnlyField()
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    section_name = serializers.CharField(source='section.section_name', read_only=True)
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    
    class Meta:
        model = Student
        fields = [
            's_id', 'student_number', 'name', 'email', 'phone', 'gender',
            'age', 'status', 'level_name', 'section_name', 'department_name',
            'enroll_date'
        ]



