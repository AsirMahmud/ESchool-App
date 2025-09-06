from rest_framework import serializers
from .models import Level, Section, LevelSubject, SectionSubject
from classroom.models import Class


class LevelSerializer(serializers.ModelSerializer):
    """Serializer for Level model"""
    
    student_count = serializers.ReadOnlyField()
    section_count = serializers.ReadOnlyField()
    teacher_count = serializers.ReadOnlyField()
    number_of_sections = serializers.IntegerField(write_only=True, required=False, min_value=0)
    classroom = serializers.PrimaryKeyRelatedField(read_only=False, required=False, allow_null=True, queryset=Class.objects.all())
    
    class Meta:
        model = Level
        fields = [
            'level_no', 'level_name', 'level_type', 'description',
            'age_range_min', 'age_range_max', 'is_active', 'classroom',
            'student_count', 'section_count', 'teacher_count',
            'number_of_sections',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def validate_level_no(self, value):
        """Validate level number"""
        if value < 1 or value > 12:
            raise serializers.ValidationError("Level number must be between 1 and 12.")
        return value

    def create(self, validated_data):
        number_of_sections = validated_data.pop('number_of_sections', 0)
        level = super().create(validated_data)
        # Auto-create sections A, B, C, ... if requested
        from string import ascii_uppercase
        for i in range(min(number_of_sections, len(ascii_uppercase))):
            sec_letter = ascii_uppercase[i]
            Section.objects.create(
                level=level,
                sec_no=sec_letter,
                section_name=f"{level.level_name}-{sec_letter}",
                section_type='regular',
                max_students=30
            )
        return level


class SectionSerializer(serializers.ModelSerializer):
    """Serializer for Section model"""
    
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    student_count = serializers.ReadOnlyField()
    is_full = serializers.ReadOnlyField()
    available_spots = serializers.ReadOnlyField()
    class_teacher_name = serializers.CharField(source='class_teacher.teacher_id.name', read_only=True)
    room_name = serializers.CharField(source='room.full_room_identifier', read_only=True)
    
    class Meta:
        model = Section
        fields = [
            'id', 'level', 'level_name', 'sec_no', 'section_name', 'section_type',
            'max_students', 'student_count', 'is_full', 'available_spots',
            'class_teacher', 'class_teacher_name', 'room', 'room_name',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_max_students(self, value):
        """Validate maximum students"""
        if value < 1 or value > 50:
            raise serializers.ValidationError("Maximum students must be between 1 and 50.")
        return value


class LevelSubjectSerializer(serializers.ModelSerializer):
    """Serializer for LevelSubject relationship"""
    
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    subject_code = serializers.CharField(source='subject.s_code', read_only=True)
    
    class Meta:
        model = LevelSubject
        fields = [
            'id', 'level', 'level_name', 'subject', 'subject_name', 'subject_code',
            'is_compulsory', 'weekly_hours', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate_weekly_hours(self, value):
        """Validate weekly hours"""
        if value < 1 or value > 10:
            raise serializers.ValidationError("Weekly hours must be between 1 and 10.")
        return value


class LevelDetailSerializer(LevelSerializer):
    """Detailed serializer for Level with related data"""
    
    sections = SectionSerializer(many=True, read_only=True)
    subjects = LevelSubjectSerializer(many=True, read_only=True)
    
    class Meta(LevelSerializer.Meta):
        fields = LevelSerializer.Meta.fields + ['sections', 'subjects']


class SectionDetailSerializer(SectionSerializer):
    """Detailed serializer for Section with related data"""
    
    students = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta(SectionSerializer.Meta):
        fields = SectionSerializer.Meta.fields + ['students']



class SectionSubjectSerializer(serializers.ModelSerializer):
    section_name = serializers.CharField(source='section.section_name', read_only=True)
    level = serializers.IntegerField(source='section.level.level_no', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    subject_code = serializers.CharField(source='subject.s_code', read_only=True)
    # Use the employee name referenced by teacher.teacher_id
    teacher_name = serializers.CharField(source='teacher.teacher_id.name', read_only=True)

    class Meta:
        model = SectionSubject
        fields = [
            'id', 'section', 'section_name', 'level', 'subject', 'subject_name', 'subject_code',
            'teacher', 'teacher_name', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
