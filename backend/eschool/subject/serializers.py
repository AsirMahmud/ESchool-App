from rest_framework import serializers
from .models import Subject, SubjectSyllabus, SubjectMaterial


class SubjectSerializer(serializers.ModelSerializer):
    """Serializer for Subject model"""
    
    teacher_count = serializers.ReadOnlyField()
    level_count = serializers.ReadOnlyField()
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    
    class Meta:
        model = Subject
        fields = [
            's_code', 's_name', 'subject_type', 'difficulty_level',
            'description', 'department', 'department_name',
            'prerequisites', 'is_active', 'teacher_count', 'level_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def validate_s_code(self, value):
        """Validate subject code"""
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError("Subject code must be at least 2 characters long.")
        return value.strip().upper()
    
    def validate_s_name(self, value):
        """Validate subject name"""
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError("Subject name must be at least 2 characters long.")
        return value.strip()


class SubjectSyllabusSerializer(serializers.ModelSerializer):
    """Serializer for SubjectSyllabus model"""
    
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    subject_code = serializers.CharField(source='subject.s_code', read_only=True)
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    
    class Meta:
        model = SubjectSyllabus
        fields = [
            'id', 'subject', 'subject_name', 'subject_code', 'level', 'level_name',
            'academic_year', 'syllabus_content', 'learning_objectives',
            'assessment_criteria', 'textbooks', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class SubjectMaterialSerializer(serializers.ModelSerializer):
    """Serializer for SubjectMaterial model"""
    
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    subject_code = serializers.CharField(source='subject.s_code', read_only=True)
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    
    class Meta:
        model = SubjectMaterial
        fields = [
            'id', 'subject', 'subject_name', 'subject_code', 'level', 'level_name',
            'material_type', 'title', 'description', 'file_path', 'is_required',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class SubjectDetailSerializer(SubjectSerializer):
    """Detailed serializer for Subject with related data"""
    
    syllabi = SubjectSyllabusSerializer(many=True, read_only=True)
    materials = SubjectMaterialSerializer(many=True, read_only=True)
    teachers_teaching = serializers.StringRelatedField(many=True, read_only=True)
    levels = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta(SubjectSerializer.Meta):
        fields = SubjectSerializer.Meta.fields + [
            'syllabi', 'materials', 'teachers_teaching', 'levels'
        ]


class SubjectListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Subject list view"""
    
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    teacher_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Subject
        fields = [
            's_code', 's_name', 'subject_type', 'difficulty_level',
            'department_name', 'teacher_count', 'is_active'
        ]


