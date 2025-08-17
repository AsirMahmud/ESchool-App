"use client";

import { useState } from "react";
import Link from "next/link";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Clock,
  Download,
  Edit,
  Plus,
  Printer,
} from "lucide-react";

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("grade-6a");
  const [selectedDay, setSelectedDay] = useState("all");
  const [viewMode, setViewMode] = useState("weekly");

  // Sample timetable data  = useState("all")
  const [viewMode, setViewMode] = useState("weekly");

  // Sample timetable data
  const timetableData = {
    "grade-6a": {
      className: "Grade 6-A",
      periods: [
        { id: 1, startTime: "08:00", endTime: "08:45" },
        { id: 2, startTime: "08:50", endTime: "09:35" },
        { id: 3, startTime: "09:40", endTime: "10:25" },
        { id: 4, startTime: "10:40", endTime: "11:25" },
        { id: 5, startTime: "11:30", endTime: "12:15" },
        { id: 6, startTime: "13:00", endTime: "13:45" },
        { id: 7, startTime: "13:50", endTime: "14:35" },
        { id: 8, startTime: "14:40", endTime: "15:25" },
      ],
      schedule: {
        Monday: [
          {
            period: 1,
            subject: "Mathematics",
            teacher: "Ms. Johnson",
            room: "101",
          },
          { period: 2, subject: "English", teacher: "Mr. Smith", room: "101" },
          {
            period: 3,
            subject: "Science",
            teacher: "Dr. Brown",
            room: "Lab 1",
          },
          { period: 4, subject: "History", teacher: "Ms. Davis", room: "101" },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Art",
            teacher: "Ms. Wilson",
            room: "Art Studio",
          },
          {
            period: 7,
            subject: "Physical Education",
            teacher: "Mr. Thompson",
            room: "Gym",
          },
          {
            period: 8,
            subject: "Computer Science",
            teacher: "Mr. Lee",
            room: "Computer Lab",
          },
        ],
        Tuesday: [
          {
            period: 1,
            subject: "Science",
            teacher: "Dr. Brown",
            room: "Lab 1",
          },
          {
            period: 2,
            subject: "Mathematics",
            teacher: "Ms. Johnson",
            room: "101",
          },
          { period: 3, subject: "English", teacher: "Mr. Smith", room: "101" },
          {
            period: 4,
            subject: "Geography",
            teacher: "Mr. Wilson",
            room: "101",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Music",
            teacher: "Ms. Garcia",
            room: "Music Room",
          },
          {
            period: 7,
            subject: "Science",
            teacher: "Dr. Brown",
            room: "Lab 1",
          },
          {
            period: 8,
            subject: "Library",
            teacher: "Ms. Adams",
            room: "Library",
          },
        ],
        Wednesday: [
          { period: 1, subject: "English", teacher: "Mr. Smith", room: "101" },
          { period: 2, subject: "History", teacher: "Ms. Davis", room: "101" },
          {
            period: 3,
            subject: "Mathematics",
            teacher: "Ms. Johnson",
            room: "101",
          },
          {
            period: 4,
            subject: "Computer Science",
            teacher: "Mr. Lee",
            room: "Computer Lab",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Science",
            teacher: "Dr. Brown",
            room: "Lab 1",
          },
          {
            period: 7,
            subject: "Art",
            teacher: "Ms. Wilson",
            room: "Art Studio",
          },
          {
            period: 8,
            subject: "Physical Education",
            teacher: "Mr. Thompson",
            room: "Gym",
          },
        ],
        Thursday: [
          {
            period: 1,
            subject: "Mathematics",
            teacher: "Ms. Johnson",
            room: "101",
          },
          {
            period: 2,
            subject: "Science",
            teacher: "Dr. Brown",
            room: "Lab 1",
          },
          { period: 3, subject: "English", teacher: "Mr. Smith", room: "101" },
          {
            period: 4,
            subject: "Music",
            teacher: "Ms. Garcia",
            room: "Music Room",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          { period: 6, subject: "History", teacher: "Ms. Davis", room: "101" },
          {
            period: 7,
            subject: "Geography",
            teacher: "Mr. Wilson",
            room: "101",
          },
          {
            period: 8,
            subject: "Computer Science",
            teacher: "Mr. Lee",
            room: "Computer Lab",
          },
        ],
        Friday: [
          { period: 1, subject: "English", teacher: "Mr. Smith", room: "101" },
          {
            period: 2,
            subject: "Mathematics",
            teacher: "Ms. Johnson",
            room: "101",
          },
          {
            period: 3,
            subject: "Physical Education",
            teacher: "Mr. Thompson",
            room: "Gym",
          },
          {
            period: 4,
            subject: "Science",
            teacher: "Dr. Brown",
            room: "Lab 1",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Art",
            teacher: "Ms. Wilson",
            room: "Art Studio",
          },
          {
            period: 7,
            subject: "Library",
            teacher: "Ms. Adams",
            room: "Library",
          },
          {
            period: 8,
            subject: "Class Meeting",
            teacher: "Ms. Johnson",
            room: "101",
          },
        ],
      },
    },
    "grade-7b": {
      className: "Grade 7-B",
      periods: [
        { id: 1, startTime: "08:00", endTime: "08:45" },
        { id: 2, startTime: "08:50", endTime: "09:35" },
        { id: 3, startTime: "09:40", endTime: "10:25" },
        { id: 4, startTime: "10:40", endTime: "11:25" },
        { id: 5, startTime: "11:30", endTime: "12:15" },
        { id: 6, startTime: "13:00", endTime: "13:45" },
        { id: 7, startTime: "13:50", endTime: "14:35" },
        { id: 8, startTime: "14:40", endTime: "15:25" },
      ],
      schedule: {
        Monday: [
          { period: 1, subject: "English", teacher: "Ms. Parker", room: "202" },
          {
            period: 2,
            subject: "Mathematics",
            teacher: "Mr. Rodriguez",
            room: "202",
          },
          { period: 3, subject: "Science", teacher: "Ms. Chen", room: "Lab 2" },
          {
            period: 4,
            subject: "History",
            teacher: "Mr. Johnson",
            room: "202",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Computer Science",
            teacher: "Ms. Taylor",
            room: "Computer Lab",
          },
          {
            period: 7,
            subject: "Art",
            teacher: "Mr. Wilson",
            room: "Art Studio",
          },
          {
            period: 8,
            subject: "Physical Education",
            teacher: "Ms. Thompson",
            room: "Gym",
          },
        ],
        Tuesday: [
          {
            period: 1,
            subject: "Mathematics",
            teacher: "Mr. Rodriguez",
            room: "202",
          },
          { period: 2, subject: "Science", teacher: "Ms. Chen", room: "Lab 2" },
          { period: 3, subject: "English", teacher: "Ms. Parker", room: "202" },
          {
            period: 4,
            subject: "Geography",
            teacher: "Mr. Johnson",
            room: "202",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Physical Education",
            teacher: "Ms. Thompson",
            room: "Gym",
          },
          {
            period: 7,
            subject: "Music",
            teacher: "Mr. Garcia",
            room: "Music Room",
          },
          {
            period: 8,
            subject: "Library",
            teacher: "Ms. Adams",
            room: "Library",
          },
        ],
        Wednesday: [
          { period: 1, subject: "Science", teacher: "Ms. Chen", room: "Lab 2" },
          { period: 2, subject: "English", teacher: "Ms. Parker", room: "202" },
          {
            period: 3,
            subject: "Mathematics",
            teacher: "Mr. Rodriguez",
            room: "202",
          },
          {
            period: 4,
            subject: "Art",
            teacher: "Mr. Wilson",
            room: "Art Studio",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "History",
            teacher: "Mr. Johnson",
            room: "202",
          },
          {
            period: 7,
            subject: "Computer Science",
            teacher: "Ms. Taylor",
            room: "Computer Lab",
          },
          {
            period: 8,
            subject: "Physical Education",
            teacher: "Ms. Thompson",
            room: "Gym",
          },
        ],
        Thursday: [
          { period: 1, subject: "English", teacher: "Ms. Parker", room: "202" },
          {
            period: 2,
            subject: "Mathematics",
            teacher: "Mr. Rodriguez",
            room: "202",
          },
          { period: 3, subject: "Science", teacher: "Ms. Chen", room: "Lab 2" },
          {
            period: 4,
            subject: "Music",
            teacher: "Mr. Garcia",
            room: "Music Room",
          },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Geography",
            teacher: "Mr. Johnson",
            room: "202",
          },
          {
            period: 7,
            subject: "History",
            teacher: "Mr. Johnson",
            room: "202",
          },
          {
            period: 8,
            subject: "Library",
            teacher: "Ms. Adams",
            room: "Library",
          },
        ],
        Friday: [
          {
            period: 1,
            subject: "Mathematics",
            teacher: "Mr. Rodriguez",
            room: "202",
          },
          { period: 2, subject: "English", teacher: "Ms. Parker", room: "202" },
          {
            period: 3,
            subject: "Computer Science",
            teacher: "Ms. Taylor",
            room: "Computer Lab",
          },
          { period: 4, subject: "Science", teacher: "Ms. Chen", room: "Lab 2" },
          { period: 5, subject: "Lunch Break", teacher: "", room: "Cafeteria" },
          {
            period: 6,
            subject: "Physical Education",
            teacher: "Ms. Thompson",
            room: "Gym",
          },
          {
            period: 7,
            subject: "Art",
            teacher: "Mr. Wilson",
            room: "Art Studio",
          },
          {
            period: 8,
            subject: "Class Meeting",
            teacher: "Ms. Parker",
            room: "202",
          },
        ],
      },
    },
  };

  const selectedTimetable = timetableData[selectedClass];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const filteredDays = selectedDay === "all" ? days : [selectedDay];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Timetable Management
          </h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/admin/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/admin/academic" className="hover:text-foreground">
              Academic
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Timetable</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Schedule</DialogTitle>
                <DialogDescription>
                  Create a new schedule entry for a class.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-class" className="text-right">
                    Class
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-6a">Grade 6-A</SelectItem>
                      <SelectItem value="grade-7b">Grade 7-B</SelectItem>
                      <SelectItem value="grade-8c">Grade 8-C</SelectItem>
                      <SelectItem value="grade-9a">Grade 9-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-day" className="text-right">
                    Day
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-period" className="text-right">
                    Period
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        Period 1 (08:00 - 08:45)
                      </SelectItem>
                      <SelectItem value="2">
                        Period 2 (08:50 - 09:35)
                      </SelectItem>
                      <SelectItem value="3">
                        Period 3 (09:40 - 10:25)
                      </SelectItem>
                      <SelectItem value="4">
                        Period 4 (10:40 - 11:25)
                      </SelectItem>
                      <SelectItem value="5">
                        Period 5 (11:30 - 12:15)
                      </SelectItem>
                      <SelectItem value="6">
                        Period 6 (13:00 - 13:45)
                      </SelectItem>
                      <SelectItem value="7">
                        Period 7 (13:50 - 14:35)
                      </SelectItem>
                      <SelectItem value="8">
                        Period 8 (14:40 - 15:25)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-subject" className="text-right">
                    Subject
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="physical-education">
                        Physical Education
                      </SelectItem>
                      <SelectItem value="computer-science">
                        Computer Science
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-teacher" className="text-right">
                    Teacher
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="johnson">Ms. Johnson</SelectItem>
                      <SelectItem value="smith">Mr. Smith</SelectItem>
                      <SelectItem value="brown">Dr. Brown</SelectItem>
                      <SelectItem value="davis">Ms. Davis</SelectItem>
                      <SelectItem value="wilson">Ms. Wilson</SelectItem>
                      <SelectItem value="thompson">Mr. Thompson</SelectItem>
                      <SelectItem value="lee">Mr. Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-room" className="text-right">
                    Room
                  </Label>
                  <Input
                    id="schedule-room"
                    placeholder="Enter room"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timetable Settings</CardTitle>
              <CardDescription>Select class and view options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="class-select">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-6a">Grade 6-A</SelectItem>
                    <SelectItem value="grade-7b">Grade 7-B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="day-select">Day</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Days</SelectItem>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="view-mode">View Mode</Label>
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select view mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly View</SelectItem>
                    <SelectItem value="daily">Daily View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Class Name</p>
                <p className="text-lg">{selectedTimetable.className}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Total Periods</p>
                <p className="text-lg">{selectedTimetable.periods.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Schedule</p>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {selectedTimetable.periods[0].startTime} -{" "}
                    {
                      selectedTimetable.periods[
                        selectedTimetable.periods.length - 1
                      ].endTime
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <Tabs defaultValue="timetable" className="w-full">
            <TabsList>
              <TabsTrigger value="timetable">Timetable</TabsTrigger>
              <TabsTrigger value="periods">Periods</TabsTrigger>
            </TabsList>
            <TabsContent value="timetable" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTimetable.className} Timetable</CardTitle>
                  <CardDescription>
                    {selectedDay === "all"
                      ? "Weekly schedule"
                      : `${selectedDay} schedule`}{" "}
                    for {selectedTimetable.className}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2 bg-muted/50 text-left">
                            Period
                          </th>
                          <th className="border px-4 py-2 bg-muted/50 text-left">
                            Time
                          </th>
                          {filteredDays.map((day) => (
                            <th
                              key={day}
                              className="border px-4 py-2 bg-muted/50 text-left"
                            >
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTimetable.periods.map((period) => (
                          <tr key={period.id}>
                            <td className="border px-4 py-2 font-medium">
                              {period.id}
                            </td>
                            <td className="border px-4 py-2 text-sm">
                              {period.startTime} - {period.endTime}
                            </td>
                            {filteredDays.map((day) => {
                              const lesson = selectedTimetable.schedule[
                                day
                              ].find((l) => l.period === period.id);
                              return (
                                <td
                                  key={`${day}-${period.id}`}
                                  className="border px-4 py-2"
                                >
                                  {lesson ? (
                                    <div className="space-y-1">
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                          {lesson.subject}
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                      </div>
                                      {lesson.teacher && (
                                        <div className="text-xs text-muted-foreground">
                                          {lesson.teacher}
                                        </div>
                                      )}
                                      {lesson.room && (
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {lesson.room}
                                        </Badge>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-center text-muted-foreground">
                                      -
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
            <TabsContent value="periods" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Period Configuration</CardTitle>
                  <CardDescription>
                    Configure time slots for each period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2 bg-muted/50 text-left">
                            Period
                          </th>
                          <th className="border px-4 py-2 bg-muted/50 text-left">
                            Start Time
                          </th>
                          <th className="border px-4 py-2 bg-muted/50 text-left">
                            End Time
                          </th>
                          <th className="border px-4 py-2 bg-muted/50 text-left">
                            Duration
                          </th>
                          <th className="border px-4 py-2 bg-muted/50 text-left">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTimetable.periods.map((period) => (
                          <tr key={period.id}>
                            <td className="border px-4 py-2 font-medium">
                              {period.id}
                            </td>
                            <td className="border px-4 py-2">
                              {period.startTime}
                            </td>
                            <td className="border px-4 py-2">
                              {period.endTime}
                            </td>
                            <td className="border px-4 py-2">45 min</td>
                            <td className="border px-4 py-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
