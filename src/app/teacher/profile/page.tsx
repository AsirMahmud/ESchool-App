"use client";

import { useState } from "react";
import {
  Award,
  Bell,
  BookOpen,
  Building,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Clock,
  Edit,
  FileText,
  GraduationCap,
  Grid,
  LayoutDashboard,
  Link2,
  Mail,
  MapPin,
  MessageSquare,
  Moon,
  Phone,
  Plus,
  Save,
  Settings,
  Sun,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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
    icon: <Settings className="h-5 w-5" />,
    href: "/teacher/settings",
  },
];

// Sample teacher data
const teacherData = {
  id: "T10001",
  name: "John Smith",
  avatar: "/placeholder.svg?height=300&width=300",
  title: "Science Teacher",
  department: "Science Department",
  email: "john.smith@brightwood.edu",
  phone: "(555) 123-4567",
  location: "Room SCI-4",
  joinDate: "August 2018",
  bio: "Experienced science educator with a passion for physics and chemistry. I believe in hands-on learning and making science accessible and exciting for all students. My teaching philosophy centers around inquiry-based learning and developing critical thinking skills.",
  education: [
    {
      degree: "Master of Education in Science Education",
      institution: "University of California, Berkeley",
      year: "2016",
    },
    {
      degree: "Bachelor of Science in Physics",
      institution: "Stanford University",
      year: "2014",
    },
  ],
  certifications: [
    {
      name: "Secondary Science Teaching Credential",
      issuer: "California Commission on Teacher Credentialing",
      year: "2016",
      expires: "2026",
    },
    {
      name: "Advanced Placement Physics Certification",
      issuer: "College Board",
      year: "2017",
      expires: "2027",
    },
  ],
  experience: [
    {
      position: "Science Teacher",
      institution: "Brightwood Academy",
      startYear: "2018",
      endYear: "Present",
      description:
        "Teaching Physics and Chemistry to grades 10-12. Department lead for Physics curriculum development.",
    },
    {
      position: "Student Teacher",
      institution: "Oakland High School",
      startYear: "2015",
      endYear: "2016",
      description:
        "Completed teaching practicum for secondary science education.",
    },
  ],
  skills: [
    "Physics",
    "Chemistry",
    "Laboratory Safety",
    "Curriculum Development",
    "Educational Technology",
    "STEM Education",
    "Project-Based Learning",
  ],
  socialLinks: {
    website: "johnsmith-science.edu",
    linkedin: "linkedin.com/in/johnsmith-teacher",
    twitter: "twitter.com/johnsmith_sci",
  },
  classes: [
    { name: "Physics 101", grade: "11", students: 24 },
    { name: "Physics 102", grade: "11", students: 22 },
    { name: "Chemistry 101", grade: "10", students: 26 },
  ],
  achievements: [
    {
      title: "Teacher of the Year",
      year: "2023",
      issuer: "Brightwood Academy",
    },
    {
      title: "STEM Education Grant Recipient",
      year: "2022",
      issuer: "National Science Foundation",
    },
  ],
  profileCompletion: 92,
};

export default function TeacherProfilePage() {
  const [theme, setTheme] = useState("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(teacherData);
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, you would save the profile data to the server here
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
                      variant={item.title === "Profile" ? "secondary" : "ghost"}
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
                  <div className="text-sm font-medium">{profileData.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {profileData.title}
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
                  variant={item.title === "Profile" ? "secondary" : "ghost"}
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  My Profile
                </h1>
                <p className="text-muted-foreground">
                  Manage your personal and professional information
                </p>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Profile Completion */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Profile Completion</CardTitle>
                  <Badge
                    variant={
                      profileData.profileCompletion >= 90
                        ? "default"
                        : "outline"
                    }
                  >
                    {profileData.profileCompletion}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress
                  value={profileData.profileCompletion}
                  className="h-2"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Complete your profile to help students and parents learn more
                  about you.
                </p>
              </CardContent>
            </Card>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Profile Photo & Basic Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage
                          src={profileData.avatar}
                          alt={profileData.name}
                        />
                        <AvatarFallback className="text-2xl">
                          {profileData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Dialog
                        open={isUploadPhotoOpen}
                        onOpenChange={setIsUploadPhotoOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full"
                            disabled={!isEditing}
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Profile Photo</DialogTitle>
                            <DialogDescription>
                              Upload a new profile photo. The recommended size
                              is 300x300 pixels.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm font-medium mb-1">
                                Drag and drop your photo here
                              </p>
                              <p className="text-xs text-muted-foreground mb-4">
                                Supports JPG, PNG, GIF up to 5MB
                              </p>
                              <Button size="sm">Browse Files</Button>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsUploadPhotoOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={() => setIsUploadPhotoOpen(false)}>
                              Upload Photo
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <h2 className="text-xl font-bold">{profileData.name}</h2>
                    <p className="text-muted-foreground">{profileData.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {profileData.department}
                    </p>
                    <div className="w-full mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={profileData.email}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                email: e.target.value,
                              })
                            }
                            className="h-8"
                          />
                        ) : (
                          <span className="text-sm">{profileData.email}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                phone: e.target.value,
                              })
                            }
                            className="h-8"
                          />
                        ) : (
                          <span className="text-sm">{profileData.phone}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={profileData.location}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                location: e.target.value,
                              })
                            }
                            className="h-8"
                          />
                        ) : (
                          <span className="text-sm">
                            {profileData.location}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Joined {profileData.joinDate}
                        </span>
                      </div>
                    </div>
                    <div className="w-full mt-4 pt-4 border-t">
                      <h3 className="text-sm font-medium mb-2">Social Links</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          {isEditing ? (
                            <Input
                              value={profileData.socialLinks.website}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  socialLinks: {
                                    ...profileData.socialLinks,
                                    website: e.target.value,
                                  },
                                })
                              }
                              className="h-8"
                            />
                          ) : (
                            <a
                              href={`https://${profileData.socialLinks.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {profileData.socialLinks.website}
                            </a>
                          )}
                        </div>
                        {Object.entries(profileData.socialLinks).map(
                          ([key, value]) => {
                            if (key === "website") return null;
                            return (
                              <div
                                key={key}
                                className="flex items-center gap-2"
                              >
                                <div className="h-4 w-4 text-muted-foreground flex items-center justify-center">
                                  {key[0].toUpperCase()}
                                </div>
                                {isEditing ? (
                                  <Input
                                    value={value}
                                    onChange={(e) =>
                                      setProfileData({
                                        ...profileData,
                                        socialLinks: {
                                          ...profileData.socialLinks,
                                          [key]: e.target.value,
                                        },
                                      })
                                    }
                                    className="h-8"
                                  />
                                ) : (
                                  <a
                                    href={`https://${value}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                  >
                                    {value}
                                  </a>
                                )}
                              </div>
                            );
                          }
                        )}
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Social Link
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Classes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {profileData.classes.map((cls, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                        >
                          <div>
                            <div className="font-medium">{cls.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Grade {cls.grade}
                            </div>
                          </div>
                          <Badge variant="outline">
                            {cls.students} students
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Classes
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Right Column - Detailed Info */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        className="min-h-[150px]"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.bio}</p>
                    )}
                  </CardContent>
                </Card>

                <Tabs defaultValue="education">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="certifications">
                      Certifications
                    </TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="education" className="space-y-4 pt-4">
                    {profileData.education.map((edu, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{edu.degree}</h3>
                          {isEditing && (
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    )}
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4 pt-4">
                    {profileData.experience.map((exp, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{exp.position}</h3>
                          {isEditing && (
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{exp.institution}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {exp.startYear} - {exp.endYear}
                          </span>
                        </div>
                        <p className="mt-2 text-sm">{exp.description}</p>
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    )}
                  </TabsContent>

                  <TabsContent
                    value="certifications"
                    className="space-y-4 pt-4"
                  >
                    {profileData.certifications.map((cert, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{cert.name}</h3>
                          {isEditing && (
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{cert.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Issued: {cert.year}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Expires: {cert.expires}</span>
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Certification
                      </Button>
                    )}
                  </TabsContent>

                  <TabsContent value="skills" className="pt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="px-3 py-1"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="px-3 py-1 h-auto"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Skill
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Awards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profileData.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{achievement.year}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Building className="h-4 w-4" />
                              <span>{achievement.issuer}</span>
                            </div>
                          </div>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    {isEditing && (
                      <Button variant="outline" className="w-full mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Achievement
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
