from rest_framework import serializers
from .models import FinancialTransaction, FinancialSummary, Budget


class FinancialTransactionSerializer(serializers.ModelSerializer):
    """Serializer for FinancialTransaction model"""
    
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    is_revenue = serializers.ReadOnlyField()
    is_expense = serializers.ReadOnlyField()
    
    class Meta:
        model = FinancialTransaction
        fields = [
            'transaction_id', 'transaction_type', 'category', 'amount', 'description',
            'transaction_date', 'payment_method', 'reference_id', 'reference_type',
            'created_by', 'created_by_name', 'notes', 'is_revenue', 'is_expense',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['transaction_id', 'is_revenue', 'is_expense', 'created_at', 'updated_at']
    
    def validate_amount(self, value):
        """Validate amount is positive"""
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than 0.")
        return value
    
    def validate_category(self, value):
        """Validate category based on transaction type"""
        transaction_type = self.initial_data.get('transaction_type')
        
        if transaction_type == 'revenue':
            valid_categories = [choice[0] for choice in FinancialTransaction.REVENUE_CATEGORIES]
        elif transaction_type == 'expense':
            valid_categories = [choice[0] for choice in FinancialTransaction.EXPENSE_CATEGORIES]
        else:
            raise serializers.ValidationError("Invalid transaction type.")
        
        if value not in valid_categories:
            raise serializers.ValidationError(f"Invalid category for {transaction_type} transaction.")
        
        return value


class FinancialSummarySerializer(serializers.ModelSerializer):
    """Serializer for FinancialSummary model"""
    
    profit_margin = serializers.ReadOnlyField()
    period_display = serializers.SerializerMethodField()
    
    class Meta:
        model = FinancialSummary
        fields = [
            'summary_id', 'period_type', 'year', 'month', 'total_revenue',
            'total_expenses', 'net_profit', 'student_fees_revenue', 'salary_expenses',
            'operational_expenses', 'transaction_count', 'profit_margin',
            'period_display', 'created_at', 'updated_at'
        ]
        read_only_fields = ['summary_id', 'net_profit', 'profit_margin', 'created_at', 'updated_at']
    
    def get_period_display(self, obj):
        """Get human-readable period display"""
        if obj.period_type == 'monthly' and obj.month:
            return f"{obj.year}-{obj.month:02d}"
        return str(obj.year)
    
    def validate(self, data):
        """Validate period data"""
        period_type = data.get('period_type')
        month = data.get('month')
        
        if period_type == 'monthly' and not month:
            raise serializers.ValidationError("Month is required for monthly summaries.")
        
        if period_type == 'yearly' and month:
            raise serializers.ValidationError("Month should not be provided for yearly summaries.")
        
        if month and (month < 1 or month > 12):
            raise serializers.ValidationError("Month must be between 1 and 12.")
        
        return data


class BudgetSerializer(serializers.ModelSerializer):
    """Serializer for Budget model"""
    
    variance = serializers.ReadOnlyField()
    variance_percentage = serializers.ReadOnlyField()
    utilization_percentage = serializers.ReadOnlyField()
    is_over_budget = serializers.ReadOnlyField()
    
    class Meta:
        model = Budget
        fields = [
            'budget_id', 'name', 'budget_type', 'category', 'year', 'quarter',
            'month', 'budgeted_amount', 'actual_amount', 'variance',
            'variance_percentage', 'utilization_percentage', 'is_over_budget',
            'description', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'budget_id', 'variance', 'variance_percentage', 'utilization_percentage',
            'is_over_budget', 'created_at', 'updated_at'
        ]
    
    def validate_budgeted_amount(self, value):
        """Validate budgeted amount is positive"""
        if value <= 0:
            raise serializers.ValidationError("Budgeted amount must be greater than 0.")
        return value
    
    def validate_actual_amount(self, value):
        """Validate actual amount is non-negative"""
        if value < 0:
            raise serializers.ValidationError("Actual amount cannot be negative.")
        return value
    
    def validate(self, data):
        """Validate budget period data"""
        budget_type = data.get('budget_type')
        quarter = data.get('quarter')
        month = data.get('month')
        
        if budget_type == 'quarterly':
            if not quarter or quarter < 1 or quarter > 4:
                raise serializers.ValidationError("Quarter must be between 1 and 4 for quarterly budgets.")
            if month:
                raise serializers.ValidationError("Month should not be provided for quarterly budgets.")
        
        elif budget_type == 'monthly':
            if not month or month < 1 or month > 12:
                raise serializers.ValidationError("Month must be between 1 and 12 for monthly budgets.")
            if quarter:
                raise serializers.ValidationError("Quarter should not be provided for monthly budgets.")
        
        elif budget_type == 'annual':
            if quarter:
                raise serializers.ValidationError("Quarter should not be provided for annual budgets.")
            if month:
                raise serializers.ValidationError("Month should not be provided for annual budgets.")
        
        return data


class FinancialOverviewSerializer(serializers.Serializer):
    """Serializer for financial overview data"""
    
    total_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_expenses = serializers.DecimalField(max_digits=12, decimal_places=2)
    net_profit = serializers.DecimalField(max_digits=12, decimal_places=2)
    profit_margin = serializers.DecimalField(max_digits=5, decimal_places=2)
    student_fees_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    other_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    salary_expenses = serializers.DecimalField(max_digits=12, decimal_places=2)
    operational_expenses = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_transactions = serializers.IntegerField()
    
    class Meta:
        fields = [
            'total_revenue', 'total_expenses', 'net_profit', 'profit_margin',
            'student_fees_revenue', 'other_revenue', 'salary_expenses',
            'operational_expenses', 'total_transactions'
        ]
