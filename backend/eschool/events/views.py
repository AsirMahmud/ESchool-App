from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Event, EventParticipant, EventResource
from .serializers import (
    EventSerializer, EventDetailSerializer, EventListSerializer,
    EventParticipantSerializer, EventResourceSerializer
)


class EventViewSet(viewsets.ModelViewSet):
    """ViewSet for Event model"""
    
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['event_type', 'status', 'department', 'is_public']
    search_fields = ['name', 'description', 'location']
    ordering_fields = ['start_date', 'end_date', 'name']
    ordering = ['-start_date']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return EventListSerializer
        elif self.action == 'retrieve':
            return EventDetailSerializer
        return EventSerializer
    
    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        """Get participants for a specific event"""
        event = self.get_object()
        participants = event.participants.all()
        serializer = EventParticipantSerializer(participants, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def resources(self, request, pk=None):
        """Get resources for a specific event"""
        event = self.get_object()
        resources = event.resources.all()
        serializer = EventResourceSerializer(resources, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def register_participant(self, request, pk=None):
        """Register a participant for an event"""
        event = self.get_object()
        serializer = EventParticipantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(event=event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_resource(self, request, pk=None):
        """Add a resource to an event"""
        event = self.get_object()
        serializer = EventResourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(event=event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events"""
        from datetime import date
        today = date.today()
        upcoming_events = Event.objects.filter(
            start_date__gte=today, status__in=['planned', 'confirmed']
        )
        serializer = EventListSerializer(upcoming_events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def ongoing(self, request):
        """Get ongoing events"""
        ongoing_events = Event.objects.filter(status='ongoing')
        serializer = EventListSerializer(ongoing_events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get events grouped by type"""
        from django.db.models import Count
        
        types = Event.objects.values('event_type').annotate(
            count=Count('id')
        ).order_by('event_type')
        
        return Response(list(types))
    
    @action(detail=False, methods=['get'])
    def by_department(self, request):
        """Get events grouped by department"""
        from django.db.models import Count
        
        departments = Event.objects.values('department__d_name').annotate(
            count=Count('id')
        ).order_by('department__d_name')
        
        return Response(list(departments))
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get event statistics"""
        from django.db.models import Count, Sum
        from datetime import date
        
        today = date.today()
        
        stats = {
            'total_events': Event.objects.count(),
            'upcoming_events': Event.objects.filter(
                start_date__gte=today, status__in=['planned', 'confirmed']
            ).count(),
            'ongoing_events': Event.objects.filter(status='ongoing').count(),
            'completed_events': Event.objects.filter(status='completed').count(),
            'by_type': list(Event.objects.values('event_type').annotate(count=Count('id'))),
            'by_department': list(Event.objects.values('department__d_name').annotate(count=Count('id'))),
            'by_status': list(Event.objects.values('status').annotate(count=Count('id'))),
            'total_budget': Event.objects.aggregate(Sum('budget'))['budget__sum'] or 0,
        }
        return Response(stats)


class EventParticipantViewSet(viewsets.ModelViewSet):
    """ViewSet for EventParticipant model"""
    
    queryset = EventParticipant.objects.all()
    serializer_class = EventParticipantSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['event', 'participant_type', 'attendance_confirmed']
    search_fields = ['event__name', 'student__name', 'employee__name', 'parent__name', 'external_name']
    ordering_fields = ['registration_date']
    ordering = ['-registration_date']


class EventResourceViewSet(viewsets.ModelViewSet):
    """ViewSet for EventResource model"""
    
    queryset = EventResource.objects.all()
    serializer_class = EventResourceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['event', 'resource_type', 'is_confirmed']
    search_fields = ['event__name', 'name', 'provider']
    ordering_fields = ['name', 'cost']
    ordering = ['event__name', 'name']