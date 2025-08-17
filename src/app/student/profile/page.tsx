import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Edit,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";

export default function StudentProfile() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">
            View and manage your personal information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Download Transcript
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Student"
                />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <CardTitle>Alex Johnson</CardTitle>
                <CardDescription>Student ID: S12345678</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Profile Completion</div>
              <Progress value={85} />
              <div className="text-xs text-muted-foreground text-right">
                85% Complete
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>alex.johnson@student.edu</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>123 Campus Drive, College Town</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Enrolled: September 2023</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Program</div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Computer Science</span>
                <Badge>Sophomore</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Academic Advisor</div>
              <div className="text-sm">Dr. Sarah Williams</div>
              <div className="text-xs text-muted-foreground">
                s.williams@school.edu
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/student/settings">
                <User className="mr-2 h-4 w-4" />
                Account Settings
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/student/messages">
                <Mail className="mr-2 h-4 w-4" />
                Messages
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="about" className="space-y-4">
            <TabsList>
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    I'm a sophomore studying Computer Science with a minor in
                    Mathematics. I'm passionate about software development and
                    artificial intelligence. My goal is to develop innovative
                    solutions that can make a positive impact on society.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-medium">Interests</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Programming</Badge>
                      <Badge variant="secondary">Artificial Intelligence</Badge>
                      <Badge variant="secondary">Web Development</Badge>
                      <Badge variant="secondary">Data Science</Badge>
                      <Badge variant="secondary">Chess</Badge>
                      <Badge variant="secondary">Photography</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span>{skill.level}/5</span>
                        </div>
                        <Progress value={skill.level * 20} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Education History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-4 pb-4"
                      >
                        <div className="font-medium">{edu.institution}</div>
                        <div className="text-sm text-muted-foreground">
                          {edu.years}
                        </div>
                        <div className="mt-1 text-sm">{edu.degree}</div>
                        {edu.description && (
                          <div className="mt-2 text-sm">{edu.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {cert.issuer} • {cert.date}
                          </div>
                          {cert.link && (
                            <Link
                              href={cert.link}
                              className="flex items-center text-sm text-primary"
                            >
                              <ExternalLink className="mr-1 h-3 w-3" />
                              <span>View Certificate</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-4 pb-4"
                      >
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.date}
                        </div>
                        <div className="mt-2 text-sm">
                          {achievement.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Extracurricular Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-4 pb-4"
                      >
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.role} • {activity.period}
                        </div>
                        <div className="mt-2 text-sm">
                          {activity.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {volunteer.map((vol, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-4 pb-4"
                      >
                        <div className="font-medium">{vol.organization}</div>
                        <div className="text-sm text-muted-foreground">
                          {vol.role} • {vol.period}
                        </div>
                        <div className="mt-2 text-sm">{vol.description}</div>
                      </div>
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

const skills = [
  { name: "JavaScript", level: 4 },
  { name: "Python", level: 4 },
  { name: "Java", level: 3 },
  { name: "HTML/CSS", level: 4 },
  { name: "React", level: 3 },
  { name: "SQL", level: 3 },
];

const education = [
  {
    institution: "State University",
    years: "2023 - Present",
    degree: "Bachelor of Science in Computer Science",
    description:
      "Current GPA: 3.7/4.0. Relevant coursework includes Data Structures, Algorithms, Database Systems, and Web Development.",
  },
  {
    institution: "Westside High School",
    years: "2019 - 2023",
    degree: "High School Diploma",
    description:
      "Graduated with honors. Member of the National Honor Society and Math Club.",
  },
];

const certifications = [
  {
    name: "Web Development Fundamentals",
    issuer: "Codecademy",
    date: "December 2023",
    link: "#",
  },
  {
    name: "Python for Data Science",
    issuer: "DataCamp",
    date: "August 2023",
    link: "#",
  },
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "Coursera",
    date: "May 2023",
    link: "#",
  },
];

const achievements = [
  {
    title: "Dean's List",
    date: "Fall 2023, Spring 2024",
    description:
      "Recognized for academic excellence with a GPA of 3.7 or higher.",
  },
  {
    title: "Programming Competition Finalist",
    date: "February 2024",
    description:
      "Placed 3rd in the university's annual programming competition.",
  },
  {
    title: "Academic Scholarship",
    date: "2023 - Present",
    description:
      "Awarded merit-based scholarship covering 50% of tuition costs.",
  },
];

const activities = [
  {
    name: "Computer Science Club",
    role: "Vice President",
    period: "2023 - Present",
    description:
      "Organize weekly coding workshops and tech talks. Coordinate hackathons and programming competitions.",
  },
  {
    name: "Chess Club",
    role: "Member",
    period: "2023 - Present",
    description:
      "Participate in weekly meetings and represent the university in regional tournaments.",
  },
  {
    name: "Student Government Association",
    role: "Technology Committee Member",
    period: "2024 - Present",
    description:
      "Advise on technology initiatives and improvements for campus facilities.",
  },
];

const volunteer = [
  {
    organization: "Code for Good",
    role: "Volunteer Developer",
    period: "Summer 2024",
    description:
      "Developed websites for local non-profit organizations. Provided technical support and training.",
  },
  {
    organization: "Community Tech Workshop",
    role: "Instructor",
    period: "2023 - Present",
    description:
      "Teach basic computer skills to senior citizens and underserved communities.",
  },
];
