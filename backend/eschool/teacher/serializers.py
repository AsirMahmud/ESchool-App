from rest_framework import serializers
from .models import Teacher, TeacherSubject, TeacherClass, TeacherPerformance


class TeacherSerializer(serializers.ModelSerializer):
    """Serializer for Teacher model"""
    
    teacher_name = serializers.CharField(source='teacher_id.name', read_only=True)
    teacher_email = serializers.CharField(source='teacher_id.email', read_only=True)
    teacher_phone = serializers.CharField(source='teacher_id.phone', read_only=True)
    department_name = serializers.CharField(source='teacher_id.department.d_name', read_only=True)
    user_id = serializers.IntegerField(source='teacher_id.user.id', read_only=True)
    
    class Meta:
        model = Teacher
        fields = [
            'teacher_id', 'teacher_name', 'teacher_email', 'teacher_phone',
            'department_name', 'user_id', 'qualification', 'specialization',
            'years_of_experience', 'is_class_teacher', 'max_classes',
            'bio', 'email', 'phone', 'address', 'emergency_contact', 'emergency_phone',
            'education', 'certifications', 'skills', 'experience_details',
            'achievements', 'social_links', 'profile_photo', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class TeacherSubjectSerializer(serializers.ModelSerializer):
    """Serializer for TeacherSubject relationship"""
    
    teacher_name = serializers.CharField(source='teacher.teacher_id.name', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    subject_code = serializers.CharField(source='subject.s_code', read_only=True)
    
    class Meta:
        model = TeacherSubject
        fields = [
            'id', 'teacher', 'teacher_name', 'subject', 'subject_name',
            'subject_code', 'is_active', 'start_date', 'end_date', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate(self, data):
        """Validate teacher subject data"""
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] <= data['start_date']:
                raise serializers.ValidationError("End date must be after start date.")
        return data


class TeacherClassSerializer(serializers.ModelSerializer):
    """Serializer for TeacherClass relationship"""
    
    teacher_name = serializers.CharField(source='teacher.teacher_id.name', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    class_room_name = serializers.CharField(source='class_room.full_room_identifier', read_only=True)
    
    class Meta:
        model = TeacherClass
        fields = [
            'id', 'teacher', 'teacher_name', 'class_room', 'class_room_name',
            'subject', 'subject_name', 'is_active', 'start_date', 'end_date', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate(self, data):
        """Validate teacher class data"""
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] <= data['start_date']:
                raise serializers.ValidationError("End date must be after start date.")
        return data


class TeacherPerformanceSerializer(serializers.ModelSerializer):
    """Serializer for TeacherPerformance model"""
    
    teacher_name = serializers.CharField(source='teacher.teacher_id.name', read_only=True)
    evaluator_name = serializers.CharField(source='evaluator.name', read_only=True)
    
    class Meta:
        model = TeacherPerformance
        fields = [
            'id', 'teacher', 'teacher_name', 'evaluation_date',
            'academic_performance', 'classroom_management', 'student_interaction',
            'professional_development', 'overall_rating', 'comments',
            'evaluator', 'evaluator_name', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class TeacherDetailSerializer(TeacherSerializer):
    """Detailed serializer for Teacher with related data"""
    
    current_subjects = serializers.SerializerMethodField()
    current_classes = serializers.SerializerMethodField()
    subjects_taught = TeacherSubjectSerializer(many=True, read_only=True)
    classes_taught = TeacherClassSerializer(many=True, read_only=True)
    performance_records = TeacherPerformanceSerializer(many=True, read_only=True)
    
    class Meta(TeacherSerializer.Meta):
        fields = TeacherSerializer.Meta.fields + [
            'current_subjects', 'current_classes', 'subjects_taught',
            'classes_taught', 'performance_records'
        ]
    
    def get_current_subjects(self, obj):
        """Get current subjects taught by teacher from section assignments"""
        from level.models import SectionSubject
        
        # Get section subjects for this teacher
        section_subjects = SectionSubject.objects.filter(teacher=obj, is_active=True)
        
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
        
        return subjects_data
    
    def get_current_classes(self, obj):
        """Get current classes taught by teacher"""
        return TeacherClassSerializer(obj.current_classes, many=True).data


class TeacherListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Teacher list view"""
    
    teacher_name = serializers.CharField(source='teacher_id.name', read_only=True)
    teacher_email = serializers.CharField(source='teacher_id.email', read_only=True)
    department_name = serializers.CharField(source='teacher_id.department.d_name', read_only=True)
    user_id = serializers.IntegerField(source='teacher_id.user.id', read_only=True)
    subject_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Teacher
        fields = [
            'teacher_id', 'teacher_name', 'teacher_email', 'department_name',
            'user_id', 'qualification', 'specialization', 'years_of_experience',
            'is_class_teacher', 'subject_count'
        ]
    
    def get_subject_count(self, obj):
        """Get number of subjects taught by teacher from section assignments"""
        from level.models import SectionSubject
        return SectionSubject.objects.filter(teacher=obj, is_active=True).count()


