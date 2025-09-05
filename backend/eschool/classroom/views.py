from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Class, ClassSchedule, ClassBooking
from .serializers import (
    ClassSerializer, ClassDetailSerializer, ClassListSerializer,
    ClassScheduleSerializer, ClassBookingSerializer
)


class ClassViewSet(viewsets.ModelViewSet):
    """ViewSet for Class/Room model"""
    
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['room_type', 'floor', 'is_available']
    search_fields = ['room_name', 'room_no', 'description']
    ordering_fields = ['floor', 'room_no', 'capacity']
    ordering = ['floor', 'room_no']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return ClassListSerializer
        elif self.action == 'retrieve':
            return ClassDetailSerializer
        return ClassSerializer
    
    @action(detail=True, methods=['get'])
    def schedules(self, request, pk=None):
        """Get schedules for a specific class/room"""
        class_room = self.get_object()
        schedules = class_room.schedules.filter(is_active=True)
        serializer = ClassScheduleSerializer(schedules, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def bookings(self, request, pk=None):
        """Get bookings for a specific class/room"""
        class_room = self.get_object()
        bookings = class_room.bookings.all()
        serializer = ClassBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def book(self, request, pk=None):
        """Book a class/room"""
        class_room = self.get_object()
        serializer = ClassBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(class_room=class_room)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def available(self, request):
        """Get available rooms"""
        available_rooms = Class.objects.filter(is_available=True)
        serializer = ClassListSerializer(available_rooms, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get rooms grouped by type"""
        from django.db.models import Count
        
        types = Class.objects.values('room_type').annotate(
            count=Count('id')
        ).order_by('room_type')
        
        return Response(list(types))
    
    @action(detail=False, methods=['get'])
    def by_floor(self, request):
        """Get rooms grouped by floor"""
        from django.db.models import Count
        
        floors = Class.objects.values('floor').annotate(
            count=Count('id')
        ).order_by('floor')
        
        return Response(list(floors))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get class/room statistics"""
        from django.db.models import Count, Avg
        
        stats = {
            'total_rooms': Class.objects.count(),
            'available_rooms': Class.objects.filter(is_available=True).count(),
            'by_type': list(Class.objects.values('room_type').annotate(count=Count('id'))),
            'by_floor': list(Class.objects.values('floor').annotate(count=Count('id'))),
            'average_capacity': round(
                Class.objects.aggregate(
                    avg_capacity=Avg('capacity')
                )['avg_capacity'] or 0, 2
            ),
            'total_capacity': sum(room.capacity for room in Class.objects.all()),
        }
        return Response(stats)


class ClassScheduleViewSet(viewsets.ModelViewSet):
    """ViewSet for ClassSchedule model"""
    
    queryset = ClassSchedule.objects.all()
    serializer_class = ClassScheduleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['class_room', 'subject', 'teacher', 'level', 'section', 'is_active']
    search_fields = ['class_room__room_name', 'subject__s_name', 'teacher__teacher_id__name']
    ordering_fields = ['day_of_week', 'start_time']
    ordering = ['day_of_week', 'start_time']
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's schedule"""
        from datetime import datetime
        today = datetime.now().strftime('%A').lower()
        schedule = ClassSchedule.objects.filter(
            day_of_week=today, is_active=True
        )
        serializer = ClassScheduleSerializer(schedule, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_teacher(self, request):
        """Get schedule by teacher"""
        teacher_id = request.query_params.get('teacher_id')
        if teacher_id:
            schedule = ClassSchedule.objects.filter(
                teacher__teacher_id=teacher_id, is_active=True
            )
            serializer = ClassScheduleSerializer(schedule, many=True)
            return Response(serializer.data)
        return Response({'error': 'teacher_id parameter is required'}, status=400)
    
    @action(detail=False, methods=['get'])
    def by_level(self, request):
        """Get schedule by level"""
        level_id = request.query_params.get('level_id')
        if level_id:
            schedule = ClassSchedule.objects.filter(
                level__level_no=level_id, is_active=True
            )
            serializer = ClassScheduleSerializer(schedule, many=True)
            return Response(serializer.data)
        return Response({'error': 'level_id parameter is required'}, status=400)


class ClassBookingViewSet(viewsets.ModelViewSet):
    """ViewSet for ClassBooking model"""
    
    queryset = ClassBooking.objects.all()
    serializer_class = ClassBookingSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['class_room', 'booked_by', 'status', 'booking_date']
    search_fields = ['class_room__room_name', 'booked_by__name', 'purpose']
    ordering_fields = ['booking_date', 'start_time']
    ordering = ['-booking_date', 'start_time']
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's bookings"""
        from datetime import date
        today = date.today()
        bookings = ClassBooking.objects.filter(booking_date=today)
        serializer = ClassBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming bookings"""
        from datetime import date
        today = date.today()
        bookings = ClassBooking.objects.filter(booking_date__gte=today)
        serializer = ClassBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """Confirm a booking"""
        booking = self.get_object()
        booking.status = 'confirmed'
        booking.save()
        serializer = ClassBookingSerializer(booking)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel a booking"""
        booking = self.get_object()
        booking.status = 'cancelled'
        booking.save()
        serializer = ClassBookingSerializer(booking)
        return Response(serializer.data)