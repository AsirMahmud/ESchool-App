from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class FinancialTransaction(models.Model):
    """Central model for all financial transactions"""
    
    TRANSACTION_TYPES = [
        ('revenue', 'Revenue'),
        ('expense', 'Expense'),
    ]
    
    REVENUE_CATEGORIES = [
        ('student_fees', 'Student Fees'),
        ('donations', 'Donations'),
        ('grants', 'Grants'),
        ('events', 'Events'),
        ('facility_rentals', 'Facility Rentals'),
        ('other_revenue', 'Other Revenue'),
    ]
    
    EXPENSE_CATEGORIES = [
        ('salaries', 'Salaries'),
        ('utilities', 'Utilities'),
        ('maintenance', 'Maintenance'),
        ('supplies', 'Supplies'),
        ('equipment', 'Equipment'),
        ('marketing', 'Marketing'),
        ('other_expenses', 'Other Expenses'),
    ]
    
    PAYMENT_METHODS = [
        ('cash', 'Cash'),
        ('bank_transfer', 'Bank Transfer'),
        ('check', 'Check'),
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('online', 'Online Payment'),
        ('other', 'Other'),
    ]
    
    transaction_id = models.AutoField(primary_key=True)
    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPES,
        help_text="Type of transaction (revenue or expense)"
    )
    category = models.CharField(
        max_length=50,
        help_text="Category of the transaction"
    )
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
        help_text="Transaction amount"
    )
    description = models.TextField(
        help_text="Description of the transaction"
    )
    transaction_date = models.DateField(
        help_text="Date of the transaction"
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS,
        blank=True,
        null=True,
        help_text="Method of payment"
    )
    reference_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Reference ID (payment ID, salary ID, etc.)"
    )
    reference_type = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text="Type of reference (payment, salary, manual)"
    )
    created_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="User who created this transaction"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'financial_transactions'
        ordering = ['-transaction_date', '-created_at']
        verbose_name = 'Financial Transaction'
        verbose_name_plural = 'Financial Transactions'
        indexes = [
            models.Index(fields=['transaction_type']),
            models.Index(fields=['category']),
            models.Index(fields=['transaction_date']),
            models.Index(fields=['reference_type', 'reference_id']),
        ]
    
    def __str__(self):
        return f"{self.get_transaction_type_display()} - {self.description} (₹{self.amount})"
    
    @property
    def is_revenue(self):
        return self.transaction_type == 'revenue'
    
    @property
    def is_expense(self):
        return self.transaction_type == 'expense'


class FinancialSummary(models.Model):
    """Model to store monthly/yearly financial summaries for quick access"""
    
    PERIOD_TYPES = [
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]
    
    summary_id = models.AutoField(primary_key=True)
    period_type = models.CharField(
        max_length=20,
        choices=PERIOD_TYPES,
        help_text="Type of summary period"
    )
    year = models.PositiveIntegerField(
        help_text="Year of the summary"
    )
    month = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Month of the summary (for monthly summaries)"
    )
    total_revenue = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Total revenue for the period"
    )
    total_expenses = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Total expenses for the period"
    )
    net_profit = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Net profit (revenue - expenses)"
    )
    student_fees_revenue = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Revenue from student fees"
    )
    salary_expenses = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Total salary expenses"
    )
    operational_expenses = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Total operational expenses"
    )
    transaction_count = models.PositiveIntegerField(
        default=0,
        help_text="Total number of transactions in this period"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'financial_summaries'
        ordering = ['-year', '-month']
        verbose_name = 'Financial Summary'
        verbose_name_plural = 'Financial Summaries'
        unique_together = ['period_type', 'year', 'month']
        indexes = [
            models.Index(fields=['period_type', 'year', 'month']),
        ]
    
    def __str__(self):
        if self.period_type == 'monthly':
            return f"Financial Summary - {self.year}/{self.month:02d}"
        return f"Financial Summary - {self.year}"
    
    @property
    def profit_margin(self):
        """Calculate profit margin percentage"""
        if self.total_revenue > 0:
            return (self.net_profit / self.total_revenue) * 100
        return 0
    
    def save(self, *args, **kwargs):
        """Calculate net profit before saving"""
        self.net_profit = self.total_revenue - self.total_expenses
        super().save(*args, **kwargs)


class Budget(models.Model):
    """Model for budget planning and tracking"""
    
    BUDGET_TYPES = [
        ('annual', 'Annual Budget'),
        ('quarterly', 'Quarterly Budget'),
        ('monthly', 'Monthly Budget'),
    ]
    
    BUDGET_CATEGORIES = [
        ('revenue', 'Revenue Budget'),
        ('expense', 'Expense Budget'),
    ]
    
    budget_id = models.AutoField(primary_key=True)
    name = models.CharField(
        max_length=200,
        help_text="Budget name"
    )
    budget_type = models.CharField(
        max_length=20,
        choices=BUDGET_TYPES,
        help_text="Type of budget"
    )
    category = models.CharField(
        max_length=20,
        choices=BUDGET_CATEGORIES,
        help_text="Budget category"
    )
    year = models.PositiveIntegerField(
        help_text="Budget year"
    )
    quarter = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Budget quarter (1-4)"
    )
    month = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Budget month (1-12)"
    )
    budgeted_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.00'))],
        help_text="Budgeted amount"
    )
    actual_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Actual amount spent/earned"
    )
    variance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="Variance (actual - budgeted)"
    )
    variance_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0.00,
        help_text="Variance percentage"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Budget description"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this budget is active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'budgets'
        ordering = ['-year', '-quarter', '-month']
        verbose_name = 'Budget'
        verbose_name_plural = 'Budgets'
        unique_together = ['name', 'year', 'quarter', 'month']
    
    def __str__(self):
        return f"{self.name} - {self.year}"
    
    def save(self, *args, **kwargs):
        """Calculate variance before saving"""
        self.variance = self.actual_amount - self.budgeted_amount
        if self.budgeted_amount > 0:
            self.variance_percentage = (self.variance / self.budgeted_amount) * 100
        else:
            self.variance_percentage = 0
        super().save(*args, **kwargs)
    
    @property
    def utilization_percentage(self):
        """Calculate budget utilization percentage"""
        if self.budgeted_amount > 0:
            return (self.actual_amount / self.budgeted_amount) * 100
        return 0
    
    @property
    def is_over_budget(self):
        """Check if actual amount exceeds budget"""
        return self.actual_amount > self.budgeted_amount
