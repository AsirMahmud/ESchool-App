from django.db import models
from django.core.validators import MinLengthValidator


class Event(models.Model):
    """Event model for school events and activities"""
    
    EVENT_TYPES = [
        ('academic', 'Academic'),
        ('sports', 'Sports'),
        ('cultural', 'Cultural'),
        ('social', 'Social'),
        ('religious', 'Religious'),
        ('celebration', 'Celebration'),
        ('competition', 'Competition'),
        ('workshop', 'Workshop'),
        ('seminar', 'Seminar'),
        ('conference', 'Conference'),
        ('graduation', 'Graduation'),
        ('orientation', 'Orientation'),
        ('parent_meeting', 'Parent Meeting'),
        ('other', 'Other'),
    ]
    
    EVENT_STATUS = [
        ('planned', 'Planned'),
        ('confirmed', 'Confirmed'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('postponed', 'Postponed'),
    ]
    
    name = models.CharField(
        max_length=200,
        primary_key=True,
        validators=[MinLengthValidator(2)],
        help_text="Name of the event"
    )
    event_type = models.CharField(
        max_length=20,
        choices=EVENT_TYPES,
        help_text="Type of event"
    )
    description = models.TextField(
        help_text="Detailed description of the event"
    )
    location = models.CharField(
        max_length=200,
        help_text="Location where the event will take place"
    )
    start_date = models.DateField(
        help_text="Start date of the event"
    )
    end_date = models.DateField(
        help_text="End date of the event"
    )
    start_time = models.TimeField(
        help_text="Start time of the event"
    )
    end_time = models.TimeField(
        help_text="End time of the event"
    )
    duration = models.DurationField(
        help_text="Duration of the event"
    )
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name='events',
        help_text="Department organizing this event"
    )
    organizer = models.ForeignKey(
        'employee.Employee',
        on_delete=models.SET_NULL,
        null=True,
        related_name='organized_events',
        help_text="Employee organizing this event"
    )
    status = models.CharField(
        max_length=20,
        choices=EVENT_STATUS,
        default='planned',
        help_text="Current status of the event"
    )
    max_participants = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Maximum number of participants"
    )
    registration_required = models.BooleanField(
        default=False,
        help_text="Whether registration is required"
    )
    registration_deadline = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Registration deadline"
    )
    budget = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Budget allocated for the event"
    )
    actual_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Actual cost of the event"
    )
    requirements = models.TextField(
        blank=True,
        null=True,
        help_text="Special requirements for the event"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes"
    )
    is_public = models.BooleanField(
        default=True,
        help_text="Whether this event is open to public"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'events'
        ordering = ['start_date', 'start_time']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
    
    def __str__(self):
        return f"{self.name} ({self.start_date})"
    
    @property
    def is_ongoing(self):
        """Check if event is currently ongoing"""
        from datetime import date, time, datetime
        today = date.today()
        now = datetime.now().time()
        
        if self.start_date <= today <= self.end_date:
            if self.start_date == self.end_date:
                return self.start_time <= now <= self.end_time
            elif today == self.start_date:
                return now >= self.start_time
            elif today == self.end_date:
                return now <= self.end_time
            else:
                return True
        return False
    
    @property
    def participant_count(self):
        """Return number of registered participants"""
        return self.participants.count()
    
    @property
    def is_full(self):
        """Check if event has reached maximum capacity"""
        if self.max_participants:
            return self.participant_count >= self.max_participants
        return False


class EventParticipant(models.Model):
    """Event participants (students, employees, external)"""
    
    PARTICIPANT_TYPES = [
        ('student', 'Student'),
        ('employee', 'Employee'),
        ('parent', 'Parent'),
        ('external', 'External'),
    ]
    
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='participants',
        help_text="Event this participant is registered for"
    )
    participant_type = models.CharField(
        max_length=20,
        choices=PARTICIPANT_TYPES,
        help_text="Type of participant"
    )
    student = models.ForeignKey(
        'student.Student',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='event_participations',
        help_text="Student participant"
    )
    employee = models.ForeignKey(
        'employee.Employee',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='event_participations',
        help_text="Employee participant"
    )
    parent = models.ForeignKey(
        'parent.Parent',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='event_participations',
        help_text="Parent participant"
    )
    external_name = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Name of external participant"
    )
    external_email = models.EmailField(
        blank=True,
        null=True,
        help_text="Email of external participant"
    )
    external_phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text="Phone of external participant"
    )
    registration_date = models.DateTimeField(
        auto_now_add=True,
        help_text="Date when participant registered"
    )
    attendance_confirmed = models.BooleanField(
        default=False,
        help_text="Whether attendance was confirmed"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes about the participant"
    )
    
    class Meta:
        db_table = 'event_participants'
        unique_together = ['event', 'student', 'employee', 'parent', 'external_name']
        verbose_name = 'Event Participant'
        verbose_name_plural = 'Event Participants'
    
    def __str__(self):
        if self.student:
            return f"{self.student.name} - {self.event.name}"
        elif self.employee:
            return f"{self.employee.name} - {self.event.name}"
        elif self.parent:
            return f"{self.parent.name} - {self.event.name}"
        else:
            return f"{self.external_name} - {self.event.name}"
    
    def clean(self):
        """Validate that only one participant type is selected"""
        from django.core.exceptions import ValidationError
        participant_fields = [self.student, self.employee, self.parent, self.external_name]
        if sum(1 for field in participant_fields if field) != 1:
            raise ValidationError("Exactly one participant type must be selected.")


class EventResource(models.Model):
    """Resources required for events"""
    
    RESOURCE_TYPES = [
        ('venue', 'Venue'),
        ('equipment', 'Equipment'),
        ('catering', 'Catering'),
        ('transport', 'Transport'),
        ('decoration', 'Decoration'),
        ('security', 'Security'),
        ('medical', 'Medical'),
        ('other', 'Other'),
    ]
    
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='resources',
        help_text="Event this resource is for"
    )
    resource_type = models.CharField(
        max_length=20,
        choices=RESOURCE_TYPES,
        help_text="Type of resource"
    )
    name = models.CharField(
        max_length=200,
        help_text="Name of the resource"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the resource"
    )
    quantity = models.PositiveIntegerField(
        default=1,
        help_text="Quantity required"
    )
    cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Cost of this resource"
    )
    provider = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Provider of the resource"
    )
    contact_info = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Contact information for the provider"
    )
    is_confirmed = models.BooleanField(
        default=False,
        help_text="Whether this resource is confirmed"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'event_resources'
        ordering = ['resource_type', 'name']
        verbose_name = 'Event Resource'
        verbose_name_plural = 'Event Resources'
    
    def __str__(self):
        return f"{self.event.name} - {self.name} ({self.resource_type})"