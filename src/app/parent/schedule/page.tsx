import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Clock,
  User,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ParentSchedule() {
  // Sample schedule data
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "8:00 - 8:45",
    "8:50 - 9:35",
    "9:40 - 10:25",
    "10:40 - 11:25",
    "11:30 - 12:15",
    "1:15 - 2:00",
    "2:05 - 2:50",
    "2:55 - 3:40",
  ];

  // Sample schedule for Emma (Grade 8)
  const emmaSchedule = [
    // Monday
    [
      { subject: "Mathematics", teacher: "Ms. Williams", room: "Room 201" },
      { subject: "English", teacher: "Mr. Thompson", room: "Room 105" },
      { subject: "Science", teacher: "Dr. Martinez", room: "Lab 3" },
      { subject: "History", teacher: "Mrs. Johnson", room: "Room 302" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "Art", teacher: "Ms. Lee", room: "Art Studio" },
      {
        subject: "Physical Education",
        teacher: "Coach Davis",
        room: "Gymnasium",
      },
      { subject: "Study Hall", teacher: "Mr. Wilson", room: "Library" },
    ],
    // Tuesday
    [
      { subject: "Science", teacher: "Dr. Martinez", room: "Lab 3" },
      { subject: "Mathematics", teacher: "Ms. Williams", room: "Room 201" },
      { subject: "Foreign Language", teacher: "Ms. Garcia", room: "Room 204" },
      { subject: "English", teacher: "Mr. Thompson", room: "Room 105" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "Music", teacher: "Mr. Chen", room: "Music Room" },
      { subject: "History", teacher: "Mrs. Johnson", room: "Room 302" },
      { subject: "Elective: Robotics", teacher: "Dr. Smith", room: "Tech Lab" },
    ],
    // Wednesday
    [
      { subject: "English", teacher: "Mr. Thompson", room: "Room 105" },
      { subject: "Mathematics", teacher: "Ms. Williams", room: "Room 201" },
      { subject: "Science", teacher: "Dr. Martinez", room: "Lab 3" },
      { subject: "Foreign Language", teacher: "Ms. Garcia", room: "Room 204" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "History", teacher: "Mrs. Johnson", room: "Room 302" },
      {
        subject: "Physical Education",
        teacher: "Coach Davis",
        room: "Gymnasium",
      },
      { subject: "Study Hall", teacher: "Mr. Wilson", room: "Library" },
    ],
    // Thursday
    [
      { subject: "Mathematics", teacher: "Ms. Williams", room: "Room 201" },
      { subject: "Science", teacher: "Dr. Martinez", room: "Lab 3" },
      { subject: "English", teacher: "Mr. Thompson", room: "Room 105" },
      { subject: "History", teacher: "Mrs. Johnson", room: "Room 302" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "Foreign Language", teacher: "Ms. Garcia", room: "Room 204" },
      { subject: "Art", teacher: "Ms. Lee", room: "Art Studio" },
      { subject: "Elective: Robotics", teacher: "Dr. Smith", room: "Tech Lab" },
    ],
    // Friday
    [
      { subject: "Science", teacher: "Dr. Martinez", room: "Lab 3" },
      { subject: "English", teacher: "Mr. Thompson", room: "Room 105" },
      { subject: "Mathematics", teacher: "Ms. Williams", room: "Room 201" },
      { subject: "Music", teacher: "Mr. Chen", room: "Music Room" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "History", teacher: "Mrs. Johnson", room: "Room 302" },
      {
        subject: "Physical Education",
        teacher: "Coach Davis",
        room: "Gymnasium",
      },
      { subject: "Foreign Language", teacher: "Ms. Garcia", room: "Room 204" },
    ],
  ];

  // Sample schedule for Noah (Grade 5)
  const noahSchedule = [
    // Monday
    [
      { subject: "Morning Assembly", teacher: "", room: "Auditorium" },
      { subject: "Mathematics", teacher: "Mr. Anderson", room: "Room 105" },
      { subject: "English", teacher: "Ms. Parker", room: "Room 107" },
      { subject: "Science", teacher: "Mrs. Taylor", room: "Room 110" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "Social Studies", teacher: "Mr. Brown", room: "Room 108" },
      { subject: "Art", teacher: "Ms. Rivera", room: "Art Room" },
      { subject: "Reading Time", teacher: "Ms. Parker", room: "Library" },
    ],
    // Tuesday
    [
      { subject: "Morning Assembly", teacher: "", room: "Auditorium" },
      { subject: "English", teacher: "Ms. Parker", room: "Room 107" },
      { subject: "Mathematics", teacher: "Mr. Anderson", room: "Room 105" },
      {
        subject: "Physical Education",
        teacher: "Coach Wilson",
        room: "Gymnasium",
      },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "Science", teacher: "Mrs. Taylor", room: "Room 110" },
      { subject: "Music", teacher: "Mr. Lewis", room: "Music Room" },
      { subject: "Homework Time", teacher: "Mr. Brown", room: "Room 108" },
    ],
    // Wednesday
    [
      { subject: "Morning Assembly", teacher: "", room: "Auditorium" },
      { subject: "Mathematics", teacher: "Mr. Anderson", room: "Room 105" },
      { subject: "Science", teacher: "Mrs. Taylor", room: "Room 110" },
      { subject: "English", teacher: "Ms. Parker", room: "Room 107" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "Computer", teacher: "Ms. Nelson", room: "Computer Lab" },
      { subject: "Social Studies", teacher: "Mr. Brown", room: "Room 108" },
      { subject: "Reading Time", teacher: "Ms. Parker", room: "Library" },
    ],
    // Thursday
    [
      { subject: "Morning Assembly", teacher: "", room: "Auditorium" },
      { subject: "English", teacher: "Ms. Parker", room: "Room 107" },
      { subject: "Mathematics", teacher: "Mr. Anderson", room: "Room 105" },
      { subject: "Science", teacher: "Mrs. Taylor", room: "Room 110" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      {
        subject: "Physical Education",
        teacher: "Coach Wilson",
        room: "Gymnasium",
      },
      { subject: "Art", teacher: "Ms. Rivera", room: "Art Room" },
      { subject: "Homework Time", teacher: "Mr. Brown", room: "Room 108" },
    ],
    // Friday
    [
      { subject: "Morning Assembly", teacher: "", room: "Auditorium" },
      { subject: "Mathematics", teacher: "Mr. Anderson", room: "Room 105" },
      { subject: "English", teacher: "Ms. Parker", room: "Room 107" },
      { subject: "Social Studies", teacher: "Mr. Brown", room: "Room 108" },
      { subject: "Lunch", teacher: "", room: "Cafeteria" },
      { subject: "Science", teacher: "Mrs. Taylor", room: "Room 110" },
      { subject: "Music", teacher: "Mr. Lewis", room: "Music Room" },
      { subject: "Class Party", teacher: "All Teachers", room: "Room 107" },
    ],
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      title: "Mathematics Mid-Term Exam",
      date: "May 15, 2025",
      time: "9:40 - 10:25",
      location: "Room 201",
      child: "Emma Johnson",
    },
    {
      title: "Science Project Presentation",
      date: "May 20, 2025",
      time: "9:40 - 10:25",
      location: "Lab 3",
      child: "Emma Johnson",
    },
    {
      title: "English Spelling Bee",
      date: "May 18, 2025",
      time: "1:15 - 2:00",
      location: "Room 107",
      child: "Noah Johnson",
    },
    {
      title: "Field Trip: Science Museum",
      date: "May 22, 2025",
      time: "8:00 - 3:00",
      location: "City Science Museum",
      child: "Noah Johnson",
    },
    {
      title: "Parent-Teacher Conference",
      date: "May 25, 2025",
      time: "4:00 - 6:00",
      location: "School Auditorium",
      child: "All Children",
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">
          View class schedules and upcoming events
        </p>
      </div>

      <Tabs defaultValue="emma" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="emma">Emma's Schedule</TabsTrigger>
            <TabsTrigger value="noah">Noah's Schedule</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous">Previous Week</SelectItem>
                <SelectItem value="current">Current Week</SelectItem>
                <SelectItem value="next">Next Week</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="emma" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Emma's Weekly Schedule</CardTitle>
                  <CardDescription>
                    Grade 8-A | Week of May 12-16, 2025
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-muted font-medium text-left min-w-[100px]">
                        Time
                      </th>
                      {weekdays.map((day, index) => (
                        <th
                          key={index}
                          className="border p-2 bg-muted font-medium text-left min-w-[180px]"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time, timeIndex) => (
                      <tr
                        key={timeIndex}
                        className={timeIndex === 4 ? "bg-muted/30" : ""}
                      >
                        <td className="border p-2 font-medium">{time}</td>
                        {weekdays.map((_, dayIndex) => {
                          const lesson = emmaSchedule[dayIndex][timeIndex];
                          return (
                            <td key={dayIndex} className="border p-2">
                              {lesson.subject === "Lunch" ? (
                                <div className="text-center text-muted-foreground">
                                  <span className="block font-medium">
                                    {lesson.subject}
                                  </span>
                                  <span className="text-xs">{lesson.room}</span>
                                </div>
                              ) : (
                                <div>
                                  <div className="font-medium">
                                    {lesson.subject}
                                  </div>
                                  {lesson.teacher && (
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <User className="h-3 w-3 mr-1" />
                                      {lesson.teacher}
                                    </div>
                                  )}
                                  {lesson.room && (
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {lesson.room}
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="noah" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Noah's Weekly Schedule</CardTitle>
                  <CardDescription>
                    Grade 5-C | Week of May 12-16, 2025
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-muted font-medium text-left min-w-[100px]">
                        Time
                      </th>
                      {weekdays.map((day, index) => (
                        <th
                          key={index}
                          className="border p-2 bg-muted font-medium text-left min-w-[180px]"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time, timeIndex) => (
                      <tr
                        key={timeIndex}
                        className={timeIndex === 4 ? "bg-muted/30" : ""}
                      >
                        <td className="border p-2 font-medium">{time}</td>
                        {weekdays.map((_, dayIndex) => {
                          const lesson = noahSchedule[dayIndex][timeIndex];
                          return (
                            <td key={dayIndex} className="border p-2">
                              {lesson.subject === "Lunch" ? (
                                <div className="text-center text-muted-foreground">
                                  <span className="block font-medium">
                                    {lesson.subject}
                                  </span>
                                  <span className="text-xs">{lesson.room}</span>
                                </div>
                              ) : (
                                <div>
                                  <div className="font-medium">
                                    {lesson.subject}
                                  </div>
                                  {lesson.teacher && (
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <User className="h-3 w-3 mr-1" />
                                      {lesson.teacher}
                                    </div>
                                  )}
                                  {lesson.room && (
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {lesson.room}
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Tests, assignments, and school events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    <div className="bg-primary/10 p-2 rounded-md">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.child}
                          </div>
                        </div>
                        <Badge variant="outline">{event.date}</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
