from django.db import models
from django.core.validators import EmailValidator, MinLengthValidator
import uuid


class Student(models.Model):
    """Student model representing enrolled students"""
    
    STUDENT_STATUS = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('graduated', 'Graduated'),
        ('transferred', 'Transferred'),
        ('suspended', 'Suspended'),
        ('expelled', 'Expelled'),
    ]
    
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    
    s_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique student ID"
    )
    student_number = models.CharField(
        max_length=20,
        unique=True,
        help_text="Student admission number"
    )
    name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2)],
        help_text="Full name of the student"
    )
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        help_text="Email address"
    )
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text="Contact phone number"
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        help_text="Gender"
    )
    date_of_birth = models.DateField(
        help_text="Date of birth"
    )
    enroll_date = models.DateField(
        help_text="Date when student enrolled"
    )
    address = models.TextField(
        help_text="Home address"
    )
    previous_education = models.TextField(
        blank=True,
        null=True,
        help_text="Previous educational background"
    )
    status = models.CharField(
        max_length=20,
        choices=STUDENT_STATUS,
        default='active',
        help_text="Current student status"
    )
    level = models.ForeignKey(
        'level.Level',
        on_delete=models.SET_NULL,
        null=True,
        related_name='students',
        help_text="Current academic level"
    )
    section = models.ForeignKey(
        'level.Section',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='students',
        help_text="Current section"
    )
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.SET_NULL,
        null=True,
        related_name='students',
        help_text="Department the student belongs to"
    )
    emergency_contact_name = models.CharField(
        max_length=100,
        help_text="Emergency contact person name"
    )
    emergency_contact_phone = models.CharField(
        max_length=15,
        help_text="Emergency contact phone number"
    )
    medical_conditions = models.TextField(
        blank=True,
        null=True,
        help_text="Medical conditions or allergies"
    )
    achievements = models.TextField(
        blank=True,
        null=True,
        help_text="Student achievements and awards"
    )
    photo = models.URLField(
        blank=True,
        null=True,
        help_text="URL to student photo"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'students'
        ordering = ['name']
        verbose_name = 'Student'
        verbose_name_plural = 'Students'
    
    def __str__(self):
        return f"{self.name} ({self.student_number})"
    
    @property
    def age(self):
        """Calculate student's age"""
        from datetime import date
        today = date.today()
        return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))
    
    @property
    def current_parents(self):
        """Get current parents/guardians"""
        return self.parents.filter(is_active=True)


class StudentParent(models.Model):
    """Relationship between students and parents"""
    
    RELATIONSHIP_TYPES = [
        ('father', 'Father'),
        ('mother', 'Mother'),
        ('guardian', 'Guardian'),
        ('grandfather', 'Grandfather'),
        ('grandmother', 'Grandmother'),
        ('uncle', 'Uncle'),
        ('aunt', 'Aunt'),
        ('other', 'Other'),
    ]
    
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='parents',
        help_text="Student"
    )
    parent = models.ForeignKey(
        'parent.Parent',
        on_delete=models.CASCADE,
        related_name='children',
        help_text="Parent/Guardian"
    )
    relationship = models.CharField(
        max_length=20,
        choices=RELATIONSHIP_TYPES,
        help_text="Relationship to student"
    )
    is_primary_contact = models.BooleanField(
        default=False,
        help_text="Whether this is the primary contact"
    )
    is_emergency_contact = models.BooleanField(
        default=False,
        help_text="Whether this person is an emergency contact"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this relationship is currently active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_parents'
        unique_together = ['student', 'parent']
        verbose_name = 'Student Parent'
        verbose_name_plural = 'Student Parents'
    
    def __str__(self):
        return f"{self.student.name} - {self.parent.name} ({self.relationship})"


class StudentActivity(models.Model):
    """Student activities and extracurricular participation"""
    
    ACTIVITY_TYPES = [
        ('sports', 'Sports'),
        ('academic', 'Academic'),
        ('cultural', 'Cultural'),
        ('social', 'Social'),
        ('volunteer', 'Volunteer'),
        ('leadership', 'Leadership'),
        ('art', 'Art'),
        ('music', 'Music'),
        ('drama', 'Drama'),
        ('debate', 'Debate'),
        ('other', 'Other'),
    ]
    
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='activities',
        help_text="Student participating in this activity"
    )
    activity_name = models.CharField(
        max_length=200,
        help_text="Name of the activity"
    )
    activity_type = models.CharField(
        max_length=20,
        choices=ACTIVITY_TYPES,
        help_text="Type of activity"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the activity"
    )
    start_date = models.DateField(
        help_text="Start date of participation"
    )
    end_date = models.DateField(
        null=True,
        blank=True,
        help_text="End date of participation"
    )
    position = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Position held in the activity"
    )
    achievements = models.TextField(
        blank=True,
        null=True,
        help_text="Achievements in this activity"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether the student is currently active in this activity"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_activities'
        ordering = ['-start_date']
        verbose_name = 'Student Activity'
        verbose_name_plural = 'Student Activities'
    
    def __str__(self):
        return f"{self.student.name} - {self.activity_name}"


class StudentDiary(models.Model):
    """Student diary/assignment tracking"""
    
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='diary_entries',
        help_text="Student for this diary entry"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        help_text="Subject for this diary entry"
    )
    task = models.TextField(
        help_text="Task or assignment description"
    )
    due_date = models.DateField(
        help_text="Due date for the task"
    )
    completion_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date when task was completed"
    )
    feedback = models.TextField(
        blank=True,
        null=True,
        help_text="Teacher feedback on the task"
    )
    grade = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        help_text="Grade received for the task"
    )
    is_completed = models.BooleanField(
        default=False,
        help_text="Whether the task is completed"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'student_diary'
        ordering = ['-due_date']
        verbose_name = 'Student Diary Entry'
        verbose_name_plural = 'Student Diary Entries'
    
    def __str__(self):
        return f"{self.student.name} - {self.subject.s_name} ({self.due_date})"


class Scholarship(models.Model):
    """Scholarship model"""
    
    SCHOLARSHIP_TYPES = [
        ('merit', 'Merit-based'),
        ('need', 'Need-based'),
        ('sports', 'Sports'),
        ('academic', 'Academic Excellence'),
        ('cultural', 'Cultural'),
        ('special', 'Special Circumstances'),
    ]
    
    sch_id = models.AutoField(primary_key=True)
    name = models.CharField(
        max_length=200,
        help_text="Name of the scholarship"
    )
    scholarship_type = models.CharField(
        max_length=20,
        choices=SCHOLARSHIP_TYPES,
        help_text="Type of scholarship"
    )
    description = models.TextField(
        help_text="Description of the scholarship"
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Scholarship amount"
    )
    criteria = models.TextField(
        help_text="Eligibility criteria"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this scholarship is currently available"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'scholarships'
        ordering = ['name']
        verbose_name = 'Scholarship'
        verbose_name_plural = 'Scholarships'
    
    def __str__(self):
        return f"{self.name} ({self.get_scholarship_type_display()})"


class StudentScholarship(models.Model):
    """Student scholarship awards"""
    
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='scholarships',
        help_text="Student receiving the scholarship"
    )
    scholarship = models.ForeignKey(
        Scholarship,
        on_delete=models.CASCADE,
        related_name='awarded_to',
        help_text="Scholarship being awarded"
    )
    award_date = models.DateField(
        help_text="Date when scholarship was awarded"
    )
    amount_awarded = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Amount awarded"
    )
    academic_year = models.CharField(
        max_length=10,
        help_text="Academic year for this scholarship"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this scholarship is currently active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_scholarships'
        unique_together = ['student', 'scholarship', 'academic_year']
        ordering = ['-award_date']
        verbose_name = 'Student Scholarship'
        verbose_name_plural = 'Student Scholarships'
    
    def __str__(self):
        return f"{self.student.name} - {self.scholarship.name} ({self.academic_year})"