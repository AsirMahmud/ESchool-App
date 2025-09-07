from django.contrib import admin
from .models import FinancialTransaction, FinancialSummary, Budget


@admin.register(FinancialTransaction)
class FinancialTransactionAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'transaction_type', 'category', 'amount', 'transaction_date', 'created_at']
    list_filter = ['transaction_type', 'category', 'transaction_date', 'payment_method']
    search_fields = ['description', 'reference_id', 'notes']
    ordering = ['-transaction_date', '-created_at']
    readonly_fields = ['transaction_id', 'created_at', 'updated_at']
    date_hierarchy = 'transaction_date'
    
    fieldsets = (
        ('Transaction Details', {
            'fields': ('transaction_type', 'category', 'amount', 'description', 'transaction_date')
        }),
        ('Payment Information', {
            'fields': ('payment_method', 'reference_id', 'reference_type')
        }),
        ('Additional Information', {
            'fields': ('created_by', 'notes')
        }),
        ('System Information', {
            'fields': ('transaction_id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(FinancialSummary)
class FinancialSummaryAdmin(admin.ModelAdmin):
    list_display = ['summary_id', 'period_type', 'year', 'month', 'total_revenue', 'total_expenses', 'net_profit']
    list_filter = ['period_type', 'year', 'month']
    ordering = ['-year', '-month']
    readonly_fields = ['summary_id', 'net_profit', 'profit_margin', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Period Information', {
            'fields': ('period_type', 'year', 'month')
        }),
        ('Financial Summary', {
            'fields': ('total_revenue', 'total_expenses', 'net_profit', 'profit_margin')
        }),
        ('Detailed Breakdown', {
            'fields': ('student_fees_revenue', 'salary_expenses', 'operational_expenses', 'transaction_count')
        }),
        ('System Information', {
            'fields': ('summary_id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ['budget_id', 'name', 'budget_type', 'category', 'year', 'budgeted_amount', 'actual_amount', 'variance_percentage']
    list_filter = ['budget_type', 'category', 'year', 'is_active']
    search_fields = ['name', 'description']
    ordering = ['-year', '-quarter', '-month']
    readonly_fields = ['budget_id', 'variance', 'variance_percentage', 'utilization_percentage', 'is_over_budget', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Budget Details', {
            'fields': ('name', 'budget_type', 'category', 'description')
        }),
        ('Period Information', {
            'fields': ('year', 'quarter', 'month')
        }),
        ('Budget Amounts', {
            'fields': ('budgeted_amount', 'actual_amount', 'variance', 'variance_percentage')
        }),
        ('Analysis', {
            'fields': ('utilization_percentage', 'is_over_budget', 'is_active')
        }),
        ('System Information', {
            'fields': ('budget_id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

