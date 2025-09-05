from rest_framework import serializers
from .models import Parent, Payment, PaymentHistory


class ParentSerializer(serializers.ModelSerializer):
    """Serializer for Parent model"""
    
    age = serializers.ReadOnlyField()
    children_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Parent
        fields = [
            'p_id', 'name', 'email', 'phone', 'alternate_phone', 'gender',
            'date_of_birth', 'age', 'occupation', 'job_title', 'workplace',
            'address', 'emergency_contact', 'emergency_phone',
            'is_primary_contact', 'is_emergency_contact', 'notes',
            'children_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['p_id', 'age', 'children_count', 'created_at', 'updated_at']
    
    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value.lower()


class PaymentHistorySerializer(serializers.ModelSerializer):
    """Serializer for PaymentHistory model"""
    
    class Meta:
        model = PaymentHistory
        fields = [
            'id', 'payment', 'installment_number', 'amount', 'due_date',
            'payment_date', 'status', 'payment_method', 'transaction_id',
            'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for Payment model"""
    
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_number = serializers.CharField(source='student.student_number', read_only=True)
    is_overdue = serializers.ReadOnlyField()
    days_overdue = serializers.ReadOnlyField()
    payment_history = PaymentHistorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'pay_id', 'parent', 'parent_name', 'student', 'student_name',
            'student_number', 'payment_type', 'amount', 'due_date',
            'payment_date', 'status', 'payment_method', 'transaction_id',
            'academic_year', 'semester', 'description', 'late_fee',
            'discount', 'total_amount', 'is_overdue', 'days_overdue',
            'payment_history', 'created_at', 'updated_at'
        ]
        read_only_fields = ['pay_id', 'total_amount', 'is_overdue', 'days_overdue', 'created_at', 'updated_at']
    
    def validate_amount(self, value):
        """Validate payment amount"""
        if value <= 0:
            raise serializers.ValidationError("Payment amount must be greater than 0.")
        return value
    
    def validate(self, data):
        """Validate payment data"""
        if data.get('late_fee', 0) < 0:
            raise serializers.ValidationError("Late fee cannot be negative.")
        if data.get('discount', 0) < 0:
            raise serializers.ValidationError("Discount cannot be negative.")
        if data.get('discount', 0) > data.get('amount', 0):
            raise serializers.ValidationError("Discount cannot be greater than payment amount.")
        return data


class ParentDetailSerializer(ParentSerializer):
    """Detailed serializer for Parent with related data"""
    
    children = serializers.StringRelatedField(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    
    class Meta(ParentSerializer.Meta):
        fields = ParentSerializer.Meta.fields + ['children', 'payments']


class ParentListSerializer(serializers.ModelSerializer):
    """Simplified serializer for Parent list view"""
    
    children_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Parent
        fields = [
            'p_id', 'name', 'email', 'phone', 'occupation', 'workplace',
            'is_primary_contact', 'children_count'
        ]



