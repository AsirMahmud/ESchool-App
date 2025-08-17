"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronRight,
  Download,
  Edit,
  FileText,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("all");

  // Sample subjects data
  const subjectsData = [
    {
      id: "subj-001",
      name: "Mathematics",
      code: "MATH",
      department: "Science & Mathematics",
      gradeLevels: [
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "Grade 10",
        "Grade 11",
        "Grade 12",
      ],
      description:
        "Core mathematics curriculum covering algebra, geometry, calculus, and statistics.",
      coordinator: {
        name: "Dr. Alan Turing",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "subj-002",
      name: "Physics",
      code: "PHYS",
      department: "Science & Mathematics",
      gradeLevels: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
      description: "Study of matter, energy, and the interaction between them.",
      coordinator: {
        name: "Dr. Marie Curie",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "subj-003",
      name: "English Literature",
      code: "ELIT",
      department: "Languages & Arts",
      gradeLevels: [
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "Grade 10",
        "Grade 11",
        "Grade 12",
      ],
      description:
        "Study of literature written in the English language, including poetry, novels, and plays.",
      coordinator: {
        name: "Prof. Jane Austen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "subj-004",
      name: "World History",
      code: "HIST",
      department: "Humanities",
      gradeLevels: ["Grade 8", "Grade 9", "Grade 10", "Grade 11"],
      description:
        "Study of significant events, cultures, and changes throughout human history.",
      coordinator: {
        name: "Dr. Howard Zinn",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "subj-005",
      name: "Physical Education",
      code: "PHED",
      department: "Physical Education & Health",
      gradeLevels: [
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "Grade 10",
        "Grade 11",
        "Grade 12",
      ],
      description:
        "Development of physical fitness, sports skills, and health education.",
      coordinator: {
        name: "Coach Michael Jordan",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  ];

  // Filter subjects based on search and filters
  const filteredSubjects = subjectsData.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" || subject.department === selectedDepartment;
    const matchesGradeLevel =
      selectedGradeLevel === "all" ||
      subject.gradeLevels.includes(selectedGradeLevel);

    return matchesSearch && matchesDepartment && matchesGradeLevel;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Subject Management
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
            <span>Subjects</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Subject</DialogTitle>
                <DialogDescription>
                  Create a new subject for the academic curriculum.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="subject-name"
                    placeholder="Enter subject name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject-code" className="text-right">
                    Code
                  </Label>
                  <Input
                    id="subject-code"
                    placeholder="Enter subject code"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject-department" className="text-right">
                    Department
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science-math">
                        Science & Mathematics
                      </SelectItem>
                      <SelectItem value="languages-arts">
                        Languages & Arts
                      </SelectItem>
                      <SelectItem value="humanities">Humanities</SelectItem>
                      <SelectItem value="physical-education">
                        Physical Education & Health
                      </SelectItem>
                      <SelectItem value="technology">
                        Technology & Computing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject-coordinator" className="text-right">
                    Coordinator
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select coordinator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alan-turing">
                        Dr. Alan Turing
                      </SelectItem>
                      <SelectItem value="marie-curie">
                        Dr. Marie Curie
                      </SelectItem>
                      <SelectItem value="jane-austen">
                        Prof. Jane Austen
                      </SelectItem>
                      <SelectItem value="howard-zinn">
                        Dr. Howard Zinn
                      </SelectItem>
                      <SelectItem value="michael-jordan">
                        Coach Michael Jordan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="subject-description"
                    placeholder="Enter subject description"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Subject</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Science & Mathematics">
                Science & Mathematics
              </SelectItem>
              <SelectItem value="Languages & Arts">Languages & Arts</SelectItem>
              <SelectItem value="Humanities">Humanities</SelectItem>
              <SelectItem value="Physical Education & Health">
                Physical Education & Health
              </SelectItem>
              <SelectItem value="Technology & Computing">
                Technology & Computing
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedGradeLevel}
            onValueChange={setSelectedGradeLevel}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Grade Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grade Levels</SelectItem>
              <SelectItem value="Grade 6">Grade 6</SelectItem>
              <SelectItem value="Grade 7">Grade 7</SelectItem>
              <SelectItem value="Grade 8">Grade 8</SelectItem>
              <SelectItem value="Grade 9">Grade 9</SelectItem>
              <SelectItem value="Grade 10">Grade 10</SelectItem>
              <SelectItem value="Grade 11">Grade 11</SelectItem>
              <SelectItem value="Grade 12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium">
              <div className="col-span-3">Subject</div>
              <div className="col-span-2">Code</div>
              <div className="col-span-3">Department</div>
              <div className="col-span-2">Coordinator</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="p-4 grid grid-cols-12 items-center border-t"
                >
                  <div className="col-span-3 font-medium">{subject.name}</div>
                  <div className="col-span-2">
                    <Badge variant="outline">{subject.code}</Badge>
                  </div>
                  <div className="col-span-3">{subject.department}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={subject.coordinator.avatar || "/placeholder.svg"}
                        alt={subject.coordinator.name}
                      />
                      <AvatarFallback>
                        {subject.coordinator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{subject.coordinator.name}</span>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground border-t">
                No subjects found matching your filters.
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <Card key={subject.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Badge variant="outline">{subject.code}</Badge>
                    </div>
                    <CardDescription>{subject.department}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {subject.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Grade Levels:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {subject.gradeLevels.map((grade) => (
                          <Badge
                            key={grade}
                            variant="secondary"
                            className="text-xs"
                          >
                            {grade}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={subject.coordinator.avatar || "/placeholder.svg"}
                          alt={subject.coordinator.name}
                        />
                        <AvatarFallback>
                          {subject.coordinator.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {subject.coordinator.name}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-4 text-center text-muted-foreground border rounded-md">
                No subjects found matching your filters.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
