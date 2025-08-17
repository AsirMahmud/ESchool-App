"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Edit,
  FileText,
  Filter,
  GraduationCap,
  Grid,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Moon,
  Plus,
  Repeat,
  Settings,
  Share,
  Sun,
  Trash,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Menu icon component
const MenuIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

// Sidebar items
const sidebarItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/teacher/dashboard",
  },
  {
    title: "Classes",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/teacher/classes",
  },
  {
    title: "Students",
    icon: <Users className="h-5 w-5" />,
    href: "/teacher/students",
  },
  {
    title: "Attendees",
    icon: <Check className="h-5 w-5" />,
    href: "/teacher/attendees",
  },
  {
    title: "Grades",
    icon: <FileText className="h-5 w-5" />,
    href: "/teacher/grades",
  },
  {
    title: "Schedule",
    icon: <CalendarIcon className="h-5 w-5" />,
    href: "/teacher/schedule",
  },
  {
    title: "Resources",
    icon: <Grid className="h-5 w-5" />,
    href: "/teacher/resources",
  },
  {
    title: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/teacher/messages",
  },
  {
    title: "Profile",
    icon: <User className="h-5 w-5" />,
    href: "/teacher/profile",
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/teacher/settings",
  },
];

// Sample schedule data
const generateScheduleData = () => {
  const classTypes = [
    { name: "Physics 101", color: "bg-blue-100 text-blue-800 border-blue-300" },
    {
      name: "Physics 102",
      color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    },
    {
      name: "Chemistry 101",
      color: "bg-purple-100 text-purple-800 border-purple-300",
    },
    {
      name: "Biology 101",
      color: "bg-green-100 text-green-800 border-green-300",
    },
    {
      name: "Office Hours",
      color: "bg-amber-100 text-amber-800 border-amber-300",
    },
    {
      name: "Department Meeting",
      color: "bg-red-100 text-red-800 border-red-300",
    },
    { name: "Lab Session", color: "bg-teal-100 text-teal-800 border-teal-300" },
    {
      name: "Faculty Meeting",
      color: "bg-pink-100 text-pink-800 border-pink-300",
    },
  ];

  const rooms = ["SCI-4", "SCI-2", "LAB-1", "CONF-1", "OFF-2"];

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Get the date for the most recent Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

  const scheduleItems = [];

  // Generate schedule items for each day of the week
  weekdays.forEach((day, dayIndex) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + dayIndex);

    // Generate 2-4 classes per day
    const numClasses = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < numClasses; i++) {
      const startHour = 8 + Math.floor(Math.random() * 8); // 8 AM to 3 PM
      const duration = Math.floor(Math.random() * 2) + 1; // 1 or 2 hours

      const classType =
        classTypes[Math.floor(Math.random() * classTypes.length)];
      const room = rooms[Math.floor(Math.random() * rooms.length)];

      const startTime = new Date(date);
      startTime.setHours(startHour, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + duration, 0, 0, 0);

      scheduleItems.push({
        id: `schedule-${dayIndex}-${i}`,
        title: classType.name,
        date: new Date(date),
        startTime,
        endTime,
        location: room,
        description: `Regular ${classType.name} session`,
        colorClass: classType.color,
        isRecurring: Math.random() > 0.7, // 30% chance of being recurring
        attendees: Math.floor(Math.random() * 15) + 15, // 15-30 attendees
        notes: "",
      });
    }
  });

  return scheduleItems;
};

const scheduleItems = generateScheduleData();

// Generate upcoming events for the next 2 weeks
const generateUpcomingEvents = () => {
  const events = [
    { title: "Midterm Exam", type: "Exam", date: "Mar 28, 2025" },
    {
      title: "Parent-Teacher Conference",
      type: "Meeting",
      date: "Apr 2, 2025",
    },
    { title: "Science Fair", type: "Event", date: "Apr 15, 2025" },
    {
      title: "Department Budget Meeting",
      type: "Meeting",
      date: "Mar 31, 2025",
    },
    {
      title: "Professional Development Day",
      type: "Training",
      date: "Apr 5, 2025",
    },
    { title: "Lab Equipment Training", type: "Training", date: "Apr 8, 2025" },
    {
      title: "End of Quarter Grading Deadline",
      type: "Deadline",
      date: "Apr 10, 2025",
    },
  ];

  return events;
};

const upcomingEvents = generateUpcomingEvents();

// Time slots for day view
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 8; // Start at 8 AM
  return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
});

export default function TeacherSchedulePage() {
  const [theme, setTheme] = useState("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "agenda">(
    "week"
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Format date as "Monday, March 25, 2025"
  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format date as "Mar 25"
  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Get the week dates for the week view
  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();

    // Adjust to get Monday as the first day
    startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));

    // Get dates for Monday through Friday
    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const weekDates = getWeekDates();

  // Navigate to previous/next day, week, or month
  const navigatePrevious = () => {
    const newDate = new Date(selectedDate);

    if (viewMode === "day") {
      newDate.setDate(selectedDate.getDate() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(selectedDate.getDate() - 7);
    } else if (viewMode === "month") {
      newDate.setMonth(selectedDate.getMonth() - 1);
    }

    setSelectedDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(selectedDate);

    if (viewMode === "day") {
      newDate.setDate(selectedDate.getDate() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(selectedDate.getDate() + 7);
    } else if (viewMode === "month") {
      newDate.setMonth(selectedDate.getMonth() + 1);
    }

    setSelectedDate(newDate);
  };

  const navigateToday = () => {
    setSelectedDate(new Date());
  };

  // Filter events for the selected date (day view)
  const getDayEvents = (date: Date) => {
    return scheduleItems.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Filter events for the selected week (week view)
  const getWeekEvents = () => {
    const weekStart = weekDates[0];
    const weekEnd = weekDates[4];

    return scheduleItems.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= weekStart && itemDate <= weekEnd;
    });
  };

  // Get events for a specific day in the week view
  const getDayEventsInWeek = (date: Date) => {
    return scheduleItems.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Format time as "9:00 AM"
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate event position and height for week view
  const getEventStyle = (event) => {
    const startHour =
      event.startTime.getHours() + event.startTime.getMinutes() / 60;
    const endHour = event.endTime.getHours() + event.endTime.getMinutes() / 60;

    // Start at 8 AM (0 position)
    const top = (startHour - 8) * 60; // 60px per hour
    const height = (endHour - startHour) * 60;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  // Get the month name and year for the month view
  const getMonthName = () => {
    return selectedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Generate days for the month view
  const getMonthDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // Adjust for Monday as the first day of the week
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const daysInMonth = lastDay.getDate();

    // Array to hold all days to display
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        date,
        isCurrentMonth: true,
        isToday: isToday(date),
        events: getDayEvents(date),
      });
    }

    return days;
  };

  const monthDays = getMonthDays();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pr-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 border-b p-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Brightwood Academy</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-auto py-2">
                <div className="flex flex-col gap-1 px-2">
                  {sidebarItems.map((item) => (
                    <Button
                      key={item.title}
                      variant={
                        item.title === "Schedule" ? "secondary" : "ghost"
                      }
                      className="justify-start gap-2"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary hidden md:block" />
          <span className="text-xl font-bold hidden md:block">
            Brightwood Academy
          </span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Teacher"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">John Smith</div>
                  <div className="text-xs text-muted-foreground">
                    Science Teacher
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
          <nav className="flex-1 overflow-auto py-4">
            <div className="flex flex-col gap-1 px-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.title === "Schedule" ? "secondary" : "ghost"}
                  className="justify-start gap-2"
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
                <p className="text-muted-foreground">
                  Manage your teaching schedule and events
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Dialog
                  open={isNewEventDialogOpen}
                  onOpenChange={setIsNewEventDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                      <DialogDescription>
                        Create a new event or class in your schedule
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="event-title"
                          placeholder="e.g. Physics 101"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-type" className="text-right">
                          Type
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="class">Class</SelectItem>
                            <SelectItem value="lab">Lab Session</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="office">Office Hours</SelectItem>
                            <SelectItem value="exam">Exam</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-date" className="text-right">
                          Date
                        </Label>
                        <div className="col-span-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate
                                  ? formatFullDate(selectedDate)
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) =>
                                  date && setSelectedDate(date)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Time</Label>
                        <div className="col-span-3 flex gap-2">
                          <Select defaultValue="9">
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Start" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 8).map(
                                (hour) => (
                                  <SelectItem
                                    key={hour}
                                    value={hour.toString()}
                                  >
                                    {hour > 12 ? hour - 12 : hour}:00{" "}
                                    {hour >= 12 ? "PM" : "AM"}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <span className="flex items-center">to</span>
                          <Select defaultValue="10">
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="End" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 9).map(
                                (hour) => (
                                  <SelectItem
                                    key={hour}
                                    value={hour.toString()}
                                  >
                                    {hour > 12 ? hour - 12 : hour}:00{" "}
                                    {hour >= 12 ? "PM" : "AM"}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-location" className="text-right">
                          Location
                        </Label>
                        <Input
                          id="event-location"
                          placeholder="e.g. Room SCI-4"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="event-description"
                          className="text-right"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="event-description"
                          placeholder="Add details about this event"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right">
                          <Label
                            htmlFor="event-recurring"
                            className="text-right"
                          >
                            Recurring
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 col-span-3">
                          <Checkbox id="event-recurring" />
                          <label
                            htmlFor="event-recurring"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Repeat weekly
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-color" className="text-right">
                          Color
                        </Label>
                        <div className="flex gap-2 col-span-3">
                          {[
                            "bg-blue-100",
                            "bg-indigo-100",
                            "bg-purple-100",
                            "bg-green-100",
                            "bg-amber-100",
                            "bg-red-100",
                            "bg-teal-100",
                            "bg-pink-100",
                          ].map((color, i) => (
                            <div
                              key={i}
                              className={`w-6 h-6 rounded-full cursor-pointer ${color} border`}
                              onClick={() => {}}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsNewEventDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setIsNewEventDialogOpen(false)}>
                        Create Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Calendar Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={navigatePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Popover
                  open={isDatePickerOpen}
                  onOpenChange={setIsDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="min-w-[200px]">
                      {viewMode === "day"
                        ? formatFullDate(selectedDate)
                        : viewMode === "week"
                        ? `Week of ${formatShortDate(weekDates[0])}`
                        : getMonthName()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          setSelectedDate(date);
                          setIsDatePickerOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm" onClick={navigateNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={navigateToday}>
                  Today
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="border rounded-md p-1 flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={viewMode === "day" ? "secondary" : "ghost"}
                          size="sm"
                          className="px-3"
                          onClick={() => setViewMode("day")}
                        >
                          Day
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Day view</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={viewMode === "week" ? "secondary" : "ghost"}
                          size="sm"
                          className="px-3"
                          onClick={() => setViewMode("week")}
                        >
                          Week
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Week view</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={viewMode === "month" ? "secondary" : "ghost"}
                          size="sm"
                          className="px-3"
                          onClick={() => setViewMode("month")}
                        >
                          Month
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Month view</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={
                            viewMode === "agenda" ? "secondary" : "ghost"
                          }
                          size="sm"
                          className="px-3"
                          onClick={() => setViewMode("agenda")}
                        >
                          Agenda
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Agenda view</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Views */}
            <div className="space-y-4">
              {/* Day View */}
              {viewMode === "day" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{formatFullDate(selectedDate)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative min-h-[600px] border rounded-md">
                      {/* Time slots */}
                      <div className="absolute top-0 left-0 w-full h-full">
                        {timeSlots.map((time, i) => (
                          <div
                            key={i}
                            className="absolute w-full border-t border-dashed border-muted-foreground/20 flex"
                            style={{ top: `${i * 60}px` }}
                          >
                            <div className="w-16 pr-2 text-xs text-muted-foreground text-right -mt-2.5">
                              {time}
                            </div>
                            <div className="flex-1"></div>
                          </div>
                        ))}
                      </div>

                      {/* Events */}
                      <div className="absolute top-0 left-16 right-0 h-full pt-1 px-1">
                        {getDayEvents(selectedDate).map((event) => (
                          <div
                            key={event.id}
                            className={`absolute left-0 right-0 mx-2 p-2 rounded-md border ${event.colorClass} cursor-pointer`}
                            style={getEventStyle(event)}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="font-medium truncate">
                              {event.title}
                            </div>
                            <div className="text-xs flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(event.startTime)} -{" "}
                              {formatTime(event.endTime)}
                            </div>
                            <div className="text-xs flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Week View */}
              {viewMode === "week" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>
                      Week of {formatShortDate(weekDates[0])}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative min-h-[600px] border rounded-md">
                      {/* Day headers */}
                      <div className="grid grid-cols-5 border-b">
                        {weekDates.map((date, i) => (
                          <div
                            key={i}
                            className={`p-2 text-center ${
                              isToday(date) ? "bg-primary/10 font-bold" : ""
                            }`}
                          >
                            <div>
                              {date.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                            <div className="text-sm">
                              {formatShortDate(date)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Time slots */}
                      <div className="absolute top-[57px] left-0 w-full h-[calc(100%-57px)]">
                        {timeSlots.map((time, i) => (
                          <div
                            key={i}
                            className="absolute w-full border-t border-dashed border-muted-foreground/20 flex"
                            style={{ top: `${i * 60}px` }}
                          >
                            <div className="w-16 pr-2 text-xs text-muted-foreground text-right -mt-2.5">
                              {time}
                            </div>
                            <div className="flex-1 grid grid-cols-5">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <div
                                  key={j}
                                  className="h-full border-l first:border-l-0"
                                ></div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Events */}
                      <div className="absolute top-[57px] left-16 right-0 h-[calc(100%-57px)]">
                        {weekDates.map((date, dayIndex) => (
                          <div
                            key={dayIndex}
                            className="absolute h-full"
                            style={{
                              left: `${(dayIndex / 5) * 100}%`,
                              width: `${100 / 5}%`,
                            }}
                          >
                            {getDayEventsInWeek(date).map((event) => (
                              <div
                                key={event.id}
                                className={`absolute mx-1 p-2 rounded-md border ${event.colorClass} cursor-pointer`}
                                style={{
                                  ...getEventStyle(event),
                                  left: "4px",
                                  right: "4px",
                                }}
                                onClick={() => setSelectedEvent(event)}
                              >
                                <div className="font-medium truncate">
                                  {event.title}
                                </div>
                                <div className="text-xs truncate">
                                  {formatTime(event.startTime)} -{" "}
                                  {formatTime(event.endTime)}
                                </div>
                                <div className="text-xs truncate">
                                  {event.location}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Month View */}
              {viewMode === "month" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{getMonthName()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md">
                      {/* Day headers */}
                      <div className="grid grid-cols-7 border-b">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <div
                              key={day}
                              className="p-2 text-center font-medium"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      {/* Calendar grid */}
                      <div className="grid grid-cols-7">
                        {monthDays.map((day, i) => (
                          <div
                            key={i}
                            className={`min-h-[100px] p-1 border ${
                              !day.isCurrentMonth
                                ? "bg-muted/20"
                                : day.isToday
                                ? "bg-primary/10"
                                : ""
                            } ${i % 7 < 5 ? "" : "bg-muted/10"}`}
                          >
                            {day.day && (
                              <>
                                <div className="text-right p-1">
                                  <span
                                    className={`text-sm ${
                                      day.isToday ? "font-bold" : ""
                                    }`}
                                  >
                                    {day.day}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {day.events &&
                                    day.events.slice(0, 3).map((event) => (
                                      <div
                                        key={event.id}
                                        className={`text-xs p-1 rounded truncate ${event.colorClass} cursor-pointer`}
                                        onClick={() => setSelectedEvent(event)}
                                      >
                                        {formatTime(event.startTime)}{" "}
                                        {event.title}
                                      </div>
                                    ))}
                                  {day.events && day.events.length > 3 && (
                                    <div className="text-xs text-center text-muted-foreground">
                                      +{day.events.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Agenda View */}
              {viewMode === "agenda" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weekDates.map((date, i) => {
                        const events = getDayEventsInWeek(date);
                        if (events.length === 0) return null;

                        return (
                          <div key={i} className="space-y-2">
                            <h3
                              className={`text-lg font-medium ${
                                isToday(date) ? "text-primary" : ""
                              }`}
                            >
                              {formatFullDate(date)}
                              {isToday(date) && (
                                <span className="ml-2 text-sm bg-primary/20 px-2 py-0.5 rounded">
                                  Today
                                </span>
                              )}
                            </h3>
                            <div className="space-y-2">
                              {events
                                .sort(
                                  (a, b) =>
                                    a.startTime.getTime() -
                                    b.startTime.getTime()
                                )
                                .map((event) => (
                                  <div
                                    key={event.id}
                                    className={`p-3 rounded-md border ${event.colorClass} cursor-pointer`}
                                    onClick={() => setSelectedEvent(event)}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="font-medium">
                                        {event.title}
                                      </div>
                                      <Badge variant="outline" className="ml-2">
                                        {event.isRecurring
                                          ? "Recurring"
                                          : "One-time"}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 text-sm">
                                      <Clock className="h-4 w-4" />
                                      {formatTime(event.startTime)} -{" "}
                                      {formatTime(event.endTime)}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 text-sm">
                                      <MapPin className="h-4 w-4" />
                                      {event.location}
                                    </div>
                                    {event.description && (
                                      <div className="mt-2 text-sm text-muted-foreground">
                                        {event.description}
                                      </div>
                                    )}
                                    <div className="mt-2 text-sm">
                                      <span className="text-muted-foreground">
                                        Attendees:
                                      </span>{" "}
                                      {event.attendees}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Event Details Dialog */}
            <Dialog
              open={!!selectedEvent}
              onOpenChange={(open) => !open && setSelectedEvent(null)}
            >
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <DialogTitle>{selectedEvent?.title}</DialogTitle>
                    <Badge variant="outline" className="ml-2">
                      {selectedEvent?.isRecurring ? "Recurring" : "One-time"}
                    </Badge>
                  </div>
                  <DialogDescription>
                    {formatFullDate(selectedEvent?.date)}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      {selectedEvent && formatTime(selectedEvent.startTime)} -{" "}
                      {selectedEvent && formatTime(selectedEvent.endTime)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>{selectedEvent?.location}</div>
                  </div>
                  {selectedEvent?.description && (
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.description}
                      </p>
                    </div>
                  )}
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-1">Attendees</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent?.attendees} students
                    </p>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-1">Notes</h4>
                    <Textarea
                      placeholder="Add notes about this event..."
                      value={selectedEvent?.notes || ""}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Event
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Sidebar Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                      >
                        <CalendarIcon className="h-6 w-6" />
                        <span>View Full Calendar</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                      >
                        <Plus className="h-6 w-6" />
                        <span>Add Class</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                      >
                        <Share className="h-6 w-6" />
                        <span>Share Schedule</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                      >
                        <Repeat className="h-6 w-6" />
                        <span>Recurring Events</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CalendarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {event.type}
                              </Badge>
                              <span>{event.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Events
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
