from django.db import models
from django.core.validators import MinLengthValidator


class Subject(models.Model):
    """Subject model representing academic subjects"""
    
    SUBJECT_TYPES = [
        ('core', 'Core Subject'),
        ('elective', 'Elective Subject'),
        ('extracurricular', 'Extracurricular'),
        ('language', 'Language'),
        ('science', 'Science'),
        ('mathematics', 'Mathematics'),
        ('social_studies', 'Social Studies'),
        ('arts', 'Arts'),
        ('physical_education', 'Physical Education'),
        ('computer', 'Computer Science'),
    ]
    
    DIFFICULTY_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    s_code = models.CharField(
        max_length=20,
        primary_key=True,
        validators=[MinLengthValidator(2)],
        help_text="Subject code (e.g., MATH101, ENG201)"
    )
    s_name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2)],
        help_text="Subject name (e.g., Mathematics, English Literature)"
    )
    subject_type = models.CharField(
        max_length=20,
        choices=SUBJECT_TYPES,
        default='core',
        help_text="Type of subject"
    )
    difficulty_level = models.CharField(
        max_length=20,
        choices=DIFFICULTY_LEVELS,
        default='beginner',
        help_text="Difficulty level of the subject"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the subject"
    )
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name='subjects',
        help_text="Department this subject belongs to"
    )
    prerequisites = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        related_name='prerequisite_for',
        help_text="Subjects that must be completed before taking this subject"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this subject is currently active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'subjects'
        ordering = ['s_code']
        verbose_name = 'Subject'
        verbose_name_plural = 'Subjects'
    
    def __str__(self):
        return f"{self.s_name} ({self.s_code})"
    
    @property
    def teacher_count(self):
        """Return the number of teachers teaching this subject"""
        return self.teachers_teaching.filter(is_active=True).count()
    
    @property
    def level_count(self):
        """Return the number of levels this subject is taught in"""
        return self.levels.filter(is_active=True).count()


class SubjectSyllabus(models.Model):
    """Syllabus for each subject"""
    
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='syllabi',
        help_text="Subject this syllabus belongs to"
    )
    level = models.ForeignKey(
        'level.Level',
        on_delete=models.CASCADE,
        help_text="Level this syllabus is for"
    )
    academic_year = models.CharField(
        max_length=10,
        help_text="Academic year (e.g., 2024-25)"
    )
    syllabus_content = models.TextField(
        help_text="Detailed syllabus content"
    )
    learning_objectives = models.TextField(
        blank=True,
        null=True,
        help_text="Learning objectives for this subject"
    )
    assessment_criteria = models.TextField(
        blank=True,
        null=True,
        help_text="Assessment criteria and methods"
    )
    textbooks = models.TextField(
        blank=True,
        null=True,
        help_text="Recommended textbooks and resources"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this syllabus is currently active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'subject_syllabi'
        unique_together = ['subject', 'level', 'academic_year']
        ordering = ['subject', 'level', '-academic_year']
        verbose_name = 'Subject Syllabus'
        verbose_name_plural = 'Subject Syllabi'
    
    def __str__(self):
        return f"{self.subject.s_name} - {self.level.level_name} ({self.academic_year})"


class SubjectMaterial(models.Model):
    """Teaching materials for subjects"""
    
    MATERIAL_TYPES = [
        ('textbook', 'Textbook'),
        ('workbook', 'Workbook'),
        ('reference', 'Reference Book'),
        ('digital', 'Digital Resource'),
        ('handout', 'Handout'),
        ('worksheet', 'Worksheet'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('software', 'Software'),
        ('other', 'Other'),
    ]
    
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='materials',
        help_text="Subject this material belongs to"
    )
    level = models.ForeignKey(
        'level.Level',
        on_delete=models.CASCADE,
        help_text="Level this material is for"
    )
    material_type = models.CharField(
        max_length=20,
        choices=MATERIAL_TYPES,
        help_text="Type of teaching material"
    )
    title = models.CharField(
        max_length=200,
        help_text="Title of the material"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the material"
    )
    file_path = models.URLField(
        blank=True,
        null=True,
        help_text="Path to the material file"
    )
    is_required = models.BooleanField(
        default=False,
        help_text="Whether this material is required"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this material is currently active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'subject_materials'
        ordering = ['subject', 'level', 'material_type', 'title']
        verbose_name = 'Subject Material'
        verbose_name_plural = 'Subject Materials'
    
    def __str__(self):
        return f"{self.title} - {self.subject.s_name}"


    