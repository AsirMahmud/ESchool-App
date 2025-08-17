import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";

export default function StudentSchedule() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground">
            View your class schedule and upcoming events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline">Today</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select defaultValue="march">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January 2025</SelectItem>
              <SelectItem value="february">February 2025</SelectItem>
              <SelectItem value="march">March 2025</SelectItem>
              <SelectItem value="april">April 2025</SelectItem>
              <SelectItem value="may">May 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="week" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wednesday, March 27, 2025</CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {daySchedule.map((timeSlot, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 flex h-6 w-12 items-center justify-center text-sm font-medium">
                      {timeSlot.time}
                    </div>
                    <div className="ml-16 space-y-4">
                      {timeSlot.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="rounded-md border p-3"
                          style={{
                            borderLeftWidth: "4px",
                            borderLeftColor: event.color,
                          }}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="mt-1 flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                            <MapPin className="ml-3 mr-1 h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                          {event.description && (
                            <div className="mt-2 text-sm">
                              {event.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>March 24 - 30, 2025</CardTitle>
              <CardDescription>Your weekly schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="space-y-2">
                    <div className="text-center">
                      <div className="text-sm font-medium">{day.name}</div>
                      <div
                        className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                          day.isToday
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }`}
                      >
                        {day.date}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {day.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="rounded-md border p-2 text-xs"
                          style={{
                            borderLeftWidth: "3px",
                            borderLeftColor: event.color,
                          }}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="mt-1 text-muted-foreground">
                            {event.startTime} - {event.endTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>March 2025</CardTitle>
              <CardDescription>Monthly calendar view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day, index) => (
                    <div
                      key={index}
                      className="text-center text-sm font-medium"
                    >
                      {day}
                    </div>
                  )
                )}
                {Array(35)
                  .fill(null)
                  .map((_, index) => {
                    const day = index - 4; // Adjust to start March on a Friday
                    return (
                      <div
                        key={index}
                        className={`aspect-square border p-1 ${
                          day === 26 ? "bg-primary/10" : ""
                        }`}
                      >
                        {day > 0 && day <= 31 && (
                          <>
                            <div className="text-xs">{day}</div>
                            {monthEvents[day] && (
                              <div className="mt-1 space-y-1">
                                {monthEvents[day].map((event, eventIndex) => (
                                  <div
                                    key={eventIndex}
                                    className="truncate rounded-sm px-1 text-xs text-white"
                                    style={{ backgroundColor: event.color }}
                                  >
                                    {event.title}
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="agenda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {agendaDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="space-y-2">
                    <div className="flex items-center">
                      <div className="text-lg font-semibold">{day.date}</div>
                      {day.isToday && (
                        <Badge className="ml-2" variant="secondary">
                          Today
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      {day.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="flex items-start rounded-md border p-3"
                          style={{
                            borderLeftWidth: "4px",
                            borderLeftColor: event.color,
                          }}
                        >
                          <div className="mr-4 text-sm font-medium">
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{event.title}</div>
                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                            {event.description && (
                              <div className="mt-2 text-sm">
                                {event.description}
                              </div>
                            )}
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Special events and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.date}
                    </div>
                    <div className="text-sm">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
            <CardDescription>
              Details about your current classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classInfo.map((info, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-medium">{info.name}</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{info.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{info.schedule}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const daySchedule = [
  {
    time: "8:00",
    events: [],
  },
  {
    time: "9:00",
    events: [],
  },
  {
    time: "10:00",
    events: [
      {
        title: "Advanced Mathematics",
        startTime: "10:30",
        endTime: "11:45",
        location: "Room 101",
        description: "Lecture on differential equations",
        color: "#4f46e5",
      },
    ],
  },
  {
    time: "11:00",
    events: [],
  },
  {
    time: "12:00",
    events: [
      {
        title: "Lunch Break",
        startTime: "12:00",
        endTime: "12:30",
        location: "Cafeteria",
        color: "#65a30d",
      },
    ],
  },
  {
    time: "13:00",
    events: [
      {
        title: "History",
        startTime: "13:00",
        endTime: "14:15",
        location: "Room 203",
        description: "Discussion on World War II",
        color: "#ca8a04",
      },
    ],
  },
  {
    time: "14:00",
    events: [],
  },
  {
    time: "15:00",
    events: [
      {
        title: "Physics",
        startTime: "15:30",
        endTime: "16:45",
        location: "Lab 3",
        description: "Lab experiment on wave properties",
        color: "#0891b2",
      },
    ],
  },
  {
    time: "16:00",
    events: [],
  },
  {
    time: "17:00",
    events: [
      {
        title: "Study Group",
        startTime: "17:15",
        endTime: "18:30",
        location: "Library",
        description: "Math study group",
        color: "#be185d",
      },
    ],
  },
];

const weekDays = [
  {
    name: "Mon",
    date: "24",
    isToday: false,
    events: [
      {
        title: "English Literature",
        startTime: "9:00",
        endTime: "10:15",
        color: "#be185d",
      },
      {
        title: "Computer Science",
        startTime: "13:00",
        endTime: "14:15",
        color: "#15803d",
      },
    ],
  },
  {
    name: "Tue",
    date: "25",
    isToday: false,
    events: [
      {
        title: "Physics",
        startTime: "10:30",
        endTime: "11:45",
        color: "#0891b2",
      },
      {
        title: "Study Group",
        startTime: "15:00",
        endTime: "16:30",
        color: "#6366f1",
      },
    ],
  },
  {
    name: "Wed",
    date: "26",
    isToday: true,
    events: [
      {
        title: "Advanced Mathematics",
        startTime: "10:30",
        endTime: "11:45",
        color: "#4f46e5",
      },
      {
        title: "History",
        startTime: "13:00",
        endTime: "14:15",
        color: "#ca8a04",
      },
      {
        title: "Physics",
        startTime: "15:30",
        endTime: "16:45",
        color: "#0891b2",
      },
    ],
  },
  {
    name: "Thu",
    date: "27",
    isToday: false,
    events: [
      {
        title: "English Literature",
        startTime: "9:00",
        endTime: "10:15",
        color: "#be185d",
      },
      {
        title: "Computer Science",
        startTime: "13:00",
        endTime: "14:15",
        color: "#15803d",
      },
    ],
  },
  {
    name: "Fri",
    date: "28",
    isToday: false,
    events: [
      {
        title: "Advanced Mathematics",
        startTime: "10:30",
        endTime: "11:45",
        color: "#4f46e5",
      },
      {
        title: "History",
        startTime: "13:00",
        endTime: "14:15",
        color: "#ca8a04",
      },
    ],
  },
  {
    name: "Sat",
    date: "29",
    isToday: false,
    events: [
      {
        title: "Study Group",
        startTime: "11:00",
        endTime: "13:00",
        color: "#6366f1",
      },
    ],
  },
  {
    name: "Sun",
    date: "30",
    isToday: false,
    events: [],
  },
];

const monthEvents = {
  5: [{ title: "Midterm Exam", color: "#ef4444" }],
  12: [
    { title: "Physics Lab", color: "#0891b2" },
    { title: "Essay Due", color: "#be185d" },
  ],
  15: [{ title: "Math Quiz", color: "#4f46e5" }],
  20: [{ title: "History Presentation", color: "#ca8a04" }],
  24: [
    { title: "English Literature", color: "#be185d" },
    { title: "Computer Science", color: "#15803d" },
  ],
  25: [{ title: "Physics", color: "#0891b2" }],
  26: [
    { title: "Advanced Mathematics", color: "#4f46e5" },
    { title: "History", color: "#ca8a04" },
    { title: "Physics", color: "#0891b2" },
  ],
  27: [
    { title: "English Literature", color: "#be185d" },
    { title: "Computer Science", color: "#15803d" },
  ],
  28: [
    { title: "Advanced Mathematics", color: "#4f46e5" },
    { title: "History", color: "#ca8a04" },
  ],
  29: [{ title: "Study Group", color: "#6366f1" }],
};

const agendaDays = [
  {
    date: "Wednesday, March 26, 2025",
    isToday: true,
    events: [
      {
        title: "Advanced Mathematics",
        startTime: "10:30",
        endTime: "11:45",
        location: "Room 101",
        description: "Lecture on differential equations",
        color: "#4f46e5",
        type: "Class",
      },
      {
        title: "History",
        startTime: "13:00",
        endTime: "14:15",
        location: "Room 203",
        description: "Discussion on World War II",
        color: "#ca8a04",
        type: "Class",
      },
      {
        title: "Physics",
        startTime: "15:30",
        endTime: "16:45",
        location: "Lab 3",
        description: "Lab experiment on wave properties",
        color: "#0891b2",
        type: "Class",
      },
    ],
  },
  {
    date: "Thursday, March 27, 2025",
    isToday: false,
    events: [
      {
        title: "English Literature",
        startTime: "9:00",
        endTime: "10:15",
        location: "Room 105",
        description: "Discussion on Jane Austen",
        color: "#be185d",
        type: "Class",
      },
      {
        title: "Computer Science",
        startTime: "13:00",
        endTime: "14:15",
        location: "Computer Lab 2",
        description: "Programming lab session",
        color: "#15803d",
        type: "Class",
      },
      {
        title: "Academic Advising",
        startTime: "15:00",
        endTime: "15:30",
        location: "Admin Building, Room 203",
        description: "Course selection for next semester",
        color: "#6366f1",
        type: "Meeting",
      },
    ],
  },
  {
    date: "Friday, March 28, 2025",
    isToday: false,
    events: [
      {
        title: "Advanced Mathematics",
        startTime: "10:30",
        endTime: "11:45",
        location: "Room 101",
        description: "Quiz on differential equations",
        color: "#4f46e5",
        type: "Class",
      },
      {
        title: "History",
        startTime: "13:00",
        endTime: "14:15",
        location: "Room 203",
        description: "Group presentations",
        color: "#ca8a04",
        type: "Class",
      },
    ],
  },
];

const upcomingEvents = [
  {
    title: "Physics Midterm Exam",
    date: "April 3, 2025",
    description: "Covers chapters 5-8 on thermodynamics and fluid mechanics.",
  },
  {
    title: "Spring Break",
    date: "April 10-17, 2025",
    description: "No classes during this period.",
  },
  {
    title: "History Research Paper Due",
    date: "April 5, 2025",
    description: "5-page paper on a historical event of your choice.",
  },
  {
    title: "Career Fair",
    date: "April 8, 2025",
    description:
      "Campus-wide career fair in the Student Center from 10 AM to 3 PM.",
  },
];

const classInfo = [
  {
    name: "Advanced Mathematics (MATH301)",
    location: "Room 101",
    schedule: "MWF 10:30-11:45 AM",
  },
  {
    name: "Physics (PHYS201)",
    location: "Lab 3",
    schedule: "MW 3:30-4:45 PM",
  },
  {
    name: "World History (HIST101)",
    location: "Room 203",
    schedule: "MWF 1:00-2:15 PM",
  },
  {
    name: "English Literature (ENG202)",
    location: "Room 105",
    schedule: "TTh 9:00-10:15 AM",
  },
  {
    name: "Computer Science (CS101)",
    location: "Computer Lab 2",
    schedule: "TTh 1:00-2:15 PM",
  },
];
