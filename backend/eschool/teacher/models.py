from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Teacher(models.Model):
    """Teacher model extending Employee with teaching-specific fields"""
    
    teacher_id = models.OneToOneField(
        'employee.Employee',
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='teacher_profile',
        help_text="Employee record for this teacher"
    )
    qualification = models.CharField(
        max_length=200,
        help_text="Teaching qualifications"
    )
    specialization = models.CharField(
        max_length=200,
        help_text="Subject specialization"
    )
    years_of_experience = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(50)],
        help_text="Years of teaching experience"
    )
    is_class_teacher = models.BooleanField(
        default=False,
        help_text="Whether this teacher is a class teacher"
    )
    max_classes = models.PositiveIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        help_text="Maximum number of classes this teacher can handle"
    )
    bio = models.TextField(
        blank=True,
        null=True,
        help_text="Teacher biography"
    )
    email = models.EmailField(
        blank=True,
        null=True,
        help_text="Teacher's personal email address"
    )
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text="Teacher's personal phone number"
    )
    address = models.TextField(
        blank=True,
        null=True,
        help_text="Teacher's personal address"
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
        help_text="Emergency contact phone number"
    )
    education = models.TextField(
        blank=True,
        null=True,
        help_text="Educational background and degrees"
    )
    certifications = models.TextField(
        blank=True,
        null=True,
        help_text="Professional certifications and licenses"
    )
    skills = models.TextField(
        blank=True,
        null=True,
        help_text="Teaching skills and competencies"
    )
    experience_details = models.TextField(
        blank=True,
        null=True,
        help_text="Detailed work experience"
    )
    achievements = models.TextField(
        blank=True,
        null=True,
        help_text="Awards and achievements"
    )
    social_links = models.JSONField(
        blank=True,
        null=True,
        help_text="Social media and professional links"
    )
    profile_photo = models.ImageField(
        upload_to='teacher_photos/',
        blank=True,
        null=True,
        help_text="Teacher profile photo"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'teachers'
        verbose_name = 'Teacher'
        verbose_name_plural = 'Teachers'
    
    def __str__(self):
        return f"{self.teacher_id.name} (Teacher)"
    
    @property
    def current_subjects(self):
        """Get subjects currently taught by this teacher"""
        return self.subjects_taught.filter(is_active=True)
    
    @property
    def current_classes(self):
        """Get classes currently taught by this teacher"""
        return self.classes_taught.filter(is_active=True)
    
    @property
    def section_subjects(self):
        """Get subjects taught by this teacher through section assignments"""
        from level.models import SectionSubject
        return SectionSubject.objects.filter(teacher=self, is_active=True)
    
    @property
    def all_teaching_subjects(self):
        """Get all subjects this teacher is teaching (both direct and through sections)"""
        from subject.models import Subject
        from level.models import SectionSubject
        
        # Get subject IDs from direct assignments
        direct_subject_ids = self.subjects_taught.filter(is_active=True).values_list('subject_id', flat=True)
        
        # Get subject IDs from section assignments
        section_subject_ids = SectionSubject.objects.filter(
            teacher=self, is_active=True
        ).values_list('subject_id', flat=True)
        
        # Combine and get unique subjects
        all_subject_ids = set(list(direct_subject_ids) + list(section_subject_ids))
        return Subject.objects.filter(s_code__in=all_subject_ids)


class TeacherSubject(models.Model):
    """Many-to-many relationship between Teacher and Subject"""
    
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name='subjects_taught',
        help_text="Teacher teaching this subject"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        related_name='teachers_teaching',
        help_text="Subject being taught"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this teaching assignment is active"
    )
    start_date = models.DateField(
        help_text="Date when teacher started teaching this subject"
    )
    end_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date when teacher stopped teaching this subject"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'teacher_subjects'
        unique_together = ['teacher', 'subject']
        verbose_name = 'Teacher Subject'
        verbose_name_plural = 'Teacher Subjects'
    
    def __str__(self):
        return f"{self.teacher.teacher_id.name} teaches {self.subject.s_name}"


class TeacherClass(models.Model):
    """Many-to-many relationship between Teacher and Class"""
    
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name='classes_taught',
        help_text="Teacher teaching this class"
    )
    class_room = models.ForeignKey(
        'classroom.Class',
        on_delete=models.CASCADE,
        related_name='teachers_teaching',
        help_text="Class being taught"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        help_text="Subject being taught in this class"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this teaching assignment is active"
    )
    start_date = models.DateField(
        help_text="Date when teacher started teaching this class"
    )
    end_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date when teacher stopped teaching this class"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'teacher_classes'
        unique_together = ['teacher', 'class_room', 'subject']
        verbose_name = 'Teacher Class'
        verbose_name_plural = 'Teacher Classes'
    
    def __str__(self):
        return f"{self.teacher.teacher_id.name} teaches {self.subject.s_name} in {self.class_room}"


class TeacherPerformance(models.Model):
    """Teacher performance evaluation"""
    
    PERFORMANCE_RATINGS = [
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('satisfactory', 'Satisfactory'),
        ('needs_improvement', 'Needs Improvement'),
        ('poor', 'Poor'),
    ]
    
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name='performance_records',
        help_text="Teacher being evaluated"
    )
    evaluation_date = models.DateField(
        help_text="Date of performance evaluation"
    )
    academic_performance = models.CharField(
        max_length=20,
        choices=PERFORMANCE_RATINGS,
        help_text="Academic performance rating"
    )
    classroom_management = models.CharField(
        max_length=20,
        choices=PERFORMANCE_RATINGS,
        help_text="Classroom management rating"
    )
    student_interaction = models.CharField(
        max_length=20,
        choices=PERFORMANCE_RATINGS,
        help_text="Student interaction rating"
    )
    professional_development = models.CharField(
        max_length=20,
        choices=PERFORMANCE_RATINGS,
        help_text="Professional development rating"
    )
    overall_rating = models.CharField(
        max_length=20,
        choices=PERFORMANCE_RATINGS,
        help_text="Overall performance rating"
    )
    comments = models.TextField(
        blank=True,
        null=True,
        help_text="Additional comments"
    )
    evaluator = models.ForeignKey(
        'employee.Employee',
        on_delete=models.SET_NULL,
        null=True,
        help_text="Person who conducted the evaluation"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'teacher_performance'
        ordering = ['-evaluation_date']
        verbose_name = 'Teacher Performance'
        verbose_name_plural = 'Teacher Performance Records'
    
    def __str__(self):
        return f"{self.teacher.teacher_id.name} - {self.evaluation_date} ({self.overall_rating})"