from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Class(models.Model):
    """Class/Room model representing physical classrooms and spaces"""
    
    ROOM_TYPES = [
        ('classroom', 'Classroom'),
        ('laboratory', 'Laboratory'),
        ('library', 'Library'),
        ('computer_lab', 'Computer Laboratory'),
        ('science_lab', 'Science Laboratory'),
        ('art_room', 'Art Room'),
        ('music_room', 'Music Room'),
        ('gymnasium', 'Gymnasium'),
        ('auditorium', 'Auditorium'),
        ('conference_room', 'Conference Room'),
        ('office', 'Office'),
        ('storage', 'Storage Room'),
        ('other', 'Other'),
    ]
    
    floor = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        help_text="Floor number where the room is located"
    )
    room_no = models.CharField(
        max_length=20,
        help_text="Room number or identifier"
    )
    room_name = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Name of the room (e.g., Computer Lab 1)"
    )
    room_type = models.CharField(
        max_length=20,
        choices=ROOM_TYPES,
        default='classroom',
        help_text="Type of room"
    )
    capacity = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(500)],
        help_text="Maximum capacity of the room"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the room and its facilities"
    )
    equipment = models.TextField(
        blank=True,
        null=True,
        help_text="Available equipment in the room"
    )
    is_available = models.BooleanField(
        default=True,
        help_text="Whether the room is currently available"
    )
    is_air_conditioned = models.BooleanField(
        default=False,
        help_text="Whether the room has air conditioning"
    )
    has_projector = models.BooleanField(
        default=False,
        help_text="Whether the room has a projector"
    )
    has_whiteboard = models.BooleanField(
        default=True,
        help_text="Whether the room has a whiteboard"
    )
    has_computers = models.BooleanField(
        default=False,
        help_text="Whether the room has computers"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'classes'
        unique_together = ['floor', 'room_no']
        ordering = ['floor', 'room_no']
        verbose_name = 'Class/Room'
        verbose_name_plural = 'Classes/Rooms'
    
    def __str__(self):
        return f"Floor {self.floor} - Room {self.room_no} ({self.get_room_type_display()})"
    
    @property
    def full_room_identifier(self):
        """Return full room identifier"""
        return f"{self.floor}-{self.room_no}"
    
    @property
    def current_occupancy(self):
        """Return current number of people in the room (if tracking is implemented)"""
        # This could be implemented with a separate occupancy tracking model
        return 0


class ClassSchedule(models.Model):
    """Schedule for classes/rooms"""
    
    DAYS_OF_WEEK = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    ]
    
    class_room = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='schedules',
        help_text="Room for this schedule"
    )
    day_of_week = models.CharField(
        max_length=10,
        choices=DAYS_OF_WEEK,
        help_text="Day of the week"
    )
    start_time = models.TimeField(
        help_text="Start time of the class"
    )
    end_time = models.TimeField(
        help_text="End time of the class"
    )
    subject = models.ForeignKey(
        'subject.Subject',
        on_delete=models.CASCADE,
        help_text="Subject being taught"
    )
    teacher = models.ForeignKey(
        'teacher.Teacher',
        on_delete=models.CASCADE,
        help_text="Teacher teaching this class"
    )
    level = models.ForeignKey(
        'level.Level',
        on_delete=models.CASCADE,
        help_text="Level this class is for"
    )
    section = models.ForeignKey(
        'level.Section',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="Section this class is for"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this schedule is currently active"
    )
    academic_year = models.CharField(
        max_length=10,
        help_text="Academic year (e.g., 2024-25)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'class_schedules'
        ordering = ['day_of_week', 'start_time']
        verbose_name = 'Class Schedule'
        verbose_name_plural = 'Class Schedules'
        unique_together = ['class_room', 'day_of_week', 'start_time', 'academic_year']
    
    def __str__(self):
        return f"{self.class_room} - {self.get_day_of_week_display()} {self.start_time}-{self.end_time}"


class ClassBooking(models.Model):
    """Temporary bookings for rooms"""
    
    BOOKING_STATUS = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    class_room = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='bookings',
        help_text="Room being booked"
    )
    booked_by = models.ForeignKey(
        'employee.Employee',
        on_delete=models.CASCADE,
        help_text="Employee who made the booking"
    )
    booking_date = models.DateField(
        help_text="Date of the booking"
    )
    start_time = models.TimeField(
        help_text="Start time of the booking"
    )
    end_time = models.TimeField(
        help_text="End time of the booking"
    )
    purpose = models.CharField(
        max_length=200,
        help_text="Purpose of the booking"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Additional details about the booking"
    )
    status = models.CharField(
        max_length=20,
        choices=BOOKING_STATUS,
        default='pending',
        help_text="Status of the booking"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'class_bookings'
        ordering = ['-booking_date', 'start_time']
        verbose_name = 'Class Booking'
        verbose_name_plural = 'Class Bookings'
    
    def __str__(self):
        return f"{self.class_room} - {self.booking_date} {self.start_time}-{self.end_time}"
    
    def clean(self):
        """Validate booking data"""
        from django.core.exceptions import ValidationError
        if self.start_time >= self.end_time:
            raise ValidationError("End time must be after start time.")