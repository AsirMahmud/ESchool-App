from rest_framework import serializers
from datetime import datetime
import re
from .models import Employee, EmployeeAttendance, Experience, EmployeeSalary


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


class EmployeeSalarySerializer(serializers.ModelSerializer):
    """Serializer for EmployeeSalary model"""
    
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    employee_position = serializers.CharField(source='employee.position', read_only=True)
    department_name = serializers.CharField(source='employee.department.d_name', read_only=True)
    is_overdue = serializers.ReadOnlyField()
    gross_salary = serializers.ReadOnlyField()
    
    class Meta:
        model = EmployeeSalary
        fields = [
            'sal_id', 'employee', 'employee_name', 'employee_position',
            'department_name', 'salary_type', 'amount', 'month', 'pay_date',
            'paid_date', 'status', 'basic_salary', 'allowances', 'deductions',
            'overtime_hours', 'overtime_rate', 'tax_deduction', 'net_salary',
            'is_overdue', 'gross_salary', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['sal_id', 'amount', 'net_salary', 'is_overdue', 'gross_salary', 'created_at', 'updated_at']
    
    def validate_basic_salary(self, value):
        """Validate basic salary amount"""
        if value <= 0:
            raise serializers.ValidationError("Basic salary must be greater than 0.")
        return value
    
    def validate_month(self, value):
        """Validate and normalize month format"""
        if not value:
            raise serializers.ValidationError("Month is required.")
        
        # Handle different month formats
        month_patterns = [
            r'^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$',
            r'^(\d{1,2})-(\d{4})$',
            r'^(\d{4})-(\d{1,2})$'
        ]
        
        month_names = {
            'january': '01', 'february': '02', 'march': '03', 'april': '04',
            'may': '05', 'june': '06', 'july': '07', 'august': '08',
            'september': '09', 'october': '10', 'november': '11', 'december': '12'
        }
        
        for pattern in month_patterns:
            match = re.match(pattern, value.strip(), re.IGNORECASE)
            if match:
                first, second = match.groups()
                
                # Pattern 1: "January 2024"
                if pattern == month_patterns[0]:
                    month_num = month_names.get(first.lower())
                    year = second
                    if month_num and len(year) == 4 and year.isdigit():
                        return f"{first.title()} {year}"
                
                # Pattern 2: "01-2024"
                elif pattern == month_patterns[1]:
                    month_num, year = first, second
                    if 1 <= int(month_num) <= 12 and len(year) == 4 and year.isdigit():
                        month_name = list(month_names.keys())[int(month_num) - 1].title()
                        return f"{month_name} {year}"
                
                # Pattern 3: "2024-01"
                elif pattern == month_patterns[2]:
                    year, month_num = first, second
                    if 1 <= int(month_num) <= 12 and len(year) == 4 and year.isdigit():
                        month_name = list(month_names.keys())[int(month_num) - 1].title()
                        return f"{month_name} {year}"
        
        raise serializers.ValidationError(
            "Invalid month format. Use 'January 2024', '01-2024', or '2024-01' format."
        )
    
    def validate(self, data):
        """Validate salary data"""
        if data.get('allowances', 0) < 0:
            raise serializers.ValidationError("Allowances cannot be negative.")
        if data.get('deductions', 0) < 0:
            raise serializers.ValidationError("Deductions cannot be negative.")
        if data.get('overtime_hours', 0) < 0:
            raise serializers.ValidationError("Overtime hours cannot be negative.")
        if data.get('overtime_rate', 0) < 0:
            raise serializers.ValidationError("Overtime rate cannot be negative.")
        if data.get('tax_deduction', 0) < 0:
            raise serializers.ValidationError("Tax deduction cannot be negative.")
        
        # Validate month format if provided
        if 'month' in data and data['month']:
            try:
                self.validate_month(data['month'])
            except serializers.ValidationError:
                raise
        
        return data


class EmployeeDetailSerializer(EmployeeSerializer):
    """Detailed serializer for Employee with related data"""
    
    attendance_records = EmployeeAttendanceSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    salary_records = EmployeeSalarySerializer(many=True, read_only=True)
    
    class Meta(EmployeeSerializer.Meta):
        fields = EmployeeSerializer.Meta.fields + ['attendance_records', 'experiences', 'salary_records']


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


