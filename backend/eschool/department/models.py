from django.db import models
from django.core.validators import MinLengthValidator


class Department(models.Model):
    """Department model representing academic and administrative departments"""
    
    DEPARTMENT_TYPES = [
        ('academic', 'Academic'),
        ('administrative', 'Administrative'),
        ('support', 'Support'),
        ('finance', 'Finance'),
        ('hr', 'Human Resources'),
    ]
    
    d_name = models.CharField(
        max_length=100, 
        primary_key=True,
        validators=[MinLengthValidator(2)],
        help_text="Department name (e.g., Computer Science, Mathematics)"
    )
    location = models.CharField(
        max_length=200,
        help_text="Physical location of the department"
    )
    d_type = models.CharField(
        max_length=20,
        choices=DEPARTMENT_TYPES,
        default='academic',
        help_text="Type of department"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the department"
    )
    head_of_department = models.ForeignKey(
        'employee.Employee',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='headed_departments',
        help_text="Head of the department"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'departments'
        ordering = ['d_name']
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'
    
    def __str__(self):
        return f"{self.d_name} ({self.get_d_type_display()})"
    
    @property
    def employee_count(self):
        """Return the number of employees in this department"""
        return self.employees.count()
    
    @property
    def student_count(self):
        """Return the number of students in this department"""
        return self.students.count()


class Finance(models.Model):
    """Finance model for managing department finances"""
    
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('overdue', 'Overdue'),
        ('cancelled', 'Cancelled'),
    ]
    
    report_id = models.AutoField(primary_key=True)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='finances',
        help_text="Department this finance report belongs to"
    )
    date = models.DateField(help_text="Date of the financial report")
    total_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="Total fee amount"
    )
    fee_collection_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0.00,
        help_text="Fee collection rate percentage"
    )
    total_expense = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="Total expense amount"
    )
    report = models.TextField(
        help_text="Detailed financial report"
    )
    status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default='pending',
        help_text="Status of the financial report"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'finances'
        ordering = ['-date']
        verbose_name = 'Finance Report'
        verbose_name_plural = 'Finance Reports'
        unique_together = ['department', 'date']
    
    def __str__(self):
        return f"Finance Report - {self.department.d_name} ({self.date})"
    
    @property
    def net_balance(self):
        """Calculate net balance (total_fee - total_expense)"""
        return self.total_fee - self.total_expense