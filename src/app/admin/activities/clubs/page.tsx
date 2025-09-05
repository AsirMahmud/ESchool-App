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
  Clock,
  MapPin,
  User,
  BookOpen,
} from "lucide-react";

// Sample clubs data
const clubs = [
  {
    id: 1,
    name: "Science Club",
    category: "Academic",
    advisor: "Dr. Sarah Johnson",
    schedule: "Every Monday, 3:00 PM",
    location: "Room 203",
    members: 25,
    maxMembers: 30,
    gradeLevel: "All Grades",
    requiresApproval: true,
    status: "active",
    description: "A club focused on exploring scientific concepts through hands-on experiments",
    createdDate: "2023-08-15",
    lastMeeting: "2024-01-15",
  },
  {
    id: 2,
    name: "Drama Club",
    category: "Arts",
    advisor: "Ms. Emily Chen",
    schedule: "Every Wednesday, 3:30 PM",
    location: "Auditorium",
    members: 20,
    maxMembers: 25,
    gradeLevel: "High School",
    requiresApproval: false,
    status: "active",
    description: "Students explore acting, directing, and stage production",
    createdDate: "2023-09-01",
    lastMeeting: "2024-01-17",
  },
  {
    id: 3,
    name: "Debate Club",
    category: "Academic",
    advisor: "Mr. James Wilson",
    schedule: "Every Tuesday, 3:00 PM",
    location: "Library",
    members: 15,
    maxMembers: 20,
    gradeLevel: "High School",
    requiresApproval: true,
    status: "active",
    description: "Develop public speaking and critical thinking skills",
    createdDate: "2023-09-10",
    lastMeeting: "2024-01-16",
  },
  {
    id: 4,
    name: "Art Club",
    category: "Arts",
    advisor: "Ms. Lisa Rodriguez",
    schedule: "Every Thursday, 3:00 PM",
    location: "Art Room",
    members: 18,
    maxMembers: 25,
    gradeLevel: "All Grades",
    requiresApproval: false,
    status: "active",
    description: "Creative expression through various art forms",
    createdDate: "2023-08-20",
    lastMeeting: "2024-01-18",
  },
  {
    id: 5,
    name: "Math Olympiad",
    category: "Academic",
    advisor: "Dr. Michael Brown",
    schedule: "Every Friday, 2:30 PM",
    location: "Room 105",
    members: 12,
    maxMembers: 15,
    gradeLevel: "High School",
    requiresApproval: true,
    status: "inactive",
    description: "Advanced mathematics problem solving and competition preparation",
    createdDate: "2023-10-01",
    lastMeeting: "2023-12-15",
  },
];

const getCategoryBadgeVariant = (category: string) => {
  switch (category) {
    case "Academic":
      return "default";
    case "Arts":
      return "secondary";
    case "Technology":
      return "outline";
    case "Service":
      return "success";
    case "Sports":
      return "warning";
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

export default function ClubsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGradeLevel, setFilterGradeLevel] = useState("all");

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.advisor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || club.category === filterCategory;
    const matchesStatus = filterStatus === "all" || club.status === filterStatus;
    const matchesGradeLevel = filterGradeLevel === "all" || club.gradeLevel === filterGradeLevel;
    return matchesSearch && matchesCategory && matchesStatus && matchesGradeLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clubs Management</h2>
          <p className="text-muted-foreground">
            Manage student clubs and extracurricular activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => router.push('/admin/activities/add')}
          >
            <Plus className="h-4 w-4" />
            New Club
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
                  placeholder="Search clubs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
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
            <Select value={filterGradeLevel} onValueChange={setFilterGradeLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="All Grades">All Grades</SelectItem>
                <SelectItem value="Elementary">Elementary</SelectItem>
                <SelectItem value="Middle School">Middle School</SelectItem>
                <SelectItem value="High School">High School</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clubs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clubs ({filteredClubs.length})</CardTitle>
          <CardDescription>
            All student clubs and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Advisor</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Grade Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClubs.map((club) => (
                <TableRow key={club.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          <BookOpen className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{club.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {club.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(club.category)}>
                      {club.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{club.advisor}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{club.schedule}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {club.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="font-medium">{club.members}</span>
                        <span className="text-muted-foreground">/{club.maxMembers}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{club.gradeLevel}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant={getStatusBadgeVariant(club.status)}>
                        {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                      </Badge>
                      {club.requiresApproval && (
                        <Badge variant="outline" className="text-xs">
                          Approval Required
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/activities/${club.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/activities/${club.id}/edit`)}
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

      {/* Club Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Total Clubs</h3>
                <p className="text-2xl font-bold">{clubs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Active Members</h3>
                <p className="text-2xl font-bold">
                  {clubs.reduce((sum, club) => sum + club.members, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Faculty Advisors</h3>
                <p className="text-2xl font-bold">
                  {new Set(clubs.map(club => club.advisor)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Active Clubs</h3>
                <p className="text-2xl font-bold">
                  {clubs.filter(club => club.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
