from django.db import models
from django.conf import settings
from django.core.validators import EmailValidator, MinLengthValidator
from django.core.exceptions import ValidationError
import uuid


class Employee(models.Model):
    """Employee model representing all staff members"""
    
    EMPLOYEE_STATUS = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('terminated', 'Terminated'),
        ('on_leave', 'On Leave'),
    ]
    
    EMPLOYEE_ROLES = [
        ('admin', 'Administrator'),
        ('teacher', 'Teacher'),
        ('staff', 'Staff'),
        ('principal', 'Principal'),
        ('vice_principal', 'Vice Principal'),
        ('coordinator', 'Coordinator'),
        ('librarian', 'Librarian'),
        ('counselor', 'Counselor'),
        ('nurse', 'Nurse'),
        ('security', 'Security'),
        ('maintenance', 'Maintenance'),
        ('cleaner', 'Cleaner'),
    ]
    
    emp_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique employee ID"
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="Associated Django user account"
    )
    name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2)],
        help_text="Full name of the employee"
    )
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        help_text="Email address"
    )
    phone = models.CharField(
        max_length=15,
        help_text="Contact phone number"
    )
    position = models.CharField(
        max_length=100,
        help_text="Job position/title"
    )
    role = models.CharField(
        max_length=20,
        choices=EMPLOYEE_ROLES,
        help_text="Employee role in the organization"
    )
    status = models.CharField(
        max_length=20,
        choices=EMPLOYEE_STATUS,
        default='active',
        help_text="Current employment status"
    )
    join_date = models.DateField(
        help_text="Date when employee joined"
    )
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='employees',
        help_text="Department the employee belongs to"
    )
    teacher_room = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text="Room number for teachers"
    )
    about = models.TextField(
        blank=True,
        null=True,
        help_text="About the employee"
    )
    education = models.TextField(
        blank=True,
        null=True,
        help_text="Educational background"
    )
    skills = models.TextField(
        blank=True,
        null=True,
        help_text="Skills and competencies"
    )
    experience = models.TextField(
        blank=True,
        null=True,
        help_text="Work experience"
    )
    certification = models.TextField(
        blank=True,
        null=True,
        help_text="Professional certifications"
    )
    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Employee salary"
    )
    address = models.TextField(
        blank=True,
        null=True,
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'employees'
        ordering = ['name']
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'
    
    def __str__(self):
        return f"{self.name} ({self.position})"
    
    def clean(self):
        """Validate employee data"""
        super().clean()
        if self.role == 'teacher' and not self.teacher_room:
            raise ValidationError("Teachers must have a room assigned.")
    
    @property
    def is_teacher(self):
        """Check if employee is a teacher"""
        return self.role == 'teacher'
    
    @property
    def years_of_service(self):
        """Calculate years of service"""
        from datetime import date
        today = date.today()
        return today.year - self.join_date.year


class EmployeeAttendance(models.Model):
    """Employee attendance tracking"""
    
    ATTENDANCE_STATUS = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
        ('half_day', 'Half Day'),
        ('on_leave', 'On Leave'),
    ]
    
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='attendance_records',
        help_text="Employee for this attendance record"
    )
    date = models.DateField(help_text="Attendance date")
    check_in_time = models.TimeField(
        null=True,
        blank=True,
        help_text="Check-in time"
    )
    check_out_time = models.TimeField(
        null=True,
        blank=True,
        help_text="Check-out time"
    )
    status = models.CharField(
        max_length=20,
        choices=ATTENDANCE_STATUS,
        default='present',
        help_text="Attendance status"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'employee_attendance'
        ordering = ['-date', 'employee']
        verbose_name = 'Employee Attendance'
        verbose_name_plural = 'Employee Attendance Records'
        unique_together = ['employee', 'date']
    
    def __str__(self):
        return f"{self.employee.name} - {self.date} ({self.status})"
    
    @property
    def working_hours(self):
        """Calculate working hours if both check-in and check-out times are available"""
        if self.check_in_time and self.check_out_time:
            from datetime import datetime, timedelta
            check_in = datetime.combine(self.date, self.check_in_time)
            check_out = datetime.combine(self.date, self.check_out_time)
            if check_out < check_in:
                check_out += timedelta(days=1)
            return check_out - check_in
        return None


class Experience(models.Model):
    """Employee experience in different departments"""
    
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='experiences',
        help_text="Employee for this experience record"
    )
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name='employee_experiences',
        help_text="Department where employee worked"
    )
    start_date = models.DateField(help_text="Start date in department")
    end_date = models.DateField(
        null=True,
        blank=True,
        help_text="End date in department (null if current)"
    )
    position = models.CharField(
        max_length=100,
        help_text="Position held in this department"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of work done"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'employee_experiences'
        ordering = ['-start_date']
        verbose_name = 'Employee Experience'
        verbose_name_plural = 'Employee Experiences'
    
    def __str__(self):
        return f"{self.employee.name} - {self.department.d_name} ({self.start_date})"
    
    @property
    def is_current(self):
        """Check if this is the current department"""
        return self.end_date is None