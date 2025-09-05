"use client";

import { useState } from "react";
import { format, startOfWeek, endOfWeek, addDays, isToday } from "date-fns";
import {
  Calendar,
  Check,
  Clock,
  Download,
  Filter,
  Plus,
  Search,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
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
import { useAttendanceRecords, useBulkUpdateAttendance, useAttendanceSummary } from "@/hooks/use-attendance";
import { useTeacherClasses } from "@/hooks/use-teachers";
import { useStudents } from "@/hooks/use-students";

export default function TeacherAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>({});

  // Mock data - replace with actual API calls
  const { data: classes } = useTeacherClasses(1); // Replace with actual teacher ID
  const { data: students } = useStudents();
  
  const { data: attendanceRecords, isLoading } = useAttendanceRecords({
    date: format(selectedDate, 'yyyy-MM-dd'),
    class_room: selectedClass ? parseInt(selectedClass) : undefined,
  });

  const { data: attendanceSummary } = useAttendanceSummary({
    date: format(selectedDate, 'yyyy-MM-dd'),
    class_room: selectedClass ? parseInt(selectedClass) : undefined,
  });

  const bulkUpdateMutation = useBulkUpdateAttendance();

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleBulkSave = () => {
    const updates = Object.entries(attendanceData).map(([studentId, status]) => ({
      id: parseInt(studentId),
      status: status as 'present' | 'absent' | 'late' | 'excused'
    }));

    bulkUpdateMutation.mutate(updates, {
      onSuccess: () => {
        setIsBulkEditOpen(false);
        setAttendanceData({});
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <Check className="h-4 w-4" />;
      case 'absent': return <X className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      case 'excused': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(selectedDate), i);
    return {
      date,
      isToday: isToday(date),
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
                <p className="text-muted-foreground">
            Track and manage student attendance for your classes.
                </p>
              </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isBulkEditOpen} onOpenChange={setIsBulkEditOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Bulk Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Bulk Attendance Edit</DialogTitle>
                <DialogDescription>
                  Update attendance for multiple students at once.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="class-select">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
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
                  <div>
                    <Label htmlFor="subject-select">Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={format(selectedDate, 'yyyy-MM-dd')}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students?.slice(0, 10).map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.first_name} {student.last_name}</p>
                              <p className="text-xs text-muted-foreground">{student.student_id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={attendanceData[student.id.toString()] || 'present'}
                              onValueChange={(value) => handleAttendanceChange(student.id.toString(), value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="present">Present</SelectItem>
                                <SelectItem value="absent">Absent</SelectItem>
                                <SelectItem value="late">Late</SelectItem>
                                <SelectItem value="excused">Excused</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input placeholder="Add notes..." className="w-40" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBulkEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBulkSave} disabled={bulkUpdateMutation.isPending}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
              </div>
            </div>

      {/* Quick Stats */}
      {attendanceSummary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Students</p>
                  <p className="text-2xl font-bold">{attendanceSummary.total_students}</p>
                </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Present</p>
                  <p className="text-2xl font-bold">{attendanceSummary.present}</p>
                </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <X className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Absent</p>
                  <p className="text-2xl font-bold">{attendanceSummary.absent}</p>
                </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Attendance Rate</p>
                  <p className="text-2xl font-bold">{attendanceSummary.attendance_rate}%</p>
                </div>
                  </div>
                </CardContent>
              </Card>
            </div>
      )}

      <Tabs defaultValue="daily" className="space-y-4">
                <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

        <TabsContent value="daily" className="space-y-4">
                <Card>
                  <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Daily Attendance</CardTitle>
                        <CardDescription>
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                        </CardDescription>
                      </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(addDays(selectedDate, -1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Button>
                        <Button
                          variant="outline"
                          size="sm"
                    onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                        >
                    <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="class-filter">Filter by Class</Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="All classes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All classes</SelectItem>
                        {classes?.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id.toString()}>
                            {cls.class_room_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="search">Search Students</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search students..."
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Check-in Time</TableHead>
                          <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          Loading attendance records...
                        </TableCell>
                      </TableRow>
                    ) : attendanceRecords?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No attendance records found for this date.
                        </TableCell>
                      </TableRow>
                    ) : (
                      attendanceRecords?.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                {record.student_name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                            <div>
                              <p className="font-medium">{record.student_name}</p>
                              <p className="text-xs text-muted-foreground">{record.student_id}</p>
                              </div>
                            </TableCell>
                          <TableCell>{record.class_name}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(record.status)}
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </div>
                            </Badge>
                            </TableCell>
                          <TableCell>
                            {record.check_in_time ? format(new Date(record.check_in_time), 'HH:mm') : '-'}
                            </TableCell>
                            <TableCell>
                            {record.notes || '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            </TableCell>
                          </TableRow>
                      ))
                    )}
                      </TableBody>
                    </Table>
              </div>
                  </CardContent>
                </Card>
              </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
                <Card>
                  <CardHeader>
              <CardTitle>Weekly Attendance Overview</CardTitle>
                        <CardDescription>
                Week of {format(startOfWeek(selectedDate), 'MMM d')} - {format(endOfWeek(selectedDate), 'MMM d, yyyy')}
                        </CardDescription>
                  </CardHeader>
                  <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(addDays(selectedDate, -7))}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Current Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(addDays(selectedDate, 7))}
                  >
                    Next Week
                    <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>

                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day) => (
                    <div
                      key={day.date.toISOString()}
                      className={`p-3 rounded-lg border text-center ${
                        day.isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      <div className="text-sm font-medium">{day.dayName}</div>
                      <div className="text-lg font-bold">{day.dayNumber}</div>
                                    </div>
                  ))}
                    </div>

                <div className="text-center text-muted-foreground">
                  Weekly attendance grid will be implemented here
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

        <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
                  <CardDescription>
                Generate and view attendance reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">Daily Report</h3>
                        <p className="text-sm text-muted-foreground">Generate daily attendance report</p>
                      </div>
                  </div>
                    <Button className="w-full mt-4" size="sm">
                      Generate
                    </Button>
                </CardContent>
              </Card>

              <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-green-600" />
                          <div>
                        <h3 className="font-medium">Weekly Report</h3>
                        <p className="text-sm text-muted-foreground">Generate weekly attendance report</p>
                          </div>
                        </div>
                    <Button className="w-full mt-4" size="sm">
                      Generate
                          </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-purple-600" />
                      <div>
                        <h3 className="font-medium">Student Report</h3>
                        <p className="text-sm text-muted-foreground">Individual student attendance</p>
                        </div>
                      </div>
                    <Button className="w-full mt-4" size="sm">
                      Generate
                    </Button>
                  </CardContent>
                </Card>
                  </div>
                </CardContent>
              </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}