from rest_framework import serializers
from .models import Department, Finance


class DepartmentSerializer(serializers.ModelSerializer):
    """Serializer for Department model"""
    
    employee_count = serializers.ReadOnlyField()
    student_count = serializers.ReadOnlyField()
    head_of_department_name = serializers.CharField(source='head_of_department.name', read_only=True)
    
    class Meta:
        model = Department
        fields = [
            'd_name', 'location', 'd_type', 'description', 
            'head_of_department', 'head_of_department_name',
            'employee_count', 'student_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def validate_d_name(self, value):
        """Validate department name"""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Department name must be at least 2 characters long.")
        return value.strip()


class FinanceSerializer(serializers.ModelSerializer):
    """Serializer for Finance model"""
    
    department_name = serializers.CharField(source='department.d_name', read_only=True)
    net_balance = serializers.ReadOnlyField()
    
    class Meta:
        model = Finance
        fields = [
            'report_id', 'department', 'department_name', 'date',
            'total_fee', 'fee_collection_rate', 'total_expense',
            'report', 'status', 'net_balance',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['report_id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate finance data"""
        if data.get('total_fee', 0) < 0:
            raise serializers.ValidationError("Total fee cannot be negative.")
        if data.get('total_expense', 0) < 0:
            raise serializers.ValidationError("Total expense cannot be negative.")
        if data.get('fee_collection_rate', 0) < 0 or data.get('fee_collection_rate', 0) > 100:
            raise serializers.ValidationError("Fee collection rate must be between 0 and 100.")
        return data


class DepartmentDetailSerializer(DepartmentSerializer):
    """Detailed serializer for Department with related data"""
    
    finances = FinanceSerializer(many=True, read_only=True)
    employees = serializers.StringRelatedField(many=True, read_only=True)
    students = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta(DepartmentSerializer.Meta):
        fields = DepartmentSerializer.Meta.fields + ['finances', 'employees', 'students']



