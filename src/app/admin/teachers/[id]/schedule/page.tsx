import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Calendar, Clock, Download, Printer } from "lucide-react";
import Link from "next/link";

export default function TeacherSchedulePage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the teacher data based on the ID
  const teacher = {
    id: params.id,
    name: "Sarah Johnson",
    department: "Mathematics",
  };

  // Sample schedule data
  const schedule = [
    {
      day: "Monday",
      periods: [
        {
          time: "08:00 - 09:30",
          class: "Algebra II",
          grade: "11th",
          room: "Room 101",
        },
        {
          time: "09:45 - 11:15",
          class: "Advanced Calculus",
          grade: "12th",
          room: "Room 103",
        },
        {
          time: "11:30 - 13:00",
          class: "Free Period",
          grade: "",
          room: "Staff Room",
        },
        {
          time: "13:30 - 15:00",
          class: "Statistics",
          grade: "12th",
          room: "Room 105",
        },
      ],
    },
    {
      day: "Tuesday",
      periods: [
        {
          time: "08:00 - 09:30",
          class: "Department Meeting",
          grade: "",
          room: "Conference Room",
        },
        {
          time: "09:45 - 11:15",
          class: "Algebra II",
          grade: "11th",
          room: "Room 101",
        },
        {
          time: "11:30 - 13:00",
          class: "Free Period",
          grade: "",
          room: "Staff Room",
        },
        {
          time: "13:30 - 15:00",
          class: "Office Hours",
          grade: "",
          room: "Room 105",
        },
      ],
    },
    {
      day: "Wednesday",
      periods: [
        {
          time: "08:00 - 09:30",
          class: "Advanced Calculus",
          grade: "12th",
          room: "Room 103",
        },
        {
          time: "09:45 - 11:15",
          class: "Statistics",
          grade: "12th",
          room: "Room 105",
        },
        {
          time: "11:30 - 13:00",
          class: "Free Period",
          grade: "",
          room: "Staff Room",
        },
        {
          time: "13:30 - 15:00",
          class: "Algebra II",
          grade: "11th",
          room: "Room 101",
        },
      ],
    },
    {
      day: "Thursday",
      periods: [
        {
          time: "08:00 - 09:30",
          class: "Statistics",
          grade: "12th",
          room: "Room 105",
        },
        {
          time: "09:45 - 11:15",
          class: "Advanced Calculus",
          grade: "12th",
          room: "Room 103",
        },
        {
          time: "11:30 - 13:00",
          class: "Free Period",
          grade: "",
          room: "Staff Room",
        },
        {
          time: "13:30 - 15:00",
          class: "Professional Development",
          grade: "",
          room: "Library",
        },
      ],
    },
    {
      day: "Friday",
      periods: [
        {
          time: "08:00 - 09:30",
          class: "Algebra II",
          grade: "11th",
          room: "Room 101",
        },
        {
          time: "09:45 - 11:15",
          class: "Advanced Calculus",
          grade: "12th",
          room: "Room 103",
        },
        {
          time: "11:30 - 13:00",
          class: "Free Period",
          grade: "",
          room: "Staff Room",
        },
        {
          time: "13:30 - 15:00",
          class: "Statistics",
          grade: "12th",
          room: "Room 105",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/admin/teachers/${params.id}/profile`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {teacher.name}'s Schedule
            </h1>
            <p className="text-muted-foreground">
              {teacher.department} Department
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Academic Calendar
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select defaultValue="current">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Term</SelectItem>
            <SelectItem value="fall2024">Fall 2024</SelectItem>
            <SelectItem value="spring2025">Spring 2025</SelectItem>
            <SelectItem value="summer2025">Summer 2025</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="weekly">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly View</SelectItem>
            <SelectItem value="daily">Daily View</SelectItem>
            <SelectItem value="monthly">Monthly View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Current academic term schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {schedule.map((day) => (
              <Card key={day.day} className="overflow-hidden">
                <CardHeader className="bg-muted p-3">
                  <CardTitle className="text-center text-lg">
                    {day.day}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col divide-y">
                    {day.periods.map((period, index) => (
                      <div
                        key={index}
                        className={`p-3 ${
                          period.class.includes("Free Period") ||
                          period.class.includes("Office Hours") ||
                          period.class.includes("Meeting") ||
                          period.class.includes("Development")
                            ? "bg-muted/50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {period.time}
                        </div>
                        <div className="mt-1 font-medium">{period.class}</div>
                        {period.grade && (
                          <div className="text-xs text-muted-foreground">
                            Grade: {period.grade}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {period.room}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Summary</CardTitle>
          <CardDescription>
            Overview of teaching hours and assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium">Teaching Hours</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">15 hrs/week</p>
              <p className="text-xs text-muted-foreground">
                3 subjects, 5 classes
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium">Free Periods</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">5 hrs/week</p>
              <p className="text-xs text-muted-foreground">1 hour daily</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium">Other Duties</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">5 hrs/week</p>
              <p className="text-xs text-muted-foreground">
                Meetings, office hours, etc.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium">Total Hours</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">25 hrs/week</p>
              <p className="text-xs text-muted-foreground">
                Standard full-time load
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
