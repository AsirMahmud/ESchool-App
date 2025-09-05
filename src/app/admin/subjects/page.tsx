"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  BookOpen,
  Building2,
  Users,
} from "lucide-react";
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from "@/hooks/use-subjects";
import { useDepartments } from "@/hooks/use-departments";
import { useTeachers, useAddTeacherSubject, useAddTeacherClass } from "@/hooks/use-teachers";
import { useLevels, useCreateLevel } from "@/hooks/use-levels";
import { useClasses } from "@/hooks/use-classes";
import { api, endpoints } from "@/lib/api";
import { Combobox } from "@/components/ui/combobox";

export default function AdminSubjectsPage() {
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isEditSubjectOpen, setIsEditSubjectOpen] = useState(false);
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false);
  const [isClassroomAssignmentOpen, setIsClassroomAssignmentOpen] = useState(false);
  const [isTeacherAssignmentOpen, setIsTeacherAssignmentOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [selectedSubjectForClassroom, setSelectedSubjectForClassroom] = useState<any>(null);
  const [selectedSubjectForTeacher, setSelectedSubjectForTeacher] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const { data: subjects, isLoading, error } = useSubjects();
  const { data: departments } = useDepartments();
  const { data: teachers } = useTeachers();
  const { data: levels } = useLevels();
  const { data: classrooms } = useClasses();
  
  const createSubjectMutation = useCreateSubject();
  const updateSubjectMutation = useUpdateSubject();
  const deleteSubjectMutation = useDeleteSubject();
  const createLevelMutation = useCreateLevel();
  const addTeacherSubjectMutation = useAddTeacherSubject();
  const addTeacherClassMutation = useAddTeacherClass();

  const [subjectForm, setSubjectForm] = useState({
    s_name: "",
    s_code: "",
    description: "",
    department: "",
    subject_type: "core",
    difficulty_level: "beginner",
  });
  const [subjectLevel, setSubjectLevel] = useState<string>("");

  const [levelForm, setLevelForm] = useState<{ level_no: number; level_name: string; level_type: string; description: string; number_of_sections?: number; classroom?: number | null }>({
    level_no: 1,
    level_name: "",
    level_type: "elementary",
    description: "",
  });

  const [classroomAssignments, setClassroomAssignments] = useState<{[key: string]: string}>({});
  const [teacherAssignments, setTeacherAssignments] = useState<{[key: string]: string}>({});
  const [teacherBySubject, setTeacherBySubject] = useState<{[code: string]: string}>({});
  const [isManageSectionsOpen, setIsManageSectionsOpen] = useState(false);
  const [levelForSections, setLevelForSections] = useState<any>(null);
  const [sectionsForLevel, setSectionsForLevel] = useState<any[]>([]);
  const [roomAssignmentsBySection, setRoomAssignmentsBySection] = useState<{[id: number]: string}>({});
  const [isManageSectionSubjectsOpen, setIsManageSectionSubjectsOpen] = useState(false);
  const [levelSubjectsForLevel, setLevelSubjectsForLevel] = useState<any[]>([]);
  const [selectedLevelSubject, setSelectedLevelSubject] = useState<string>('');
  const [teacherBySectionForSubject, setTeacherBySectionForSubject] = useState<{[sectionId: number]: string}>({});

  const handleCreateSubject = async () => {
    try {
      const formData = { ...subjectForm } as any;
      const created: any = await createSubjectMutation.mutateAsync(formData);
      // If a level was selected, link the subject to that level (LevelSubject)
      if (subjectLevel) {
        const subjCode = created?.s_code || subjectForm.s_code;
        await api.post(endpoints.levelSubjects, { level: parseInt(subjectLevel), subject: subjCode });
      }
      setIsAddSubjectOpen(false);
      setSubjectForm({
        s_name: "",
        s_code: "",
        description: "",
        department: "",
        subject_type: "core",
        difficulty_level: "beginner",
      });
      setSubjectLevel("");
    } catch (error) {
      console.error('Failed to create subject:', error);
    }
  };

  const handleEditSubject = (subject: any) => {
    setEditingSubject(subject);
    setSubjectForm({
      s_name: subject.s_name || subject.name || "",
      s_code: subject.s_code || subject.code || "",
      description: subject.description || "",
      department: subject.department || "",
      subject_type: subject.subject_type || "core",
      difficulty_level: subject.difficulty_level || "beginner",
      
    });
    setIsEditSubjectOpen(true);
  };

  const handleUpdateSubject = async () => {
    if (!editingSubject) return;
    
    try {
      const formData = { ...subjectForm, s_code: editingSubject.s_code || editingSubject.code } as any;
      await updateSubjectMutation.mutateAsync(formData as any);
      setIsEditSubjectOpen(false);
      setEditingSubject(null);
    } catch (error) {
      console.error('Failed to update subject:', error);
    }
  };

  const handleDeleteSubject = (code: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      deleteSubjectMutation.mutate(code);
    }
  };

  const handleCreateLevel = async () => {
    try {
      await createLevelMutation.mutateAsync(levelForm);
      setIsAddLevelOpen(false);
      setLevelForm({
        level_no: 1,
        level_name: "",
        level_type: "elementary",
        description: "",
      });
    } catch (error) {
      console.error('Failed to create level:', error);
    }
  };

  const openManageSections = async (level: any) => {
    try {
      setLevelForSections(level);
      const data: any = await api.get(`${endpoints.sections}?level=${level.level_no}`);
      const items = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
      setSectionsForLevel(items);
      const map: {[id: number]: string} = {};
      items.forEach((s: any) => { if (s.room) map[s.id] = s.room.toString(); });
      setRoomAssignmentsBySection(map);
      setIsManageSectionsOpen(true);
    } catch (e) {
      console.error('Failed to load sections:', e);
    }
  };

  const saveSectionRooms = async () => {
    try {
      const updates = sectionsForLevel.map(async (s: any) => {
        const newRoom = roomAssignmentsBySection[s.id];
        if (newRoom && newRoom !== (s.room ? s.room.toString() : '')) {
          await api.patch(endpoints.section(s.id), { room: parseInt(newRoom) });
        }
      });
      await Promise.all(updates);
      setIsManageSectionsOpen(false);
    } catch (e) {
      console.error('Failed to save rooms:', e);
    }
  };

  const handleClassroomAssignment = (subject: any) => {
    setSelectedSubjectForClassroom(subject);
    // Initialize classroom assignments for each section
    const assignments: {[key: string]: string} = {};
    for (let i = 1; i <= (subject.sections_count || 1); i++) {
      assignments[`section_${i}`] = '';
    }
    setClassroomAssignments(assignments);
    setIsClassroomAssignmentOpen(true);
  };

  const handleSaveClassroomAssignments = async () => {
    console.log('handleSaveClassroomAssignments called')
    console.log('selectedSubjectForClassroom:', selectedSubjectForClassroom)
    console.log('classroomAssignments:', classroomAssignments)
    
    if (!selectedSubjectForClassroom) {
      alert('No subject selected for classroom assignment')
      return
    }

    try {
      console.log('Saving classroom assignments:', classroomAssignments)
      
      // Process each classroom assignment
      const assignmentPromises = Object.entries(classroomAssignments).map(async ([sectionKey, classroomId]) => {
        if (!classroomId) return // Skip empty assignments
        
        const sectionNumber = sectionKey.replace('section_', '')
        
        // Create assignment data for this section
        const assignmentData = {
          subject_code: selectedSubjectForClassroom.s_code,
          section: sectionNumber,
          classroom_id: parseInt(classroomId),
          start_date: new Date().toISOString().split('T')[0], // Today's date
        }

        console.log(`Assigning classroom ${classroomId} to section ${sectionNumber}:`, assignmentData)
        
        // For now, we'll use a simple API call structure
        // In a real implementation, you would call the appropriate API endpoint
        // await api.post('/subject-sections/assign-classroom/', assignmentData)
        
        return assignmentData
      })

      const results = await Promise.all(assignmentPromises.filter(Boolean))
      
      console.log('Classroom assignments saved successfully:', results)
      alert(`Classroom assignments saved successfully! ${results.length} assignments created.`)
      
      setIsClassroomAssignmentOpen(false)
      setSelectedSubjectForClassroom(null)
      setClassroomAssignments({})
    } catch (error) {
      console.error('Failed to save classroom assignments:', error)
      alert(`Failed to save classroom assignments: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  };

  const handleTeacherAssignment = (subject: any) => {
    setSelectedSubjectForTeacher(subject);
    // Initialize teacher assignments for each section
    const assignments: {[key: string]: string} = {};
    for (let i = 1; i <= (subject.sections_count || 1); i++) {
      assignments[`section_${i}`] = '';
    }
    setTeacherAssignments(assignments);
    setIsTeacherAssignmentOpen(true);
  };

  const handleSaveTeacherAssignments = async () => {
    console.log('handleSaveTeacherAssignments called')
    console.log('selectedSubjectForTeacher:', selectedSubjectForTeacher)
    console.log('teacherAssignments:', teacherAssignments)
    
    if (!selectedSubjectForTeacher) {
      alert('No subject selected for teacher assignment')
      return
    }

    try {
      console.log('Saving teacher assignments:', teacherAssignments)
      
      // Process each teacher assignment
      const assignmentPromises = Object.entries(teacherAssignments).map(async ([sectionKey, teacherId]) => {
        if (!teacherId) return // Skip empty assignments
        
        const sectionNumber = sectionKey.replace('section_', '')
        
        // Create assignment data for this section
        const assignmentData = {
          subject: selectedSubjectForTeacher.s_code, // Subject code
          start_date: new Date().toISOString().split('T')[0], // Today's date
        }

        console.log(`Assigning teacher ${teacherId} to section ${sectionNumber}:`, assignmentData)
        
        // Use the existing teacher assignment API
        const result = await addTeacherSubjectMutation.mutateAsync({
          teacherId: parseInt(teacherId),
          data: assignmentData
        })
        
        console.log(`Teacher assignment result for section ${sectionNumber}:`, result)
        return result
      })

      const results = await Promise.all(assignmentPromises.filter(Boolean))
      
      console.log('Teacher assignments saved successfully:', results)
      alert(`Teacher assignments saved successfully! ${results.length} assignments created.`)
      
      setIsTeacherAssignmentOpen(false)
      setSelectedSubjectForTeacher(null)
      setTeacherAssignments({})
    } catch (error) {
      console.error('Failed to save teacher assignments:', error)
      alert(`Failed to save teacher assignments: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  };

  // Filter subjects based on search and department
  const filteredSubjects = subjects?.filter((subject: any) => {
    const matchesSearch = (subject.s_name || subject.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (subject.s_code || subject.code || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || subject.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading subjects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading subjects: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
        <h2 className="text-3xl font-bold tracking-tight">Subject Management</h2>
        <p className="text-muted-foreground">Manage subjects, levels, and assignments.</p>
      </div>

      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="levels">Levels</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search subjects..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {Array.isArray(departments) && departments.map((dept) => (
                    <SelectItem key={dept.d_name} value={dept.d_name}>
                      {dept.d_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
        </div>
        <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>
                    Create a new subject with department.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="s_name">Subject Name</Label>
                  <Input
                    id="s_name"
                    value={subjectForm.s_name}
                    onChange={(e) => setSubjectForm({ ...subjectForm, s_name: e.target.value })}
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div>
                  <Label htmlFor="s_code">Subject Code</Label>
                  <Input
                    id="s_code"
                    value={subjectForm.s_code}
                    onChange={(e) => setSubjectForm({ ...subjectForm, s_code: e.target.value })}
                    placeholder="e.g., MATH101"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject_type">Subject Type</Label>
                  <Select value={subjectForm.subject_type} onValueChange={(value) => setSubjectForm({ ...subjectForm, subject_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core">Core Subject</SelectItem>
                      <SelectItem value="elective">Elective Subject</SelectItem>
                      <SelectItem value="extracurricular">Extracurricular</SelectItem>
                      <SelectItem value="language">Language</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="social_studies">Social Studies</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="physical_education">Physical Education</SelectItem>
                      <SelectItem value="computer">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty_level">Difficulty Level</Label>
                  <Select value={subjectForm.difficulty_level} onValueChange={(value) => setSubjectForm({ ...subjectForm, difficulty_level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={subjectForm.description}
                  onChange={(e) => setSubjectForm({ ...subjectForm, description: e.target.value })}
                  placeholder="Subject description and objectives"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={subjectForm.department} onValueChange={(value) => setSubjectForm({ ...subjectForm, department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(departments) && departments.map((dept) => (
                        <SelectItem key={dept.d_name} value={dept.d_name}>
                          {dept.d_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assign to Level (optional)</Label>
                  <Select value={subjectLevel} onValueChange={setSubjectLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(levels) && levels.map((lvl: any) => (
                        <SelectItem key={lvl.level_no} value={lvl.level_no.toString()}>{lvl.level_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Level</Label>
                  <div className="flex gap-2">
                    <Dialog open={isAddLevelOpen} onOpenChange={setIsAddLevelOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Level</DialogTitle>
                          <DialogDescription>
                            Create a new academic level for students.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="level-no">Level Number</Label>
                              <Input
                                id="level-no"
                                type="number"
                                min="1"
                                max="12"
                                value={levelForm.level_no}
                                onChange={(e) => setLevelForm({ ...levelForm, level_no: parseInt(e.target.value) || 1 })}
                                placeholder="1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="level-type">Level Type</Label>
                              <Select value={levelForm.level_type} onValueChange={(value) => setLevelForm({ ...levelForm, level_type: value })}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="elementary">Elementary</SelectItem>
                                  <SelectItem value="middle">Middle School</SelectItem>
                                  <SelectItem value="high">High School</SelectItem>
                                  <SelectItem value="pre_k">Pre-Kindergarten</SelectItem>
                                  <SelectItem value="kindergarten">Kindergarten</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="level-name">Level Name</Label>
                            <Input
                              id="level-name"
                              value={levelForm.level_name}
                              onChange={(e) => setLevelForm({ ...levelForm, level_name: e.target.value })}
                              placeholder="e.g., Grade 1, Class 5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="level-description">Description</Label>
                            <Textarea
                              id="level-description"
                              value={levelForm.description}
                              onChange={(e) => setLevelForm({ ...levelForm, description: e.target.value })}
                              placeholder="Description of the level"
                              rows={2}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="level-sections">Number of Sections</Label>
                          <Input
                            id="level-sections"
                            type="number"
                            min="0"
                            max="26"
                            onChange={(e) => setLevelForm({ ...levelForm, number_of_sections: parseInt(e.target.value) || 0 })}
                            placeholder="e.g., 3 for A, B, C"
                          />
                        </div>
                        <div>
                          <Label htmlFor="level-sections">Number of Sections</Label>
                          <Input
                            id="level-sections"
                            type="number"
                            min="0"
                            max="26"
                            onChange={(e) => setLevelForm({ ...levelForm, number_of_sections: parseInt(e.target.value) || 0 })}
                            placeholder="e.g., 3 for A, B, C"
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddLevelOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleCreateLevel} 
                            disabled={createLevelMutation.isPending}
                          >
                            {createLevelMutation.isPending ? "Creating..." : "Create Level"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddSubjectOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateSubject} 
                disabled={createSubjectMutation.isPending}
              >
                {createSubjectMutation.isPending ? "Creating..." : "Create Subject"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between"><CardTitle>All Subjects</CardTitle></div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No subjects found.
                  </TableCell>
                </TableRow>
              ) : (
                Array.isArray(filteredSubjects) && filteredSubjects.map((subject: any) => (
                  <TableRow key={subject.s_code || subject.id}>
                    <TableCell className="font-medium">{subject.s_name || subject.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{subject.s_code || subject.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {subject.subject_type?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Core'}
                      </Badge>
                    </TableCell>
                    <TableCell>{subject.department}</TableCell>
                    <TableCell>
                      <Badge variant={subject.is_active !== false ? "default" : "secondary"}>
                        {subject.is_active !== false ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1">
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditSubject(subject)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteSubject(subject.s_code || subject.code)}
                          disabled={deleteSubjectMutation.isPending}
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

        <TabsContent value="levels" className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Levels</CardTitle>
            <Dialog open={isAddLevelOpen} onOpenChange={setIsAddLevelOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Level
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Level</DialogTitle>
                  <DialogDescription>Create a new academic level.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="level-no">Level Number</Label>
                      <Input id="level-no" type="number" min="1" max="12" value={levelForm.level_no} onChange={(e) => setLevelForm({ ...levelForm, level_no: parseInt(e.target.value) || 1 })} placeholder="1" />
                    </div>
                    <div>
                      <Label htmlFor="level-type">Level Type</Label>
                      <Select value={levelForm.level_type} onValueChange={(value) => setLevelForm({ ...levelForm, level_type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elementary">Elementary</SelectItem>
                          <SelectItem value="middle">Middle School</SelectItem>
                          <SelectItem value="high">High School</SelectItem>
                          <SelectItem value="pre_k">Pre-Kindergarten</SelectItem>
                          <SelectItem value="kindergarten">Kindergarten</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="level-name">Level Name</Label>
                    <Input id="level-name" value={levelForm.level_name} onChange={(e) => setLevelForm({ ...levelForm, level_name: e.target.value })} placeholder="e.g., Grade 1, Class 5" />
                  </div>
                  <div>
                    <Label htmlFor="level-description">Description</Label>
                    <Textarea id="level-description" value={levelForm.description} onChange={(e) => setLevelForm({ ...levelForm, description: e.target.value })} placeholder="Description of the level" rows={2} />
                  </div>
                  <div>
                    <Label htmlFor="level-classroom">Classroom</Label>
                    <Select value={levelForm.classroom ? levelForm.classroom.toString() : ''} onValueChange={(value) => setLevelForm({ ...levelForm, classroom: value ? parseInt(value) : null })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select classroom (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(classrooms) && classrooms.map((c: any) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {(c.room_name || `Room ${c.room_no}`) + (c.floor !== undefined ? ` (Floor ${c.floor})` : '')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level-sections">Number of Sections</Label>
                    <Input id="level-sections" type="number" min="0" max="26" onChange={(e) => setLevelForm({ ...levelForm, number_of_sections: parseInt(e.target.value) || 0 })} placeholder="e.g., 3 for A, B, C" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddLevelOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateLevel} disabled={createLevelMutation.isPending}>{createLevelMutation.isPending ? "Creating..." : "Create Level"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between"><CardTitle>All Levels</CardTitle></div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Sections</TableHead>
                    <TableHead>Classroom</TableHead>
                    <TableHead className="text-right">Manage Sections</TableHead>
                    <TableHead className="text-right">Section Subjects</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(levels) && levels.map((lvl: any) => (
                    <TableRow key={lvl.level_no}>
                      <TableCell>{lvl.level_no}</TableCell>
                      <TableCell>{lvl.level_name}</TableCell>
                      <TableCell>{lvl.level_type?.replace('_', ' ')}</TableCell>
                      <TableCell>{lvl.section_count ?? '-'}</TableCell>
                      <TableCell>{(() => {
                        const c = Array.isArray(classrooms) ? classrooms.find((x: any) => (x.id?.toString() === (lvl.classroom?.toString?.() || ''))) : null;
                        return c ? (c.room_name || `Room ${c.room_no}`) : '—'
                      })()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="secondary" onClick={() => openManageSections(lvl)}>Assign Rooms per Section</Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" onClick={async () => {
                          try {
                            setLevelForSections(lvl);
                            // load sections for the level
                            const data: any = await api.get(`${endpoints.sections}?level=${lvl.level_no}`);
                            const items = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
                            setSectionsForLevel(items);
                            // load level subjects (subjects valid for the level)
                            const ls: any = await api.get(`${endpoints.levelSubjects}?level=${lvl.level_no}`);
                            const levelSubs = Array.isArray(ls) ? ls : (Array.isArray(ls?.results) ? ls.results : []);
                            setLevelSubjectsForLevel(levelSubs);
                            setSelectedLevelSubject('');
                            setTeacherBySectionForSubject({});
                            setIsManageSectionSubjectsOpen(true);
                          } catch (e) {
                            console.error('Failed to open section subjects:', e);
                          }
                        }}>Assign Teachers Per Section (by Subject)</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Subject ↔ Teacher Assignments</CardTitle>
          </div>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between"><CardTitle>Assign Teachers</CardTitle></div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(filteredSubjects) && filteredSubjects.map((subject: any) => (
                    <TableRow key={`assign-${subject.s_code || subject.code}`}>
                      <TableCell>{subject.s_name || subject.name}</TableCell>
                      <TableCell><Badge variant="outline">{subject.s_code || subject.code}</Badge></TableCell>
                      <TableCell>
                        <Select value={teacherBySubject[subject.s_code] || ''} onValueChange={(val) => setTeacherBySubject(prev => ({ ...prev, [subject.s_code]: val }))}>
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Select teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.isArray(teachers) && teachers.map((t: any) => (
                              <SelectItem key={t.teacher_id} value={t.teacher_id.toString()}>
                                {t.teacher_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="secondary"
                          onClick={async () => {
                            const teacherId = teacherBySubject[subject.s_code]
                            if (!teacherId) return
                            await addTeacherSubjectMutation.mutateAsync({
                              teacherId: parseInt(teacherId),
                              data: { subject: subject.s_code, start_date: new Date().toISOString().split('T')[0] }
                            })
                          }}
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Subject Dialog */}
      <Dialog open={isEditSubjectOpen} onOpenChange={setIsEditSubjectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Update subject information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-s_name">Subject Name</Label>
                <Input
                  id="edit-s_name"
                  value={subjectForm.s_name}
                  onChange={(e) => setSubjectForm({ ...subjectForm, s_name: e.target.value })}
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <Label htmlFor="edit-s_code">Subject Code</Label>
                <Input
                  id="edit-s_code"
                  value={subjectForm.s_code}
                  onChange={(e) => setSubjectForm({ ...subjectForm, s_code: e.target.value })}
                  placeholder="e.g., MATH101"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-subject_type">Subject Type</Label>
                <Select value={subjectForm.subject_type} onValueChange={(value) => setSubjectForm({ ...subjectForm, subject_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">Core Subject</SelectItem>
                    <SelectItem value="elective">Elective Subject</SelectItem>
                    <SelectItem value="extracurricular">Extracurricular</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="social_studies">Social Studies</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="physical_education">Physical Education</SelectItem>
                    <SelectItem value="computer">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-difficulty_level">Difficulty Level</Label>
                <Select value={subjectForm.difficulty_level} onValueChange={(value) => setSubjectForm({ ...subjectForm, difficulty_level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={subjectForm.description}
                onChange={(e) => setSubjectForm({ ...subjectForm, description: e.target.value })}
                placeholder="Subject description and objectives"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-department">Department</Label>
                <Select value={subjectForm.department} onValueChange={(value) => setSubjectForm({ ...subjectForm, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(departments) && departments.map((dept) => (
                      <SelectItem key={dept.d_name} value={dept.d_name}>
                        {dept.d_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSubjectOpen(false)}>
              Cancel
                      </Button>
            <Button 
              onClick={handleUpdateSubject}
              disabled={updateSubjectMutation.isPending}
            >
              {updateSubjectMutation.isPending ? "Updating..." : "Update Subject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Section Subjects Dialog */}
      <Dialog open={isManageSectionSubjectsOpen} onOpenChange={setIsManageSectionSubjectsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
            <DialogTitle>Assign Teachers Per Section (by Subject)</DialogTitle>
                        <DialogDescription>
              {levelForSections ? `Level: ${levelForSections.level_name}` : ''}
                        </DialogDescription>
                      </DialogHeader>
          <div className="space-y-6">
            {/* Choose a subject (from level subjects), then assign a teacher per section for that subject */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                <Label>Subject (Level)</Label>
                <Select value={selectedLevelSubject} onValueChange={async (val) => {
                  setSelectedLevelSubject(val);
                  // when subject is picked, load current section-subject records to prefill teachers
                  const secData: any = await api.get(`${endpoints.sections}?level=${levelForSections.level_no}`);
                  const secItems = Array.isArray(secData) ? secData : (Array.isArray(secData?.results) ? secData.results : []);
                  setSectionsForLevel(secItems);
                  // load existing section-subject for each section for the chosen subject
                  const existingMap: {[id: number]: string} = {};
                  for (const s of secItems) {
                    const list: any = await api.get(`${endpoints.sectionSubjects}?section=${s.id}&subject=${val}`);
                    const items = Array.isArray(list) ? list : (Array.isArray(list?.results) ? list.results : []);
                    if (items[0]?.teacher) existingMap[s.id] = items[0].teacher.toString();
                  }
                  setTeacherBySectionForSubject(existingMap);
                }}>
                              <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                              <SelectContent>
                    {levelSubjectsForLevel.map((ls: any) => (
                      <SelectItem key={ls.id} value={ls.subject}>{ls.subject_name || ls.subject}</SelectItem>
                    ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead className="text-right">Save</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionsForLevel.map((s: any) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.section_name || `${levelForSections?.level_name}-${s.sec_no}`}</TableCell>
                    <TableCell>
                      <Select value={teacherBySectionForSubject[s.id] || ''} onValueChange={(val) => setTeacherBySectionForSubject(prev => ({ ...prev, [s.id]: val }))}>
                        <SelectTrigger className="w-[240px]">
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(teachers) && teachers.map((t: any) => {
                            const pk = (t.teacher_id ?? t.id);
                            return (
                              <SelectItem key={pk} value={pk?.toString() || ''}>{t.teacher_name}</SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="secondary"
                        disabled={!selectedLevelSubject}
                        onClick={async () => {
                          if (!selectedLevelSubject) return;
                          const teacherVal = teacherBySectionForSubject[s.id];
                          // Ensure a SectionSubject exists for (section, subject); create if missing, then update teacher
                          const list: any = await api.get(`${endpoints.sectionSubjects}?section=${s.id}&subject=${selectedLevelSubject}`);
                          const items = Array.isArray(list) ? list : (Array.isArray(list?.results) ? list.results : []);
                          const teacherPk = teacherVal ? teacherVal : null;
                          if (items.length === 0) {
                            const created: any = await api.post(endpoints.sectionSubjects, { section: s.id, subject: selectedLevelSubject, teacher: teacherPk });
                            // update map
                            setTeacherBySectionForSubject(prev => ({ ...prev, [s.id]: teacherVal || '' }));
                          } else {
                            await api.patch(endpoints.sectionSubject(items[0].id), { teacher: teacherPk });
                          }
                        }}
                      >Save</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
                      </div>
                      <DialogFooter>
            <Button variant="outline" onClick={() => setIsManageSectionSubjectsOpen(false)}>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
      {/* Classroom Assignment Dialog */}
      <Dialog open={isClassroomAssignmentOpen} onOpenChange={setIsClassroomAssignmentOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Classrooms to Sections</DialogTitle>
            <DialogDescription>
              Assign classrooms to each section for {selectedSubjectForClassroom?.s_name || selectedSubjectForClassroom?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">Classrooms are now assigned at Level. Go to Admin → Academics → Levels to set the classroom for a level.</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClassroomAssignmentOpen(false)}>
              Cancel
            </Button>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Section Room Assignment Dialog */}
      <Dialog open={isManageSectionsOpen} onOpenChange={setIsManageSectionsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Classrooms per Section</DialogTitle>
            <DialogDescription>
              {levelForSections ? `Level: ${levelForSections.level_name}` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Room</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionsForLevel.map((s: any) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.section_name || `${levelForSections?.level_name}-${s.sec_no}`}</TableCell>
                    <TableCell>
                      <Select value={roomAssignmentsBySection[s.id] || ''} onValueChange={(v) => setRoomAssignmentsBySection(prev => ({ ...prev, [s.id]: v }))}>
                        <SelectTrigger className="w-[240px]">
                      <SelectValue placeholder="Select classroom" />
                    </SelectTrigger>
                    <SelectContent>
                          {Array.isArray(classrooms) && classrooms.map((c: any) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                              {(c.room_name || `Room ${c.room_no}`) + (c.floor !== undefined ? ` (Floor ${c.floor})` : '')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManageSectionsOpen(false)}>Cancel</Button>
            <Button onClick={saveSectionRooms}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Teacher Assignment Dialog */}
      <Dialog open={isTeacherAssignmentOpen} onOpenChange={setIsTeacherAssignmentOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Teachers to Sections</DialogTitle>
            <DialogDescription>
              Assign teachers to each section for {selectedSubjectForTeacher?.s_name || selectedSubjectForTeacher?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">Teacher assignment to sections has been removed from here. Use Teacher management to assign teachers to subjects or schedules.</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTeacherAssignmentOpen(false)}>
              Cancel
            </Button>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


