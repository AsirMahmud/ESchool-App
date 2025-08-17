"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Grid,
  Key,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  Palette,
  Save,
  SettingsIcon,
  Shield,
  Sun,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    icon: <Calendar className="h-5 w-5" />,
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
    icon: <SettingsIcon className="h-5 w-5" />,
    href: "/teacher/settings",
  },
];

export default function TeacherSettingsPage() {
  const [theme, setTheme] = useState("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

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
                        item.title === "Settings" ? "secondary" : "ghost"
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
              <DropdownMenuItem asChild>
                <Link href="/teacher/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/teacher/settings">Settings</Link>
              </DropdownMenuItem>
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
                  variant={item.title === "Settings" ? "secondary" : "ghost"}
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
          <div className="mx-auto max-w-5xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="account">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
              </div>

              {/* Account Settings */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.smith@brightwood.edu"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" defaultValue="Science Teacher" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select defaultValue="science">
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science">
                            Science Department
                          </SelectItem>
                          <SelectItem value="math">
                            Mathematics Department
                          </SelectItem>
                          <SelectItem value="english">
                            English Department
                          </SelectItem>
                          <SelectItem value="history">
                            History Department
                          </SelectItem>
                          <SelectItem value="arts">Arts Department</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="america_los_angeles">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_los_angeles">
                            Pacific Time (US & Canada)
                          </SelectItem>
                          <SelectItem value="america_denver">
                            Mountain Time (US & Canada)
                          </SelectItem>
                          <SelectItem value="america_chicago">
                            Central Time (US & Canada)
                          </SelectItem>
                          <SelectItem value="america_new_york">
                            Eastern Time (US & Canada)
                          </SelectItem>
                          <SelectItem value="europe_london">London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Language & Regional Settings</CardTitle>
                    <CardDescription>
                      Customize your language and regional preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="mm_dd_yyyy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm_dd_yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dd_mm_yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="yyyy_mm_dd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <Select defaultValue="12h">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                    <CardDescription>
                      Manage your connected accounts and services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Google</h4>
                          <p className="text-sm text-muted-foreground">
                            Connected to john.smith@gmail.com
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Microsoft</h4>
                          <p className="text-sm text-muted-foreground">
                            Not connected
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how and when you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Email Notifications
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="email-student-submissions"
                              defaultChecked
                            />
                            <Label htmlFor="email-student-submissions">
                              Student submissions
                            </Label>
                          </div>
                          <Select defaultValue="immediate">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Immediately
                              </SelectItem>
                              <SelectItem value="daily">
                                Daily digest
                              </SelectItem>
                              <SelectItem value="weekly">
                                Weekly digest
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="email-messages" defaultChecked />
                            <Label htmlFor="email-messages">New messages</Label>
                          </div>
                          <Select defaultValue="immediate">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Immediately
                              </SelectItem>
                              <SelectItem value="daily">
                                Daily digest
                              </SelectItem>
                              <SelectItem value="weekly">
                                Weekly digest
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="email-announcements" defaultChecked />
                            <Label htmlFor="email-announcements">
                              School announcements
                            </Label>
                          </div>
                          <Select defaultValue="immediate">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Immediately
                              </SelectItem>
                              <SelectItem value="daily">
                                Daily digest
                              </SelectItem>
                              <SelectItem value="weekly">
                                Weekly digest
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="email-reminders" defaultChecked />
                            <Label htmlFor="email-reminders">
                              Calendar reminders
                            </Label>
                          </div>
                          <Select defaultValue="daily">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Immediately
                              </SelectItem>
                              <SelectItem value="daily">
                                Daily digest
                              </SelectItem>
                              <SelectItem value="weekly">
                                Weekly digest
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Push Notifications
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="push-student-submissions"
                              defaultChecked
                            />
                            <Label htmlFor="push-student-submissions">
                              Student submissions
                            </Label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="push-messages" defaultChecked />
                            <Label htmlFor="push-messages">New messages</Label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="push-announcements" />
                            <Label htmlFor="push-announcements">
                              School announcements
                            </Label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="push-reminders" defaultChecked />
                            <Label htmlFor="push-reminders">
                              Calendar reminders
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Notification Schedule
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="quiet-hours">Quiet Hours</Label>
                          <div className="flex items-center gap-2">
                            <Select defaultValue="22">
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="From" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i === 0
                                      ? "12 AM"
                                      : i < 12
                                      ? `${i} AM`
                                      : i === 12
                                      ? "12 PM"
                                      : `${i - 12} PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select defaultValue="7">
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="To" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i === 0
                                      ? "12 AM"
                                      : i < 12
                                      ? `${i} AM`
                                      : i === 12
                                      ? "12 PM"
                                      : `${i - 12} PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <RadioGroup
                        defaultValue="light"
                        className="grid grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="light"
                            id="theme-light"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <Sun className="mb-3 h-6 w-6" />
                            Light
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="dark"
                            id="theme-dark"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <Moon className="mb-3 h-6 w-6" />
                            Dark
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="system"
                            id="theme-system"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <Palette className="mb-3 h-6 w-6" />
                            System
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Color Scheme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-blue-600" />
                          <Label>Blue</Label>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-green-600" />
                          <Label>Green</Label>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-purple-600" />
                          <Label>Purple</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Font Size</h3>
                      <RadioGroup
                        defaultValue="medium"
                        className="grid grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="small"
                            id="font-small"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="font-small"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-sm">Aa</span>
                            Small
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="medium"
                            id="font-medium"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="font-medium"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-base">Aa</span>
                            Medium
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="large"
                            id="font-large"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="font-large"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-lg">Aa</span>
                            Large
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="animations">Animations</Label>
                        <Switch id="animations" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Authentication</CardTitle>
                    <CardDescription>
                      Manage your password and authentication settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="pt-2">
                      <Button>Update Password</Button>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            Two-factor authentication is currently disabled
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account by
                            enabling two-factor authentication
                          </p>
                        </div>
                        <Button>Enable</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control your privacy and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="profile-visibility"
                            className="font-medium"
                          >
                            Profile Visibility
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Control who can see your profile information
                          </p>
                        </div>
                        <Select defaultValue="school">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="school">School Only</SelectItem>
                            <SelectItem value="colleagues">
                              Colleagues Only
                            </SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="online-status"
                            className="font-medium"
                          >
                            Online Status
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Show when you're active on the platform
                          </p>
                        </div>
                        <Switch id="online-status" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="data-collection"
                            className="font-medium"
                          >
                            Data Collection
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Allow anonymous usage data collection to improve the
                            platform
                          </p>
                        </div>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Log</CardTitle>
                    <CardDescription>
                      Review recent account activity and security events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          event: "Password changed",
                          date: "Mar 25, 2025",
                          time: "10:42 AM",
                          ip: "192.168.1.1",
                          location: "San Francisco, CA",
                        },
                        {
                          event: "Login successful",
                          date: "Mar 24, 2025",
                          time: "8:15 AM",
                          ip: "192.168.1.1",
                          location: "San Francisco, CA",
                        },
                        {
                          event: "Login successful",
                          date: "Mar 23, 2025",
                          time: "9:30 AM",
                          ip: "192.168.1.1",
                          location: "San Francisco, CA",
                        },
                      ].map((log, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Shield className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">{log.event}</p>
                              <p className="text-sm text-muted-foreground">
                                {log.date}, {log.time}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              IP: {log.ip} • Location: {log.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Full Security Log
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>
                      Manage your account status and data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h4 className="font-medium">Export Your Data</h4>
                        <p className="text-sm text-muted-foreground">
                          Download a copy of your data, including profile
                          information and activity
                        </p>
                      </div>
                      <Button variant="outline">Export Data</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md border-destructive/50 bg-destructive/5">
                      <div>
                        <h4 className="font-medium text-destructive">
                          Deactivate Account
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Temporarily disable your account and hide your profile
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-destructive text-destructive"
                      >
                        Deactivate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
