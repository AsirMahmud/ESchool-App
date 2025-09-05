"use client";

import { useState } from "react";
import { format, addDays, isAfter, isBefore } from "date-fns";
import {
  Calendar,
  Check,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Plus,
  Search,
  Trash2,
  Users,
  X,
  BarChart3,
  TrendingUp,
  Award,
  AlertCircle,
} from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  useAssessments,
  useCreateAssessment,
  useDeleteAssessment,
  useAssessmentStatistics,
  useUpcomingAssessments,
} from "@/hooks/use-assessments";
import { useTeacherClasses } from "@/hooks/use-teachers";
import { useSubjects } from "@/hooks/use-subjects";

export default function TeacherAssessmentsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [assessmentType, setAssessmentType] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isGradingDialogOpen, setIsGradingDialogOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);

  // Form state for creating assessment
  const [assessmentForm, setAssessmentForm] = useState({
    title: "",
    description: "",
    subject: "",
    class_room: "",
    assessment_type: "quiz",
    total_marks: 100,
    passing_marks: 50,
    due_date: "",
    start_date: "",
    duration_minutes: 60,
    instructions: "",
    is_published: false,
  });

  const { data: classes } = useTeacherClasses(1); // Replace with actual teacher ID
  const { data: subjects } = useSubjects();
  
  const { data: assessments, isLoading } = useAssessments({
    class_room: selectedClass ? parseInt(selectedClass) : undefined,
    subject: selectedSubject ? parseInt(selectedSubject) : undefined,
    assessment_type: assessmentType || undefined,
  });

  const { data: statistics } = useAssessmentStatistics({
    class_room: selectedClass ? parseInt(selectedClass) : undefined,
    subject: selectedSubject ? parseInt(selectedSubject) : undefined,
  });

  const { data: upcomingAssessments } = useUpcomingAssessments(1, 7); // Next 7 days

  const createAssessmentMutation = useCreateAssessment();
  const deleteAssessmentMutation = useDeleteAssessment();

  const handleCreateAssessment = () => {
    createAssessmentMutation.mutate(assessmentForm, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        setAssessmentForm({
          title: "",
          description: "",
          subject: "",
          class_room: "",
          assessment_type: "quiz",
          total_marks: 100,
          passing_marks: 50,
          due_date: "",
          start_date: "",
          duration_minutes: 60,
          instructions: "",
          is_published: false,
        });
      },
    });
  };

  const handleDeleteAssessment = (id: number) => {
    if (confirm('Are you sure you want to delete this assessment?')) {
      deleteAssessmentMutation.mutate(id);
    }
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800';
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'homework': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (assessment: any) => {
    const now = new Date();
    const dueDate = new Date(assessment.due_date);
    
    if (!assessment.is_published) {
      return <Badge variant="outline">Draft</Badge>;
    }
    
    if (isAfter(now, dueDate)) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    
    if (isBefore(now, dueDate) && isAfter(now, addDays(dueDate, -1))) {
      return <Badge variant="default">Due Soon</Badge>;
    }
    
    return <Badge variant="secondary">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assessment Management</h2>
          <p className="text-muted-foreground">
            Create, manage, and grade student assessments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Assessment</DialogTitle>
                <DialogDescription>
                  Create a new assessment for your students.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Assessment Title</Label>
                    <Input
                      id="title"
                      value={assessmentForm.title}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, title: e.target.value })}
                      placeholder="Enter assessment title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Assessment Type</Label>
                    <Select
                      value={assessmentForm.assessment_type}
                      onValueChange={(value) => setAssessmentForm({ ...assessmentForm, assessment_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="homework">Homework</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={assessmentForm.description}
                    onChange={(e) => setAssessmentForm({ ...assessmentForm, description: e.target.value })}
                    placeholder="Enter assessment description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={assessmentForm.subject}
                      onValueChange={(value) => setAssessmentForm({ ...assessmentForm, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects?.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id.toString()}>
                            {subject.s_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={assessmentForm.class_room}
                      onValueChange={(value) => setAssessmentForm({ ...assessmentForm, class_room: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes?.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id.toString()}>
                            {cls.class_room_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="total_marks">Total Marks</Label>
                    <Input
                      id="total_marks"
                      type="number"
                      value={assessmentForm.total_marks}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, total_marks: parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passing_marks">Passing Marks</Label>
                    <Input
                      id="passing_marks"
                      type="number"
                      value={assessmentForm.passing_marks}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, passing_marks: parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={assessmentForm.duration_minutes}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, duration_minutes: parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="datetime-local"
                      value={assessmentForm.start_date}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, start_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="datetime-local"
                      value={assessmentForm.due_date}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, due_date: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={assessmentForm.instructions}
                    onChange={(e) => setAssessmentForm({ ...assessmentForm, instructions: e.target.value })}
                    placeholder="Enter assessment instructions"
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={assessmentForm.is_published}
                    onChange={(e) => setAssessmentForm({ ...assessmentForm, is_published: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_published">Publish immediately</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAssessment} disabled={createAssessmentMutation.isPending}>
                  Create Assessment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Assessments</p>
                  <p className="text-2xl font-bold">{statistics.total_assessments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Published</p>
                  <p className="text-2xl font-bold">{statistics.published_assessments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Submissions</p>
                  <p className="text-2xl font-bold">{statistics.total_submissions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Average Marks</p>
                  <p className="text-2xl font-bold">{statistics.average_marks.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Assessments</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search assessments..."
                      className="pl-8 w-full sm:w-[250px]"
                    />
                  </div>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes?.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.class_room_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={assessmentType} onValueChange={setAssessmentType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="homework">Homework</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading assessments...
                      </TableCell>
                    </TableRow>
                  ) : assessments?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No assessments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    assessments?.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{assessment.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {assessment.subject_name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getAssessmentTypeColor(assessment.assessment_type)}>
                            {assessment.assessment_type.charAt(0).toUpperCase() + assessment.assessment_type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{assessment.class_name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {format(new Date(assessment.due_date), 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(assessment)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>0/25</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedAssessment(assessment);
                                setIsGradingDialogOpen(true);
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAssessment(assessment.id)}
                              disabled={deleteAssessmentMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assessments</CardTitle>
              <CardDescription>
                Assessments due in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAssessments?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming assessments in the next 7 days.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAssessments?.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{assessment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {assessment.class_name} • {assessment.subject_name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Due {format(new Date(assessment.due_date), 'MMM d, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {assessment.total_marks} marks
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Grading</CardTitle>
              <CardDescription>
                Assessments that need to be graded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No assessments pending grading.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Average Score</span>
                      <span>{statistics?.average_marks.toFixed(1)}%</span>
                    </div>
                    <Progress value={statistics?.average_marks || 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Pass Rate</span>
                      <span>{statistics?.pass_rate.toFixed(1)}%</span>
                    </div>
                    <Progress value={statistics?.pass_rate || 0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Quizzes</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Assignments</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Exams</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Projects</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
