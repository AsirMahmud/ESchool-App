// Sample event data
const events = [
  {
    id: 1,
    name: "Annual Science Fair",
    type: "academic",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "School Auditorium",
    coordinator: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    name: "Inter-School Basketball Tournament",
    type: "sports",
    date: "2024-03-20",
    time: "02:00 PM",
    location: "School Gymnasium",
    coordinator: "Coach Mike Wilson",
  },
  {
    id: 3,
    name: "Spring Cultural Festival",
    type: "cultural",
    date: "2024-04-05",
    time: "10:00 AM",
    location: "School Grounds",
    coordinator: "Ms. Emily Chen",
  },
  {
    id: 4,
    name: "Parent-Teacher Conference",
    type: "academic",
    date: "2024-04-12",
    time: "03:00 PM",
    location: "Multiple Classrooms",
    coordinator: "Principal Roberts",
  },
];

// Sample clubs data
const clubs = [
  {
    id: 1,
    name: "Science Club",
    category: "Academic",
    advisor: "Dr. Sarah Johnson",
    schedule: "Every Monday, 3:00 PM",
    members: 25,
  },
  {
    id: 2,
    name: "Drama Club",
    category: "Arts",
    advisor: "Ms. Emily Chen",
    schedule: "Every Wednesday, 3:30 PM",
    members: 20,
  },
  {
    id: 3,
    name: "Debate Club",
    category: "Academic",
    advisor: "Mr. James Wilson",
    schedule: "Every Tuesday, 3:00 PM",
    members: 15,
  },
];

// Sample sports teams data
const sportsTeams = [
  {
    id: 1,
    name: "Varsity Basketball",
    sport: "Basketball",
    coach: "Coach Mike Wilson",
    schedule: "Mon/Wed/Fri, 4:00 PM",
    members: 15,
  },
  {
    id: 2,
    name: "Junior Soccer",
    sport: "Soccer",
    coach: "Coach David Lee",
    schedule: "Tue/Thu, 3:30 PM",
    members: 18,
  },
  {
    id: 3,
    name: "Swimming Team",
    sport: "Swimming",
    coach: "Coach Sarah Thompson",
    schedule: "Mon/Thu, 3:00 PM",
    members: 12,
  },
];

// Sample participation records
const participationRecords = [
  {
    id: 1,
    student: "John Smith",
    class: "10A",
    activity: "Science Club",
    type: "Club",
    role: "Member",
    joined: "2023-09-01",
    status: "active",
  },
  {
    id: 2,
    student: "Emma Davis",
    class: "11B",
    activity: "Varsity Basketball",
    type: "Sports",
    role: "Team Captain",
    joined: "2023-08-15",
    status: "active",
  },
  {
    id: 3,
    student: "Michael Chang",
    class: "9C",
    activity: "Drama Club",
    type: "Club",
    role: "Member",
    joined: "2023-09-10",
    status: "inactive",
  },
];

// Helper function for event badge variants
const getEventBadgeVariant = (type: string) => {
  switch (type) {
    case "academic":
      return "default";
    case "sports":
      return "secondary";
    case "cultural":
      return "success";
    case "holiday":
      return "warning";
    default:
      return "outline";
  }
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Download,
  Filter,
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
  ArrowUpDown,
} from "lucide-react";

export default function AdminActivitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Activity Management
          </h2>
          <p className="text-muted-foreground">
            Manage school events, clubs, and extracurricular activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Activity
          </Button>
        </div>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Event Calendar</TabsTrigger>
          <TabsTrigger value="clubs">Clubs & Teams</TabsTrigger>
          <TabsTrigger value="participation">Participation</TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>School Events</CardTitle>
                  <CardDescription>
                    Manage and schedule school events
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                {/* Calendar component would go here */}
                <div className="text-center py-8 text-muted-foreground">
                  Calendar View Placeholder
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Upcoming Events</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Coordinator</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {event.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getEventBadgeVariant(event.type)}>
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.coordinator}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clubs & Teams Tab */}
        <TabsContent value="clubs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Clubs & Teams</CardTitle>
                  <CardDescription>
                    Manage school clubs and sports teams
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Club/Team
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="clubs" className="space-y-4">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="clubs">Clubs</TabsTrigger>
                  <TabsTrigger value="sports">Sports Teams</TabsTrigger>
                </TabsList>

                <TabsContent value="clubs">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Club Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Faculty Advisor</TableHead>
                        <TableHead>Meeting Schedule</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clubs.map((club) => (
                        <TableRow key={club.id}>
                          <TableCell className="font-medium">
                            {club.name}
                          </TableCell>
                          <TableCell>{club.category}</TableCell>
                          <TableCell>{club.advisor}</TableCell>
                          <TableCell>{club.schedule}</TableCell>
                          <TableCell>{club.members}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="sports">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Sport</TableHead>
                        <TableHead>Coach</TableHead>
                        <TableHead>Practice Schedule</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sportsTeams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">
                            {team.name}
                          </TableCell>
                          <TableCell>{team.sport}</TableCell>
                          <TableCell>{team.coach}</TableCell>
                          <TableCell>{team.schedule}</TableCell>
                          <TableCell>{team.members}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Participation Tab */}
        <TabsContent value="participation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Student Participation</CardTitle>
                  <CardDescription>
                    Track student participation in activities
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="clubs">Clubs</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participationRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.student}
                      </TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.activity}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.role}</TableCell>
                      <TableCell>{record.joined}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "active" ? "default" : "outline"
                          }
                        >
                          {record.status.charAt(0).toUpperCase() +
                            record.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {participationRecords.length} of 120 records
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
