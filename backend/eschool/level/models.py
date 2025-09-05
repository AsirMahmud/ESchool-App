from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Level(models.Model):
    """Academic level model (e.g., Grade 1, Grade 2, etc.)"""
    
    LEVEL_TYPES = [
        ('elementary', 'Elementary'),
        ('middle', 'Middle School'),
        ('high', 'High School'),
        ('pre_k', 'Pre-Kindergarten'),
        ('kindergarten', 'Kindergarten'),
    ]
    
    level_no = models.PositiveIntegerField(
        primary_key=True,
        validators=[MinValueValidator(1), MaxValueValidator(12)],
        help_text="Level number (1-12)"
    )
    level_name = models.CharField(
        max_length=50,
        help_text="Name of the level (e.g., Grade 1, Class 5)"
    )
    level_type = models.CharField(
        max_length=20,
        choices=LEVEL_TYPES,
        help_text="Type of academic level"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the level"
    )
    age_range_min = models.PositiveIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(3), MaxValueValidator(18)],
        help_text="Minimum age for this level"
    )
    age_range_max = models.PositiveIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(3), MaxValueValidator(18)],
        help_text="Maximum age for this level"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this level is currently active"
    )
    classroom = models.OneToOneField(
        'classroom.Class',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='level',
        help_text="Single classroom assigned to this level"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'levels'
        ordering = ['level_no']
        verbose_name = 'Level'
        verbose_name_plural = 'Levels'
    
    def __str__(self):
        return f"{self.level_name} (Level {self.level_no})"
    
    @property
    def student_count(self):
        """Return the number of students in this level"""
        return self.students.count()
    
    @property
    def section_count(self):
        """Return the number of sections in this level"""
        return self.sections.count()
    
    @property
    def teacher_count(self):
        """Return the number of teachers assigned to this level"""
        return self.teachers.count()


class Section(models.Model):
    """Section model for organizing students within a level"""
    
    SECTION_TYPES = [
        ('regular', 'Regular'),
        ('advanced', 'Advanced'),
        ('remedial', 'Remedial'),
        ('special', 'Special Needs'),
    ]
    
    level = models.ForeignKey(
        Level,
        on_delete=models.CASCADE,
        related_name='sections',
        help_text="Level this section belongs to"
    )
    sec_no = models.CharField(
        max_length=10,
        help_text="Section number/identifier (e.g., A, B, 1, 2)"
    )
    section_name = models.CharField(
        max_length=50,
        help_text="Full section name (e.g., Grade 1-A, Class 5-B)"
    )
    section_type = models.CharField(
        max_length=20,
        choices=SECTION_TYPES,
        default='regular',
        help_text="Type of section"
    )
    max_students = models.PositiveIntegerField(
        default=30,
        validators=[MinValueValidator(1), MaxValueValidator(50)],
        help_text="Maximum number of students allowed in this section"
    )
    class_teacher = models.ForeignKey(
        'teacher.Teacher',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='class_teacher_sections',
        help_text="Class teacher for this section"
    )
    room = models.ForeignKey(
        'classroom.Class',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='section_room',
        help_text="Primary classroom for this section"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this section is currently active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'sections'
        unique_together = ['level', 'sec_no']
        ordering = ['level', 'sec_no']
        verbose_name = 'Section'
        verbose_name_plural = 'Sections'
    
    def __str__(self):
        return f"{self.section_name}"
    
    @property
    def student_count(self):
        """Return the current number of students in this section"""
        return self.students.count()
    
    @property
    def is_full(self):
        """Check if section has reached maximum capacity"""
        return self.student_count >= self.max_students
    
    @property
    def available_spots(self):
        """Return number of available spots in this section"""
        return max(0, self.max_students - self.student_count)


class LevelSubject(models.Model):
    """Many-to-many relationship between Level and Subject"""
    
    level = models.ForeignKey(
        Level,
        on_delete=models.CASCADE,
        related_name='level_subjects',
        help_text="Level this subject belongs to"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        related_name='levels',
        help_text="Subject for this level"
    )
    is_compulsory = models.BooleanField(
        default=True,
        help_text="Whether this subject is compulsory for this level"
    )
    weekly_hours = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        help_text="Number of hours per week for this subject"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this subject is currently active for this level"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'level_subjects'
        unique_together = ['level', 'subject']
        verbose_name = 'Level Subject'
        verbose_name_plural = 'Level Subjects'
    
    def __str__(self):
        return f"{self.level.level_name} - {self.subject.s_name}"


class SectionSubject(models.Model):
    """Assignment of a Subject to a Section with an optional Teacher"""
    section = models.ForeignKey(
        'level.Section',
        on_delete=models.CASCADE,
        related_name='section_subjects',
        help_text="Section receiving the subject"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        related_name='section_assignments',
        help_text="Subject assigned to the section"
    )
    teacher = models.ForeignKey(
        'teacher.Teacher',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='section_subjects',
        help_text="Teacher assigned to teach this subject in the section"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'section_subjects'
        unique_together = ['section', 'subject']
        ordering = ['section', 'subject']
        verbose_name = 'Section Subject'
        verbose_name_plural = 'Section Subjects'

    def __str__(self):
        return f"{self.section.section_name} - {self.subject.s_name}"