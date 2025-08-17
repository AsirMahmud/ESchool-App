import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  FileText,
  Award,
  Edit,
} from "lucide-react";
import Link from "next/link";

export default function EmployeeProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Smith",
    email: "john.smith@eschool.edu",
    phone: "+1 (555) 123-4567",
    department: "Administration",
    position: "Principal",
    role: "Administrator",
    status: "Active",
    joinDate: "August 15, 2020",
    address: "123 School Street, Education City, EC 12345",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "John Smith is an experienced educational administrator with over 15 years of experience in school management and leadership. He has a passion for creating positive learning environments and implementing innovative educational strategies.",
    education: [
      {
        degree: "Ph.D. in Educational Leadership",
        institution: "University of Education",
        year: "2010",
      },
      {
        degree: "Master's in School Administration",
        institution: "State University",
        year: "2005",
      },
      {
        degree: "Bachelor's in Education",
        institution: "City College",
        year: "2000",
      },
    ],
    experience: [
      {
        position: "Vice Principal",
        institution: "Westside High School",
        duration: "2015-2020",
      },
      {
        position: "Department Head",
        institution: "Eastside Academy",
        duration: "2010-2015",
      },
      {
        position: "Senior Teacher",
        institution: "Central School District",
        duration: "2005-2010",
      },
    ],
    certifications: [
      "Advanced Educational Leadership Certification",
      "School Management and Administration License",
      "Crisis Management in Educational Settings",
      "Inclusive Education Practices",
    ],
    skills: [
      "Educational Leadership",
      "Curriculum Development",
      "Staff Management",
      "Budget Planning",
      "Strategic Planning",
      "Community Engagement",
      "Crisis Management",
      "Educational Technology",
    ],
    documents: [
      { name: "Employment Contract", date: "Aug 15, 2020", type: "PDF" },
      { name: "Performance Review 2023", date: "Dec 10, 2023", type: "PDF" },
      { name: "Leadership Certification", date: "Mar 22, 2019", type: "PDF" },
      {
        name: "Professional Development Plan",
        date: "Jan 05, 2024",
        type: "DOCX",
      },
    ],
    attendance: {
      present: 220,
      absent: 5,
      leave: 10,
      late: 3,
    },
    performanceRatings: [
      { year: "2023", rating: 4.8 },
      { year: "2022", rating: 4.7 },
      { year: "2021", rating: 4.6 },
      { year: "2020", rating: 4.5 },
    ],
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/employees">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Employee Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/employees/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/employees/${params.id}/permissions`}>
              Manage Permissions
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={employee.avatar || "/placeholder.svg"}
                  alt={employee.name}
                />
                <AvatarFallback>
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.position}</p>
              <Badge
                variant="outline"
                className="mt-2 bg-purple-100 text-purple-800 border-purple-200"
              >
                {employee.role}
              </Badge>
              <Badge
                variant={employee.status === "Active" ? "default" : "secondary"}
                className="mt-2"
              >
                {employee.status}
              </Badge>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{employee.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: {employee.joinDate}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium">Skills & Expertise</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{employee.bio}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="education" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="education" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education & Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {employee.education.map((edu, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-4"
                      >
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-muted-foreground">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="font-medium">Certifications</h3>
                    <ul className="mt-2 space-y-2">
                      {employee.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {employee.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-4"
                      >
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-muted-foreground">
                          {exp.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents & Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Added: {doc.date}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{doc.type}</Badge>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Upload New Document
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Performance & Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium">Performance Ratings</h3>
                      <div className="mt-4 space-y-3">
                        {employee.performanceRatings.map((perf, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span>{perf.year}</span>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-32 rounded-full bg-gray-200">
                                <div
                                  className="h-2 rounded-full bg-primary"
                                  style={{
                                    width: `${(perf.rating / 5) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="font-medium">
                                {perf.rating}/5
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link
                          href={`/admin/employees/${params.id}/performance`}
                        >
                          View Full Report
                        </Link>
                      </Button>
                    </div>
                    <div>
                      <h3 className="font-medium">Attendance Summary</h3>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span>Present</span>
                          </div>
                          <span className="font-medium">
                            {employee.attendance.present} days
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span>Absent</span>
                          </div>
                          <span className="font-medium">
                            {employee.attendance.absent} days
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span>Leave</span>
                          </div>
                          <span className="font-medium">
                            {employee.attendance.leave} days
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span>Late</span>
                          </div>
                          <span className="font-medium">
                            {employee.attendance.late} days
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link href={`/admin/employees/${params.id}/attendance`}>
                          View Attendance Log
                        </Link>
                      </Button>
                    </div>
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
