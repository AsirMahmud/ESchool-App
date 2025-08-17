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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, FileText, Users } from "lucide-react";

export default function StudentClasses() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Classes</h2>
          <p className="text-muted-foreground">
            View and manage your enrolled classes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            View All Assignments
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Classes</TabsTrigger>
          <TabsTrigger value="past">Past Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentClasses.map((classItem, index) => (
              <Card key={index} className="overflow-hidden">
                <div
                  className="h-3"
                  style={{ backgroundColor: classItem.color }}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{classItem.name}</CardTitle>
                    <Badge>{classItem.code}</Badge>
                  </div>
                  <CardDescription>{classItem.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={classItem.teacher.avatar}
                        alt={classItem.teacher.name}
                      />
                      <AvatarFallback>
                        {classItem.teacher.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {classItem.teacher.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {classItem.teacher.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{classItem.progress}%</span>
                    </div>
                    <Progress value={classItem.progress} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.students} students</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Materials
                  </Button>
                  <Button size="sm">Go to Class</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastClasses.map((classItem, index) => (
              <Card key={index} className="overflow-hidden">
                <div
                  className="h-3"
                  style={{ backgroundColor: classItem.color }}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{classItem.name}</CardTitle>
                    <Badge variant="outline">{classItem.term}</Badge>
                  </div>
                  <CardDescription>{classItem.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={classItem.teacher.avatar}
                        alt={classItem.teacher.name}
                      />
                      <AvatarFallback>
                        {classItem.teacher.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {classItem.teacher.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {classItem.teacher.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Final Grade: {classItem.finalGrade}
                      </span>
                    </div>
                    <Badge variant="secondary">{classItem.status}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Materials
                  </Button>
                  <Button variant="secondary" size="sm">
                    View Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const currentClasses = [
  {
    name: "Advanced Mathematics",
    code: "MATH301",
    description: "Calculus and analytical geometry",
    color: "#4f46e5",
    teacher: {
      name: "Dr. Robert Johnson",
      email: "r.johnson@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RJ",
    },
    progress: 65,
    schedule: "MWF 10:30 AM",
    students: 28,
  },
  {
    name: "Physics",
    code: "PHYS201",
    description: "Mechanics and thermodynamics",
    color: "#0891b2",
    teacher: {
      name: "Prof. Sarah Williams",
      email: "s.williams@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SW",
    },
    progress: 72,
    schedule: "TTh 1:00 PM",
    students: 24,
  },
  {
    name: "World History",
    code: "HIST101",
    description: "Ancient civilizations to modern era",
    color: "#ca8a04",
    teacher: {
      name: "Dr. Michael Thompson",
      email: "m.thompson@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
    },
    progress: 58,
    schedule: "MWF 2:15 PM",
    students: 32,
  },
  {
    name: "English Literature",
    code: "ENG202",
    description: "19th century British literature",
    color: "#be185d",
    teacher: {
      name: "Prof. Emily Parker",
      email: "e.parker@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EP",
    },
    progress: 45,
    schedule: "TTh 9:00 AM",
    students: 26,
  },
  {
    name: "Computer Science",
    code: "CS101",
    description: "Introduction to programming",
    color: "#15803d",
    teacher: {
      name: "Prof. David Chen",
      email: "d.chen@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DC",
    },
    progress: 80,
    schedule: "MWF 11:45 AM",
    students: 30,
  },
];

const pastClasses = [
  {
    name: "Biology",
    code: "BIO101",
    description: "Introduction to cellular biology",
    color: "#65a30d",
    term: "Fall 2023",
    teacher: {
      name: "Dr. Lisa Anderson",
      email: "l.anderson@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LA",
    },
    finalGrade: "A",
    status: "Completed",
  },
  {
    name: "Chemistry",
    code: "CHEM201",
    description: "Organic chemistry principles",
    color: "#0d9488",
    term: "Spring 2023",
    teacher: {
      name: "Prof. James Wilson",
      email: "j.wilson@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
    },
    finalGrade: "B+",
    status: "Completed",
  },
  {
    name: "Algebra",
    code: "MATH101",
    description: "Fundamentals of algebra",
    color: "#6366f1",
    term: "Fall 2022",
    teacher: {
      name: "Dr. Maria Rodriguez",
      email: "m.rodriguez@school.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MR",
    },
    finalGrade: "A-",
    status: "Completed",
  },
];
