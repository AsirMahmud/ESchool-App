from rest_framework import serializers
from .models import Class, ClassSchedule, ClassBooking


class ClassSerializer(serializers.ModelSerializer):
    """Serializer for Class/Room model"""
    
    full_room_identifier = serializers.ReadOnlyField()
    current_occupancy = serializers.ReadOnlyField()
    
    class Meta:
        model = Class
        fields = [
            'id', 'floor', 'room_no', 'room_name', 'room_type', 'capacity',
            'description', 'equipment', 'is_available', 'is_air_conditioned',
            'has_projector', 'has_whiteboard', 'has_computers',
            'full_room_identifier', 'current_occupancy',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_capacity(self, value):
        """Validate room capacity"""
        if value < 1 or value > 500:
            raise serializers.ValidationError("Capacity must be between 1 and 500.")
        return value


class ClassScheduleSerializer(serializers.ModelSerializer):
    """Serializer for ClassSchedule model"""
    
    class_room_name = serializers.CharField(source='class_room.full_room_identifier', read_only=True)
    subject_name = serializers.CharField(source='subject.s_name', read_only=True)
    teacher_name = serializers.CharField(source='teacher.teacher_id.name', read_only=True)
    level_name = serializers.CharField(source='level.level_name', read_only=True)
    section_name = serializers.CharField(source='section.section_name', read_only=True)
    
    class Meta:
        model = ClassSchedule
        fields = [
            'id', 'class_room', 'class_room_name', 'day_of_week', 'start_time',
            'end_time', 'subject', 'subject_name', 'teacher', 'teacher_name',
            'level', 'level_name', 'section', 'section_name', 'is_active',
            'academic_year', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate schedule data"""
        if data.get('start_time') and data.get('end_time'):
            if data['start_time'] >= data['end_time']:
                raise serializers.ValidationError("End time must be after start time.")
        return data


class ClassBookingSerializer(serializers.ModelSerializer):
    """Serializer for ClassBooking model"""
    
    class_room_name = serializers.CharField(source='class_room.full_room_identifier', read_only=True)
    booked_by_name = serializers.CharField(source='booked_by.name', read_only=True)
    
    class Meta:
        model = ClassBooking
        fields = [
            'id', 'class_room', 'class_room_name', 'booked_by', 'booked_by_name',
            'booking_date', 'start_time', 'end_time', 'purpose', 'description',
            'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate booking data"""
        if data.get('start_time') and data.get('end_time'):
            if data['start_time'] >= data['end_time']:
                raise serializers.ValidationError("End time must be after start time.")
        return data


class ClassDetailSerializer(ClassSerializer):
    """Detailed serializer for Class with related data"""
    
    schedules = ClassScheduleSerializer(many=True, read_only=True)
    bookings = ClassBookingSerializer(many=True, read_only=True)
    
    class Meta(ClassSerializer.Meta):
        fields = ClassSerializer.Meta.fields + ['schedules', 'bookings']


class ClassListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Class list view"""
    
    full_room_identifier = serializers.ReadOnlyField()
    
    class Meta:
        model = Class
        fields = [
            'id', 'floor', 'room_no', 'room_name', 'room_type', 'capacity',
            'is_available', 'full_room_identifier'
        ]
