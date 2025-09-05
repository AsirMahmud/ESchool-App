from django.db import models
from django.core.validators import EmailValidator, MinLengthValidator


class Parent(models.Model):
    """Parent/Guardian model"""
    
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    
    OCCUPATION_TYPES = [
        ('employed', 'Employed'),
        ('self_employed', 'Self Employed'),
        ('business', 'Business'),
        ('professional', 'Professional'),
        ('government', 'Government Employee'),
        ('private', 'Private Sector'),
        ('unemployed', 'Unemployed'),
        ('retired', 'Retired'),
        ('student', 'Student'),
        ('other', 'Other'),
    ]
    
    p_id = models.AutoField(primary_key=True)
    name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2)],
        help_text="Full name of the parent/guardian"
    )
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        help_text="Email address"
    )
    phone = models.CharField(
        max_length=15,
        help_text="Primary contact phone number"
    )
    alternate_phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text="Alternate contact phone number"
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        help_text="Gender"
    )
    date_of_birth = models.DateField(
        null=True,
        blank=True,
        help_text="Date of birth"
    )
    occupation = models.CharField(
        max_length=50,
        choices=OCCUPATION_TYPES,
        help_text="Occupation type"
    )
    job_title = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Job title or profession"
    )
    workplace = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Name of workplace or company"
    )
    address = models.TextField(
        help_text="Home address"
    )
    emergency_contact = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Emergency contact person"
    )
    emergency_phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text="Emergency contact phone"
    )
    is_primary_contact = models.BooleanField(
        default=False,
        help_text="Whether this is the primary contact for the family"
    )
    is_emergency_contact = models.BooleanField(
        default=True,
        help_text="Whether this person can be contacted in emergencies"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes about the parent/guardian"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'parents'
        ordering = ['name']
        verbose_name = 'Parent/Guardian'
        verbose_name_plural = 'Parents/Guardians'
    
    def __str__(self):
        return f"{self.name} ({self.phone})"
    
    @property
    def children_count(self):
        """Return the number of children this parent has"""
        return self.children.filter(is_active=True).count()
    
    @property
    def age(self):
        """Calculate parent's age if date of birth is available"""
        if self.date_of_birth:
            from datetime import date
            today = date.today()
            return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))
        return None


class Payment(models.Model):
    """Payment model for fee management"""
    
    PAYMENT_TYPES = [
        ('tuition', 'Tuition Fee'),
        ('transport', 'Transport Fee'),
        ('library', 'Library Fee'),
        ('laboratory', 'Laboratory Fee'),
        ('sports', 'Sports Fee'),
        ('examination', 'Examination Fee'),
        ('development', 'Development Fee'),
        ('other', 'Other'),
    ]
    
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('overdue', 'Overdue'),
        ('partial', 'Partially Paid'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
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
    
    pay_id = models.AutoField(primary_key=True)
    parent = models.ForeignKey(
        Parent,
        on_delete=models.CASCADE,
        related_name='payments',
        help_text="Parent making the payment"
    )
    student = models.ForeignKey(
        'student.Student',
        on_delete=models.CASCADE,
        related_name='payments',
        help_text="Student for whom payment is made"
    )
    payment_type = models.CharField(
        max_length=20,
        choices=PAYMENT_TYPES,
        help_text="Type of payment"
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Payment amount"
    )
    due_date = models.DateField(
        help_text="Due date for payment"
    )
    payment_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date when payment was made"
    )
    status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default='pending',
        help_text="Payment status"
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS,
        blank=True,
        null=True,
        help_text="Method of payment"
    )
    transaction_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Transaction ID or reference number"
    )
    academic_year = models.CharField(
        max_length=10,
        help_text="Academic year for this payment"
    )
    semester = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Semester (if applicable)"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Payment description or notes"
    )
    late_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="Late fee amount"
    )
    discount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="Discount amount"
    )
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Total amount including fees and discounts"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'payments'
        ordering = ['-due_date']
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
    
    def __str__(self):
        return f"{self.student.name} - {self.get_payment_type_display()} ({self.amount})"
    
    def save(self, *args, **kwargs):
        """Calculate total amount before saving"""
        self.total_amount = self.amount + self.late_fee - self.discount
        super().save(*args, **kwargs)
    
    @property
    def is_overdue(self):
        """Check if payment is overdue"""
        from datetime import date
        return self.status == 'pending' and self.due_date < date.today()
    
    @property
    def days_overdue(self):
        """Calculate days overdue"""
        if self.is_overdue:
            from datetime import date
            return (date.today() - self.due_date).days
        return 0


class PaymentHistory(models.Model):
    """Payment history for tracking payment installments"""
    
    payment = models.ForeignKey(
        Payment,
        on_delete=models.CASCADE,
        related_name='payment_history',
        help_text="Parent payment this history belongs to"
    )
    installment_number = models.PositiveIntegerField(
        help_text="Installment number"
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Installment amount"
    )
    due_date = models.DateField(
        help_text="Due date for this installment"
    )
    payment_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date when this installment was paid"
    )
    status = models.CharField(
        max_length=20,
        choices=Payment.PAYMENT_STATUS,
        default='pending',
        help_text="Status of this installment"
    )
    payment_method = models.CharField(
        max_length=20,
        choices=Payment.PAYMENT_METHODS,
        blank=True,
        null=True,
        help_text="Method of payment for this installment"
    )
    transaction_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Transaction ID for this installment"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Notes for this installment"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'payment_history'
        ordering = ['payment', 'installment_number']
        verbose_name = 'Payment History'
        verbose_name_plural = 'Payment History'
        unique_together = ['payment', 'installment_number']
    
    def __str__(self):
        return f"{self.payment.student.name} - Installment {self.installment_number} ({self.amount})"