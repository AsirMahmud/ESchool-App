import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function ParentAcademics() {
  // Sample curriculum data
  const curriculum = [
    {
      grade: "Grade 8",
      subjects: [
        {
          name: "Mathematics",
          units: [
            { name: "Algebra", status: "In Progress", completion: "60%" },
            { name: "Geometry", status: "Upcoming", completion: "0%" },
            { name: "Statistics", status: "Upcoming", completion: "0%" },
          ],
          resources: [
            { name: "Textbook: Advanced Mathematics Grade 8", type: "Book" },
            { name: "Online Practice Problems", type: "Website" },
          ],
        },
        {
          name: "Science",
          units: [
            {
              name: "Physics: Forces and Motion",
              status: "Completed",
              completion: "100%",
            },
            {
              name: "Chemistry: Elements and Compounds",
              status: "In Progress",
              completion: "75%",
            },
            {
              name: "Biology: Ecosystems",
              status: "Upcoming",
              completion: "0%",
            },
          ],
          resources: [
            { name: "Textbook: Integrated Science Grade 8", type: "Book" },
            { name: "Virtual Lab Simulations", type: "Software" },
          ],
        },
        {
          name: "English",
          units: [
            {
              name: "Literature: Classic Novels",
              status: "Completed",
              completion: "100%",
            },
            {
              name: "Grammar and Composition",
              status: "In Progress",
              completion: "50%",
            },
            { name: "Public Speaking", status: "Upcoming", completion: "0%" },
          ],
          resources: [
            { name: "Textbook: English Language Arts Grade 8", type: "Book" },
            { name: "Reading List: 10 Classic Novels", type: "Document" },
          ],
        },
      ],
    },
    {
      grade: "Grade 5",
      subjects: [
        {
          name: "Mathematics",
          units: [
            {
              name: "Fractions and Decimals",
              status: "In Progress",
              completion: "70%",
            },
            { name: "Measurement", status: "Upcoming", completion: "0%" },
            { name: "Basic Geometry", status: "Upcoming", completion: "0%" },
          ],
          resources: [
            { name: "Textbook: Mathematics Grade 5", type: "Book" },
            { name: "Math Practice Worksheets", type: "Document" },
          ],
        },
        {
          name: "Science",
          units: [
            {
              name: "Earth and Space",
              status: "Completed",
              completion: "100%",
            },
            { name: "Living Things", status: "In Progress", completion: "40%" },
            { name: "Matter and Energy", status: "Upcoming", completion: "0%" },
          ],
          resources: [
            { name: "Textbook: Science Exploration Grade 5", type: "Book" },
            { name: "Science Project Materials", type: "Kit" },
          ],
        },
        {
          name: "English",
          units: [
            {
              name: "Reading Comprehension",
              status: "In Progress",
              completion: "65%",
            },
            {
              name: "Writing Skills",
              status: "In Progress",
              completion: "50%",
            },
            {
              name: "Vocabulary Building",
              status: "Upcoming",
              completion: "0%",
            },
          ],
          resources: [
            { name: "Textbook: English Language Arts Grade 5", type: "Book" },
            { name: "Reading Journal", type: "Document" },
          ],
        },
      ],
    },
  ];

  // Sample academic calendar events
  const academicCalendar = [
    { date: "May 15, 2025", event: "Mathematics Mid-Term Exam", type: "Exam" },
    {
      date: "May 20, 2025",
      event: "Science Project Submission",
      type: "Deadline",
    },
    {
      date: "May 25, 2025",
      event: "Parent-Teacher Conference",
      type: "Meeting",
    },
    {
      date: "June 5, 2025",
      event: "End of Term Exams Begin",
      type: "Exam Period",
    },
    {
      date: "June 20, 2025",
      event: "Last Day of School",
      type: "School Event",
    },
    {
      date: "September 5, 2025",
      event: "First Day of New Academic Year",
      type: "School Event",
    },
  ];

  // Sample learning resources
  const learningResources = [
    {
      name: "School Learning Portal",
      description:
        "Online platform with additional learning materials and exercises",
      type: "Website",
      url: "#",
    },
    {
      name: "Mathematics Practice Problems",
      description: "Additional practice problems for all grade levels",
      type: "PDF",
      url: "#",
    },
    {
      name: "Science Virtual Labs",
      description: "Interactive virtual labs for science experiments",
      type: "Software",
      url: "#",
    },
    {
      name: "Reading List",
      description: "Recommended books for different grade levels",
      type: "Document",
      url: "#",
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Academics</h1>
        <p className="text-muted-foreground">
          View curriculum, academic calendar, and learning resources
        </p>
      </div>

      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="space-y-6 mt-6">
          {curriculum.map((grade, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{grade.grade} Curriculum</CardTitle>
                <CardDescription>
                  Current subjects and learning units
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {grade.subjects.map((subject, subIndex) => (
                  <div key={subIndex} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{subject.name}</h3>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Syllabus
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Learning Units
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {subject.units.map((unit, unitIndex) => (
                              <div
                                key={unitIndex}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  {unit.status === "Completed" ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : unit.status === "In Progress" ? (
                                    <Clock className="h-4 w-4 text-amber-500" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-gray-400" />
                                  )}
                                  <span>{unit.name}</span>
                                </div>
                                <Badge
                                  variant={
                                    unit.status === "Completed"
                                      ? "default"
                                      : unit.status === "In Progress"
                                      ? "outline"
                                      : "secondary"
                                  }
                                >
                                  {unit.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Learning Resources
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {subject.resources.map(
                              (resource, resourceIndex) => (
                                <div
                                  key={resourceIndex}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    <span>{resource.name}</span>
                                  </div>
                                  <Badge variant="secondary">
                                    {resource.type}
                                  </Badge>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Calendar 2024-2025</CardTitle>
              <CardDescription>Important dates and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academicCalendar.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md ${
                          event.type === "Exam"
                            ? "bg-red-100"
                            : event.type === "Deadline"
                            ? "bg-amber-100"
                            : event.type === "Meeting"
                            ? "bg-blue-100"
                            : "bg-green-100"
                        }`}
                      >
                        <Calendar
                          className={`h-5 w-5 ${
                            event.type === "Exam"
                              ? "text-red-600"
                              : event.type === "Deadline"
                              ? "text-amber-600"
                              : event.type === "Meeting"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{event.event}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.date}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>School Hours</CardTitle>
              <CardDescription>Regular school schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium mb-1">Monday - Friday</div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Morning Session:</span>
                        <span>8:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Lunch Break:</span>
                        <span>12:00 PM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Afternoon Session:</span>
                        <span>1:00 PM - 3:30 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="font-medium mb-1">Office Hours</div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Administration:</span>
                        <span>7:30 AM - 4:30 PM</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Teacher Consultation:</span>
                        <span>3:30 PM - 4:30 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekend:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Additional materials to support learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningResources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        {resource.type === "Website" ? (
                          <ExternalLink className="h-5 w-5 text-primary" />
                        ) : resource.type === "PDF" ||
                          resource.type === "Document" ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {resource.description}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={resource.url}>
                        {resource.type === "Website" ? (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Reading</CardTitle>
              <CardDescription>Books recommended by teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium mb-2">Grade 8</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      To Kill a Mockingbird - Harper Lee
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      The Giver - Lois Lowry
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Animal Farm - George Orwell
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      The Hobbit - J.R.R. Tolkien
                    </li>
                  </ul>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="font-medium mb-2">Grade 5</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Charlotte's Web - E.B. White
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Wonder - R.J. Palacio
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      The Lion, the Witch and the Wardrobe - C.S. Lewis
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Holes - Louis Sachar
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
