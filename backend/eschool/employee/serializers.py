from rest_framework import serializers
from .models import Employee, EmployeeAttendance, Experience


class EmployeeSerializer(serializers.ModelSerializer):
    """Serializer for Employee model"""
    
    years_of_service = serializers.ReadOnlyField()
    is_teacher = serializers.ReadOnlyField()
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    
    class Meta:
        model = Employee
        fields = [
            'emp_id', 'name', 'email', 'phone', 'position', 'role', 'status',
            'join_date', 'department', 'department_name', 'teacher_room',
            'about', 'education', 'skills', 'experience', 'certification',
            'salary', 'address', 'emergency_contact', 'emergency_phone',
            'years_of_service', 'is_teacher',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['emp_id', 'created_at', 'updated_at']
    
    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value.lower()
    
    def validate_phone(self, value):
        """Validate phone number"""
        if value and not value.replace('+', '').replace('-', '').replace(' ', '').isdigit():
            raise serializers.ValidationError("Enter a valid phone number.")
        return value


class EmployeeAttendanceSerializer(serializers.ModelSerializer):
    """Serializer for EmployeeAttendance model"""
    
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    working_hours = serializers.ReadOnlyField()
    
    class Meta:
        model = EmployeeAttendance
        fields = [
            'id', 'employee', 'employee_name', 'date', 'check_in_time',
            'check_out_time', 'status', 'notes', 'working_hours',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'employee', 'employee_name', 'working_hours', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate attendance data"""
        if data.get('check_in_time') and data.get('check_out_time'):
            if data['check_in_time'] >= data['check_out_time']:
                raise serializers.ValidationError("Check-out time must be after check-in time.")
        return data


class ExperienceSerializer(serializers.ModelSerializer):
    """Serializer for Experience model"""
    
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    is_current = serializers.ReadOnlyField()
    
    class Meta:
        model = Experience
        fields = [
            'id', 'employee', 'employee_name', 'department', 'department_name',
            'start_date', 'end_date', 'position', 'description', 'is_current',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate(self, data):
        """Validate experience data"""
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] <= data['start_date']:
                raise serializers.ValidationError("End date must be after start date.")
        return data


class EmployeeDetailSerializer(EmployeeSerializer):
    """Detailed serializer for Employee with related data"""
    
    attendance_records = EmployeeAttendanceSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    
    class Meta(EmployeeSerializer.Meta):
        fields = EmployeeSerializer.Meta.fields + ['attendance_records', 'experiences']


class EmployeeListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Employee list view"""
    
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    years_of_service = serializers.ReadOnlyField()
    
    class Meta:
        model = Employee
        fields = [
            'emp_id', 'name', 'email', 'position', 'role', 'status',
            'department_name', 'years_of_service', 'join_date'
        ]


