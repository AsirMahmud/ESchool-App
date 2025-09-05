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
  Award,
  Trophy,
} from "lucide-react";

// Sample sports teams data
const sportsTeams = [
  {
    id: 1,
    name: "Varsity Basketball",
    sport: "Basketball",
    coach: "Coach Mike Wilson",
    schedule: "Mon/Wed/Fri, 4:00 PM",
    location: "School Gymnasium",
    members: 15,
    maxPlayers: 15,
    level: "Varsity",
    requiresTryout: true,
    status: "active",
    description: "Competitive basketball team for experienced players",
    season: "Winter",
    createdDate: "2023-08-15",
    lastPractice: "2024-01-19",
    wins: 8,
    losses: 2,
  },
  {
    id: 2,
    name: "Junior Soccer",
    sport: "Soccer",
    coach: "Coach David Lee",
    schedule: "Tue/Thu, 3:30 PM",
    location: "Soccer Field",
    members: 18,
    maxPlayers: 20,
    level: "Junior Varsity",
    requiresTryout: true,
    status: "active",
    description: "Development team for soccer players",
    season: "Fall",
    createdDate: "2023-07-01",
    lastPractice: "2024-01-18",
    wins: 5,
    losses: 3,
  },
  {
    id: 3,
    name: "Swimming Team",
    sport: "Swimming",
    coach: "Coach Sarah Thompson",
    schedule: "Mon/Thu, 3:00 PM",
    location: "School Pool",
    members: 12,
    maxPlayers: 15,
    level: "Varsity",
    requiresTryout: true,
    status: "active",
    description: "Competitive swimming team",
    season: "All Year",
    createdDate: "2023-08-01",
    lastPractice: "2024-01-18",
    wins: 6,
    losses: 1,
  },
  {
    id: 4,
    name: "Track & Field",
    sport: "Track & Field",
    coach: "Coach Robert Johnson",
    schedule: "Mon/Wed/Fri, 3:30 PM",
    location: "Track Field",
    members: 25,
    maxPlayers: 30,
    level: "All Levels",
    requiresTryout: false,
    status: "active",
    description: "Track and field events for all skill levels",
    season: "Spring",
    createdDate: "2023-09-01",
    lastPractice: "2024-01-19",
    wins: 4,
    losses: 2,
  },
  {
    id: 5,
    name: "Volleyball",
    sport: "Volleyball",
    coach: "Coach Maria Garcia",
    schedule: "Tue/Thu, 4:30 PM",
    location: "Gymnasium",
    members: 14,
    maxPlayers: 15,
    level: "Varsity",
    requiresTryout: true,
    status: "inactive",
    description: "Competitive volleyball team",
    season: "Fall",
    createdDate: "2023-08-20",
    lastPractice: "2023-11-15",
    wins: 3,
    losses: 4,
  },
];

const getSportBadgeVariant = (sport: string) => {
  switch (sport) {
    case "Basketball":
      return "default";
    case "Soccer":
      return "secondary";
    case "Swimming":
      return "outline";
    case "Track & Field":
      return "success";
    case "Volleyball":
      return "warning";
    default:
      return "outline";
  }
};

const getLevelBadgeVariant = (level: string) => {
  switch (level) {
    case "Varsity":
      return "default";
    case "Junior Varsity":
      return "secondary";
    case "Freshman":
      return "outline";
    case "All Levels":
      return "success";
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

export default function SportsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSport, setFilterSport] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTeams = sportsTeams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.coach.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport === "all" || team.sport === filterSport;
    const matchesLevel = filterLevel === "all" || team.level === filterLevel;
    const matchesStatus = filterStatus === "all" || team.status === filterStatus;
    return matchesSearch && matchesSport && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sports Teams Management</h2>
          <p className="text-muted-foreground">
            Manage sports teams, coaches, and athletic programs.
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
            New Team
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
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterSport} onValueChange={setFilterSport}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Soccer">Soccer</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
                <SelectItem value="Track & Field">Track & Field</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Varsity">Varsity</SelectItem>
                <SelectItem value="Junior Varsity">Junior Varsity</SelectItem>
                <SelectItem value="Freshman">Freshman</SelectItem>
                <SelectItem value="All Levels">All Levels</SelectItem>
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
          </div>
        </CardContent>
      </Card>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sports Teams ({filteredTeams.length})</CardTitle>
          <CardDescription>
            All sports teams and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Coach</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Players</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Record</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          <Award className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {team.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSportBadgeVariant(team.sport)}>
                      {team.sport}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{team.coach}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{team.schedule}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {team.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="font-medium">{team.members}</span>
                        <span className="text-muted-foreground">/{team.maxPlayers}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getLevelBadgeVariant(team.level)}>
                      {team.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium text-green-600">{team.wins}</span>
                      <span className="text-muted-foreground">-</span>
                      <span className="font-medium text-red-600">{team.losses}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant={getStatusBadgeVariant(team.status)}>
                        {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                      </Badge>
                      {team.requiresTryout && (
                        <Badge variant="outline" className="text-xs">
                          Tryout Required
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/activities/${team.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/activities/${team.id}/edit`)}
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

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Total Teams</h3>
                <p className="text-2xl font-bold">{sportsTeams.length}</p>
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
                <h3 className="font-semibold">Total Players</h3>
                <p className="text-2xl font-bold">
                  {sportsTeams.reduce((sum, team) => sum + team.members, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Total Wins</h3>
                <p className="text-2xl font-bold">
                  {sportsTeams.reduce((sum, team) => sum + team.wins, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Coaches</h3>
                <p className="text-2xl font-bold">
                  {new Set(sportsTeams.map(team => team.coach)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
