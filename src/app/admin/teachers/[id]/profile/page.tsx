import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  Edit,
  Mail,
  MapPin,
  Phone,
  Share2,
  User,
} from "lucide-react";

export default function TeacherProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the teacher data based on the ID
  const teacher = {
    id: params.id,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Mathematics",
    subjects: ["Algebra", "Calculus", "Statistics"],
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 234-5678",
    address: "123 Education Street, Academic City, AC 12345",
    joinDate: "August 15, 2020",
    status: "Active",
    education: [
      {
        degree: "Ph.D. in Mathematics",
        institution: "University of Mathematics",
        year: "2015",
      },
      {
        degree: "M.Sc. in Applied Mathematics",
        institution: "State University",
        year: "2010",
      },
      {
        degree: "B.Sc. in Mathematics",
        institution: "City College",
        year: "2008",
      },
    ],
    experience: [
      {
        position: "Senior Mathematics Teacher",
        institution: "Elite High School",
        duration: "2015-2020",
      },
      {
        position: "Mathematics Teacher",
        institution: "Central High School",
        duration: "2010-2015",
      },
    ],
    certifications: [
      "Advanced Teaching Certification",
      "Mathematics Education Specialist",
      "Digital Learning Expert",
    ],
    classes: [
      { name: "Advanced Calculus", grade: "12th", students: 18 },
      { name: "Algebra II", grade: "11th", students: 22 },
      { name: "Statistics", grade: "12th", students: 20 },
    ],
    performance: {
      rating: 4.8,
      attendance: 98,
      studentSuccess: 92,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Profile</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={teacher.avatar || "/placeholder.svg"}
                alt={teacher.name}
              />
              <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{teacher.name}</CardTitle>
              <CardDescription>{teacher.department} Department</CardDescription>
              <Badge className="mt-1">{teacher.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: {teacher.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Teacher ID: {teacher.id}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Certifications</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                {teacher.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    Teacher's performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">
                        {teacher.performance.rating}/5.0
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Overall Rating
                      </div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">
                        {teacher.performance.attendance}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Attendance Rate
                      </div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">
                        {teacher.performance.studentSuccess}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Student Success Rate
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Classes</CardTitle>
                  <CardDescription>
                    Classes currently being taught
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.classes.map((cls) => (
                      <div
                        key={cls.name}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <div className="font-medium">{cls.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Grade: {cls.grade}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {cls.students} Students
                          </div>
                          <Button variant="link" size="sm" className="p-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Educational Background</CardTitle>
                  <CardDescription>
                    Academic qualifications and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teacher.education.map((edu, index) => (
                      <div
                        key={index}
                        className="relative border-l pl-6 pt-2 before:absolute before:left-0 before:top-0 before:h-4 before:w-4 before:rounded-full before:border-4 before:border-primary before:bg-background before:content-['']"
                      >
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution}
                        </p>
                        <p className="text-sm font-medium">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                  <CardDescription>
                    Previous teaching and work experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teacher.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="relative border-l pl-6 pt-2 before:absolute before:left-0 before:top-0 before:h-4 before:w-4 before:rounded-full before:border-4 before:border-primary before:bg-background before:content-['']"
                      >
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.institution}
                        </p>
                        <p className="text-sm font-medium">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Classes</CardTitle>
                  <CardDescription>
                    Current teaching assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.classes.map((cls, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{cls.name}</CardTitle>
                          <CardDescription>Grade: {cls.grade}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Students: {cls.students}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Schedule: Mon, Wed, Fri (10:00 - 11:30 AM)
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Class Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
