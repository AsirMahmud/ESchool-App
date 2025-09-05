from django.db import models
from django.core.validators import MinLengthValidator


class Exam(models.Model):
    """Exam model for managing examinations"""
    
    EXAM_TYPES = [
        ('midterm', 'Midterm Exam'),
        ('final', 'Final Exam'),
        ('quiz', 'Quiz'),
        ('assignment', 'Assignment'),
        ('project', 'Project'),
        ('practical', 'Practical Exam'),
        ('oral', 'Oral Exam'),
        ('entrance', 'Entrance Exam'),
        ('placement', 'Placement Test'),
        ('other', 'Other'),
    ]
    
    EXAM_STATUS = [
        ('scheduled', 'Scheduled'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('postponed', 'Postponed'),
    ]
    
    exam_id = models.AutoField(primary_key=True)
    exam_name = models.CharField(
        max_length=200,
        validators=[MinLengthValidator(2)],
        help_text="Name of the exam"
    )
    exam_type = models.CharField(
        max_length=20,
        choices=EXAM_TYPES,
        help_text="Type of exam"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        related_name='exams',
        help_text="Subject for this exam"
    )
    level = models.ForeignKey(
        'level.Level',
        on_delete=models.CASCADE,
        related_name='exams',
        help_text="Level this exam is for"
    )
    section = models.ForeignKey(
        'level.Section',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='exams',
        help_text="Section this exam is for (null for all sections)"
    )
    duration = models.DurationField(
        help_text="Duration of the exam"
    )
    total_marks = models.PositiveIntegerField(
        help_text="Total marks for the exam"
    )
    passing_marks = models.PositiveIntegerField(
        help_text="Passing marks for the exam"
    )
    exam_date = models.DateField(
        help_text="Date of the exam"
    )
    start_time = models.TimeField(
        help_text="Start time of the exam"
    )
    end_time = models.TimeField(
        help_text="End time of the exam"
    )
    class_room = models.ForeignKey(
        'classroom.Class',
        on_delete=models.SET_NULL,
        null=True,
        related_name='exams',
        help_text="Room where exam will be conducted"
    )
    invigilator = models.ForeignKey(
        'employee.Employee',
        on_delete=models.SET_NULL,
        null=True,
        related_name='invigilated_exams',
        help_text="Employee invigilating this exam"
    )
    status = models.CharField(
        max_length=20,
        choices=EXAM_STATUS,
        default='scheduled',
        help_text="Current status of the exam"
    )
    instructions = models.TextField(
        blank=True,
        null=True,
        help_text="Instructions for the exam"
    )
    academic_year = models.CharField(
        max_length=10,
        help_text="Academic year for this exam"
    )
    semester = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Semester (if applicable)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'exams'
        ordering = ['exam_date', 'start_time']
        verbose_name = 'Exam'
        verbose_name_plural = 'Exams'
    
    def __str__(self):
        return f"{self.exam_name} - {self.subject.s_name} ({self.exam_date})"
    
    @property
    def is_ongoing(self):
        """Check if exam is currently ongoing"""
        from datetime import date, time, datetime
        today = date.today()
        now = datetime.now().time()
        
        return (self.exam_date == today and 
                self.start_time <= now <= self.end_time and 
                self.status == 'ongoing')
    
    @property
    def participant_count(self):
        """Return number of students taking this exam"""
        return self.exam_results.count()


class ExamResult(models.Model):
    """Exam results for students"""
    
    GRADE_CHOICES = [
        ('A+', 'A+'),
        ('A', 'A'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B', 'B'),
        ('B-', 'B-'),
        ('C+', 'C+'),
        ('C', 'C'),
        ('C-', 'C-'),
        ('D+', 'D+'),
        ('D', 'D'),
        ('F', 'F'),
    ]
    
    exam = models.ForeignKey(
        Exam,
        on_delete=models.CASCADE,
        related_name='exam_results',
        help_text="Exam this result is for"
    )
    student = models.ForeignKey(
        'student.Student',
        on_delete=models.CASCADE,
        related_name='exam_results',
        help_text="Student who took the exam"
    )
    marks_obtained = models.PositiveIntegerField(
        help_text="Marks obtained by the student"
    )
    grade = models.CharField(
        max_length=2,
        choices=GRADE_CHOICES,
        help_text="Grade received"
    )
    is_passed = models.BooleanField(
        help_text="Whether the student passed the exam"
    )
    remarks = models.TextField(
        blank=True,
        null=True,
        help_text="Teacher remarks on the performance"
    )
    submitted_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the exam was submitted"
    )
    graded_by = models.ForeignKey(
        'employee.Employee',
        on_delete=models.SET_NULL,
        null=True,
        related_name='graded_exams',
        help_text="Employee who graded this exam"
    )
    graded_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the exam was graded"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'exam_results'
        unique_together = ['exam', 'student']
        ordering = ['-marks_obtained']
        verbose_name = 'Exam Result'
        verbose_name_plural = 'Exam Results'
    
    def __str__(self):
        return f"{self.student.name} - {self.exam.exam_name} ({self.marks_obtained}/{self.exam.total_marks})"
    
    def save(self, *args, **kwargs):
        """Calculate grade and pass status before saving"""
        percentage = (self.marks_obtained / self.exam.total_marks) * 100
        
        # Grade calculation
        if percentage >= 97:
            self.grade = 'A+'
        elif percentage >= 93:
            self.grade = 'A'
        elif percentage >= 90:
            self.grade = 'A-'
        elif percentage >= 87:
            self.grade = 'B+'
        elif percentage >= 83:
            self.grade = 'B'
        elif percentage >= 80:
            self.grade = 'B-'
        elif percentage >= 77:
            self.grade = 'C+'
        elif percentage >= 73:
            self.grade = 'C'
        elif percentage >= 70:
            self.grade = 'C-'
        elif percentage >= 67:
            self.grade = 'D+'
        elif percentage >= 65:
            self.grade = 'D'
        else:
            self.grade = 'F'
        
        # Pass status
        self.is_passed = self.marks_obtained >= self.exam.passing_marks
        
        super().save(*args, **kwargs)


class Attendance(models.Model):
    """Student attendance tracking"""
    
    ATTENDANCE_STATUS = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
        ('excused', 'Excused Absence'),
        ('half_day', 'Half Day'),
    ]
    
    student = models.ForeignKey(
        'student.Student',
        on_delete=models.CASCADE,
        related_name='attendance_records',
        help_text="Student for this attendance record"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        related_name='attendance_records',
        help_text="Subject for this attendance"
    )
    class_room = models.ForeignKey(
        'classroom.Class',
        on_delete=models.SET_NULL,
        null=True,
        related_name='attendance_records',
        help_text="Classroom where attendance was taken"
    )
    date = models.DateField(
        help_text="Date of attendance"
    )
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
    teacher = models.ForeignKey(
        'employee.Employee',
        on_delete=models.SET_NULL,
        null=True,
        related_name='taken_attendance',
        help_text="Teacher who took the attendance"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'attendance'
        unique_together = ['student', 'subject', 'date']
        ordering = ['-date', 'student']
        verbose_name = 'Attendance'
        verbose_name_plural = 'Attendance Records'
    
    def __str__(self):
        return f"{self.student.name} - {self.subject.s_name} ({self.date}) - {self.status}"
    
    @property
    def is_present(self):
        """Check if student was present"""
        return self.status in ['present', 'late', 'half_day']
    
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


class Admission(models.Model):
    """Student admission records"""
    
    ADMISSION_STATUS = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('waitlisted', 'Waitlisted'),
        ('enrolled', 'Enrolled'),
        ('withdrawn', 'Withdrawn'),
    ]
    
    admission_id = models.AutoField(primary_key=True)
    student_name = models.CharField(
        max_length=100,
        help_text="Name of the student applying"
    )
    date_of_birth = models.DateField(
        help_text="Date of birth of the student"
    )
    gender = models.CharField(
        max_length=10,
        choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')],
        help_text="Gender of the student"
    )
    parent_name = models.CharField(
        max_length=100,
        help_text="Name of parent/guardian"
    )
    parent_email = models.EmailField(
        help_text="Email of parent/guardian"
    )
    parent_phone = models.CharField(
        max_length=15,
        help_text="Phone of parent/guardian"
    )
    address = models.TextField(
        help_text="Address of the family"
    )
    previous_school = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Previous school attended"
    )
    level_applying_for = models.ForeignKey(
        'level.Level',
        on_delete=models.SET_NULL,
        null=True,
        help_text="Level applying for"
    )
    application_date = models.DateField(
        auto_now_add=True,
        help_text="Date of application"
    )
    status = models.CharField(
        max_length=20,
        choices=ADMISSION_STATUS,
        default='pending',
        help_text="Admission status"
    )
    admission_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date of admission (if approved)"
    )
    admission_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Admission fee amount"
    )
    admission_fee_paid = models.BooleanField(
        default=False,
        help_text="Whether admission fee has been paid"
    )
    documents_submitted = models.TextField(
        blank=True,
        null=True,
        help_text="List of documents submitted"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes"
    )
    processed_by = models.ForeignKey(
        'employee.Employee',
        on_delete=models.SET_NULL,
        null=True,
        related_name='processed_admissions',
        help_text="Employee who processed this admission"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'admissions'
        ordering = ['-application_date']
        verbose_name = 'Admission'
        verbose_name_plural = 'Admissions'
    
    def __str__(self):
        return f"{self.student_name} - {self.level_applying_for} ({self.status})"
