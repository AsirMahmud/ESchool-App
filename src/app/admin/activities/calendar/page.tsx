"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarUI,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  List,
  Grid3X3,
} from "lucide-react";

// Sample events data
const events = [
  {
    id: 1,
    name: "Annual Science Fair",
    type: "academic",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "School Auditorium",
    coordinator: "Dr. Sarah Johnson",
    description: "Students showcase their science projects and experiments",
    capacity: 200,
    registered: 150,
    status: "upcoming",
  },
  {
    id: 2,
    name: "Inter-School Basketball Tournament",
    type: "sports",
    date: "2024-03-20",
    time: "02:00 PM",
    location: "School Gymnasium",
    coordinator: "Coach Mike Wilson",
    description: "Annual basketball tournament with local schools",
    capacity: 100,
    registered: 80,
    status: "upcoming",
  },
  {
    id: 3,
    name: "Spring Cultural Festival",
    type: "cultural",
    date: "2024-04-05",
    time: "10:00 AM",
    location: "School Grounds",
    coordinator: "Ms. Emily Chen",
    description: "Celebration of diverse cultures with performances and food",
    capacity: 500,
    registered: 300,
    status: "upcoming",
  },
  {
    id: 4,
    name: "Parent-Teacher Conference",
    type: "academic",
    date: "2024-04-12",
    time: "03:00 PM",
    location: "Multiple Classrooms",
    coordinator: "Principal Roberts",
    description: "Scheduled meetings between parents and teachers",
    capacity: 50,
    registered: 45,
    status: "upcoming",
  },
  {
    id: 5,
    name: "Science Club Meeting",
    type: "club",
    date: "2024-01-22",
    time: "03:00 PM",
    location: "Room 203",
    coordinator: "Dr. Sarah Johnson",
    description: "Weekly science club meeting",
    capacity: 30,
    registered: 25,
    status: "upcoming",
  },
  {
    id: 6,
    name: "Basketball Practice",
    type: "sports",
    date: "2024-01-22",
    time: "04:00 PM",
    location: "School Gymnasium",
    coordinator: "Coach Mike Wilson",
    description: "Varsity basketball team practice",
    capacity: 15,
    registered: 15,
    status: "upcoming",
  },
  {
    id: 7,
    name: "Drama Club Rehearsal",
    type: "club",
    date: "2024-01-24",
    time: "03:30 PM",
    location: "Auditorium",
    coordinator: "Ms. Emily Chen",
    description: "Drama club rehearsal for spring play",
    capacity: 25,
    registered: 20,
    status: "upcoming",
  },
];

const getEventBadgeVariant = (type: string) => {
  switch (type) {
    case "academic":
      return "default";
    case "sports":
      return "secondary";
    case "cultural":
      return "success";
    case "club":
      return "outline";
    case "holiday":
      return "warning";
    default:
      return "outline";
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case "academic":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "sports":
      return "bg-green-100 text-green-800 border-green-200";
    case "cultural":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "club":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "holiday":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function CalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [filterType, setFilterType] = useState("all");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const filteredEvents = events.filter((event) => {
    return filterType === "all" || event.type === filterType;
  });

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDayEvents = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    return dayEvents.slice(0, 3); // Show max 3 events per day
  };

  const getOverflowCount = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    return Math.max(0, dayEvents.length - 3);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Activity Calendar</h2>
          <p className="text-muted-foreground">
            View all activities and events in calendar format.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="flex items-center gap-2"
            onClick={() => router.push('/admin/activities/add')}
          >
            <Plus className="h-4 w-4" />
            New Activity
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {format(currentDate, "MMMM yyyy")}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select value={viewMode} onValueChange={(value: "month" | "week" | "day") => setViewMode(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="club">Club</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
          <CardDescription>
            {filteredEvents.length} activities scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === "month" && (
            <div className="space-y-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day, index) => {
                  const dayEvents = getDayEvents(day);
                  const overflowCount = getOverflowCount(day);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border rounded-lg ${
                        isToday ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isToday ? "text-blue-600" : ""}`}>
                          {format(day, "d")}
                        </span>
                        {isToday && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border cursor-pointer hover:shadow-sm ${getEventColor(event.type)}`}
                            onClick={() => router.push(`/admin/activities/${event.id}`)}
                          >
                            <div className="font-medium truncate">{event.name}</div>
                            <div className="text-xs opacity-75">{event.time}</div>
                          </div>
                        ))}
                        
                        {overflowCount > 0 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{overflowCount} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === "week" && (
            <div className="text-center py-8 text-muted-foreground">
              Week view coming soon
            </div>
          )}

          {viewMode === "day" && (
            <div className="text-center py-8 text-muted-foreground">
              Day view coming soon
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Events List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Next 7 days of activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm cursor-pointer"
                onClick={() => router.push(`/admin/activities/${event.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                    <CalendarUI className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time} • {event.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getEventBadgeVariant(event.type)}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {event.registered}/{event.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
