"use client";

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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Book,
  Calendar,
  Clock,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TeacherClassesPage({
  params,
}: {
  params: { id: string };
}) {
  const teacher = {
    id: params.id,
    name: "Sarah Johnson",
    department: "Mathematics",
  };

  const classes = [
    {
      id: "MATH-12A",
      name: "Advanced Calculus",
      grade: "12th",
      students: 18,
      schedule: "Mon, Wed, Fri (08:00 - 09:30)",
      room: "Room 103",
      progress: 65,
      topics: ["Limits", "Derivatives", "Integrals", "Applications"],
      status: "In Progress",
    },
    {
      id: "MATH-11B",
      name: "Algebra II",
      grade: "11th",
      students: 22,
      schedule: "Mon, Wed, Fri (13:30 - 15:00)",
      room: "Room 101",
      progress: 70,
      topics: ["Equations", "Functions", "Polynomials", "Logarithms"],
      status: "In Progress",
    },
    {
      id: "MATH-12C",
      name: "Statistics",
      grade: "12th",
      students: 20,
      schedule: "Tue, Thu (09:45 - 11:15)",
      room: "Room 105",
      progress: 55,
      topics: [
        "Probability",
        "Distributions",
        "Hypothesis Testing",
        "Regression",
      ],
      status: "In Progress",
    },
  ];

  const students = [
    {
      id: "S2025-001",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      attendance: 95,
      performance: "Excellent",
    },
    {
      id: "S2025-002",
      name: "James Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      attendance: 88,
      performance: "Good",
    },
    {
      id: "S2025-003",
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      attendance: 92,
      performance: "Excellent",
    },
    {
      id: "S2025-004",
      name: "Liam Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      attendance: 78,
      performance: "Average",
    },
    {
      id: "S2025-005",
      name: "Olivia Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      attendance: 90,
      performance: "Good",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/teachers">
          <Button variant="outline" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{teacher.name}</h1>
          <p className="text-muted-foreground">
            {teacher.department} Department
          </p>
        </div>
      </div>

      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="classes">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <Card key={cls.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{cls.name}</CardTitle>
                      <CardDescription>{cls.schedule}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    <strong>Grade:</strong> {cls.grade}
                  </p>
                  <p>
                    <strong>Room:</strong> {cls.room}
                  </p>
                  <p>
                    <strong>Students:</strong> {cls.students}
                  </p>
                  <div>
                    <p className="mb-1">
                      <strong>Progress</strong>
                    </p>
                    <Progress value={cls.progress} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cls.topics.map((topic, idx) => (
                      <Badge key={idx} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {students.map((student) => (
              <Card key={student.id}>
                <CardHeader className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{student.name}</CardTitle>
                    <CardDescription>ID: {student.id}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Grade:</strong> {student.grade}
                  </p>
                  <p>
                    <strong>Attendance:</strong> {student.attendance}%
                  </p>
                  <p>
                    <strong>Performance:</strong> {student.performance}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
