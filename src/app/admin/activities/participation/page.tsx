"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Download,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  Activity,
  BookOpen,
  Award,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

// Sample participation records
const participationRecords = [
  {
    id: 1,
    student: "John Smith",
    class: "10A",
    studentId: "STU001",
    activity: "Science Club",
    activityType: "Club",
    role: "President",
    joinedDate: "2023-09-01",
    status: "active",
    email: "john.smith@school.edu",
    phone: "+1 (555) 123-4567",
    attendance: 95,
    lastActivity: "2024-01-15",
  },
  {
    id: 2,
    student: "Emma Davis",
    class: "11B",
    studentId: "STU002",
    activity: "Varsity Basketball",
    activityType: "Sports",
    role: "Team Captain",
    joinedDate: "2023-08-15",
    status: "active",
    email: "emma.davis@school.edu",
    phone: "+1 (555) 234-5678",
    attendance: 88,
    lastActivity: "2024-01-19",
  },
  {
    id: 3,
    student: "Michael Chang",
    class: "9C",
    studentId: "STU003",
    activity: "Drama Club",
    activityType: "Club",
    role: "Member",
    joinedDate: "2023-09-10",
    status: "inactive",
    email: "michael.chang@school.edu",
    phone: "+1 (555) 345-6789",
    attendance: 72,
    lastActivity: "2023-12-15",
  },
  {
    id: 4,
    student: "Sarah Wilson",
    class: "10B",
    studentId: "STU004",
    activity: "Art Club",
    activityType: "Club",
    role: "Treasurer",
    joinedDate: "2023-09-15",
    status: "active",
    email: "sarah.wilson@school.edu",
    phone: "+1 (555) 456-7890",
    attendance: 92,
    lastActivity: "2024-01-18",
  },
  {
    id: 5,
    student: "David Brown",
    class: "11A",
    studentId: "STU005",
    activity: "Debate Club",
    activityType: "Club",
    role: "Member",
    joinedDate: "2023-10-01",
    status: "active",
    email: "david.brown@school.edu",
    phone: "+1 (555) 567-8901",
    attendance: 85,
    lastActivity: "2024-01-16",
  },
  {
    id: 6,
    student: "Lisa Garcia",
    class: "12A",
    studentId: "STU006",
    activity: "Swimming Team",
    activityType: "Sports",
    role: "Member",
    joinedDate: "2023-08-20",
    status: "active",
    email: "lisa.garcia@school.edu",
    phone: "+1 (555) 678-9012",
    attendance: 90,
    lastActivity: "2024-01-18",
  },
];

const getActivityTypeIcon = (type: string) => {
  switch (type) {
    case "Club":
      return <BookOpen className="h-4 w-4" />;
    case "Sports":
      return <Award className="h-4 w-4" />;
    case "Event":
      return <Calendar className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getActivityTypeBadgeVariant = (type: string) => {
  switch (type) {
    case "Club":
      return "default";
    case "Sports":
      return "secondary";
    case "Event":
      return "outline";
    default:
      return "outline";
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "pending":
      return "outline";
    default:
      return "outline";
  }
};

const getAttendanceColor = (attendance: number) => {
  if (attendance >= 90) return "text-green-600";
  if (attendance >= 75) return "text-yellow-600";
  return "text-red-600";
};

export default function ParticipationPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActivity, setFilterActivity] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClass, setFilterClass] = useState("all");

  const filteredRecords = participationRecords.filter((record) => {
    const matchesSearch = record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActivity = filterActivity === "all" || record.activity === filterActivity;
    const matchesType = filterType === "all" || record.activityType === filterType;
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesClass = filterClass === "all" || record.class === filterClass;
    return matchesSearch && matchesActivity && matchesType && matchesStatus && matchesClass;
  });

  const uniqueActivities = [...new Set(participationRecords.map(record => record.activity))];
  const uniqueClasses = [...new Set(participationRecords.map(record => record.class))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Participation</h2>
          <p className="text-muted-foreground">
            Track student participation in activities, clubs, and sports.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => router.push('/admin/activities/participation/add')}
          >
            <Plus className="h-4 w-4" />
            Add Participation
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search students or activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterActivity} onValueChange={setFilterActivity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                {uniqueActivities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Club">Club</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map((classItem) => (
                  <SelectItem key={classItem} value={classItem}>
                    {classItem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Participation Table */}
      <Card>
        <CardHeader>
          <CardTitle>Participation Records ({filteredRecords.length})</CardTitle>
          <CardDescription>
            Student participation in various activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          {record.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.student}</p>
                        <p className="text-xs text-muted-foreground">{record.studentId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.class}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActivityTypeIcon(record.activityType)}
                      <span className="text-sm">{record.activity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActivityTypeBadgeVariant(record.activityType)}>
                      {record.activityType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{record.role}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{record.joinedDate}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getAttendanceColor(record.attendance)}`}>
                        {record.attendance}%
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            record.attendance >= 90 ? 'bg-green-500' : 
                            record.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${record.attendance}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(record.status)}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/activities/participation/${record.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/activities/participation/${record.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Participation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Total Participants</h3>
                <p className="text-2xl font-bold">{participationRecords.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Active Participants</h3>
                <p className="text-2xl font-bold">
                  {participationRecords.filter(record => record.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Club Members</h3>
                <p className="text-2xl font-bold">
                  {participationRecords.filter(record => record.activityType === 'Club').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Sports Members</h3>
                <p className="text-2xl font-bold">
                  {participationRecords.filter(record => record.activityType === 'Sports').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
