from rest_framework import serializers
from .models import Event, EventParticipant, EventResource


class EventSerializer(serializers.ModelSerializer):
    """Serializer for Event model"""
    
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    organizer_name = serializers.CharField(source='organizer.name', read_only=True)
    is_ongoing = serializers.ReadOnlyField()
    participant_count = serializers.ReadOnlyField()
    is_full = serializers.ReadOnlyField()
    
    class Meta:
        model = Event
        fields = [
            'name', 'event_type', 'description', 'location', 'start_date',
            'end_date', 'start_time', 'end_time', 'duration', 'department',
            'department_name', 'organizer', 'organizer_name', 'status',
            'max_participants', 'registration_required', 'registration_deadline',
            'budget', 'actual_cost', 'requirements', 'notes', 'is_public',
            'is_ongoing', 'participant_count', 'is_full',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def validate(self, data):
        """Validate event data"""
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] < data['start_date']:
                raise serializers.ValidationError("End date must be after or equal to start date.")
        
        if data.get('end_time') and data.get('start_time'):
            if data['end_time'] <= data['start_time']:
                raise serializers.ValidationError("End time must be after start time.")
        
        if data.get('budget', 0) < 0:
            raise serializers.ValidationError("Budget cannot be negative.")
        
        if data.get('actual_cost', 0) < 0:
            raise serializers.ValidationError("Actual cost cannot be negative.")
        
        return data


class EventParticipantSerializer(serializers.ModelSerializer):
    """Serializer for EventParticipant model"""
    
    event_name = serializers.CharField(source='event.name', read_only=True)
    participant_name = serializers.SerializerMethodField()
    participant_email = serializers.SerializerMethodField()
    participant_phone = serializers.SerializerMethodField()
    
    class Meta:
        model = EventParticipant
        fields = [
            'id', 'event', 'event_name', 'participant_type', 'student',
            'employee', 'parent', 'external_name', 'external_email',
            'external_phone', 'participant_name', 'participant_email',
            'participant_phone', 'registration_date', 'attendance_confirmed',
            'notes'
        ]
        read_only_fields = ['id', 'registration_date']
    
    def get_participant_name(self, obj):
        """Get participant name based on type"""
        if obj.student:
            return obj.student.name
        elif obj.employee:
            return obj.employee.name
        elif obj.parent:
            return obj.parent.name
        else:
            return obj.external_name
    
    def get_participant_email(self, obj):
        """Get participant email based on type"""
        if obj.student:
            return obj.student.email
        elif obj.employee:
            return obj.employee.email
        elif obj.parent:
            return obj.parent.email
        else:
            return obj.external_email
    
    def get_participant_phone(self, obj):
        """Get participant phone based on type"""
        if obj.student:
            return obj.student.phone
        elif obj.employee:
            return obj.employee.phone
        elif obj.parent:
            return obj.parent.phone
        else:
            return obj.external_phone
    
    def validate(self, data):
        """Validate participant data"""
        participant_fields = [data.get('student'), data.get('employee'), 
                            data.get('parent'), data.get('external_name')]
        if sum(1 for field in participant_fields if field) != 1:
            raise serializers.ValidationError("Exactly one participant type must be selected.")
        return data


class EventResourceSerializer(serializers.ModelSerializer):
    """Serializer for EventResource model"""
    
    event_name = serializers.CharField(source='event.name', read_only=True)
    
    class Meta:
        model = EventResource
        fields = [
            'id', 'event', 'event_name', 'resource_type', 'name', 'description',
            'quantity', 'cost', 'provider', 'contact_info', 'is_confirmed',
            'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_cost(self, value):
        """Validate resource cost"""
        if value is not None and value < 0:
            raise serializers.ValidationError("Cost cannot be negative.")
        return value
    
    def validate_quantity(self, value):
        """Validate resource quantity"""
        if value < 1:
            raise serializers.ValidationError("Quantity must be at least 1.")
        return value


class EventDetailSerializer(EventSerializer):
    """Detailed serializer for Event with related data"""
    
    participants = EventParticipantSerializer(many=True, read_only=True)
    resources = EventResourceSerializer(many=True, read_only=True)
    
    class Meta(EventSerializer.Meta):
        fields = EventSerializer.Meta.fields + ['participants', 'resources']


class EventListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Event list view"""
    
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    organizer_name = serializers.CharField(source='organizer.name', read_only=True)
    participant_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Event
        fields = [
            'name', 'event_type', 'location', 'start_date', 'end_date',
            'start_time', 'end_time', 'department_name', 'organizer_name',
            'status', 'participant_count', 'is_public'
        ]



