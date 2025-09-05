"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Edit,
  Calendar,
  MapPin,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  Award,
  Activity,
  BookOpen,
} from "lucide-react";

// Sample data - in real app, this would come from API
const activityData = {
  id: 1,
  name: "Science Club",
  type: "club",
  category: "Academic",
  description: "A club focused on exploring scientific concepts through hands-on experiments and discussions. We meet weekly to conduct experiments, discuss scientific topics, and prepare for science competitions.",
  advisor: "Dr. Sarah Johnson",
  schedule: "Every Monday, 3:00 PM",
  location: "Room 203",
  members: 25,
  maxMembers: 30,
  gradeLevel: "All Grades",
  requiresApproval: true,
  status: "active",
  createdDate: "2023-08-15",
  lastMeeting: "2024-01-15",
  nextMeeting: "2024-01-22",
};

const members = [
  {
    id: 1,
    name: "John Smith",
    class: "10A",
    role: "President",
    joinedDate: "2023-09-01",
    status: "active",
    email: "john.smith@school.edu",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Emma Davis",
    class: "11B",
    role: "Vice President",
    joinedDate: "2023-09-01",
    status: "active",
    email: "emma.davis@school.edu",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Michael Chang",
    class: "9C",
    role: "Member",
    joinedDate: "2023-09-10",
    status: "active",
    email: "michael.chang@school.edu",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    class: "10B",
    role: "Treasurer",
    joinedDate: "2023-09-15",
    status: "active",
    email: "sarah.wilson@school.edu",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 5,
    name: "David Brown",
    class: "11A",
    role: "Member",
    joinedDate: "2023-10-01",
    status: "inactive",
    email: "david.brown@school.edu",
    phone: "+1 (555) 567-8901",
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Chemistry Lab Experiment",
    date: "2024-01-15",
    description: "Conducted acid-base titration experiment",
    participants: 20,
  },
  {
    id: 2,
    title: "Science Fair Preparation",
    date: "2024-01-08",
    description: "Worked on project presentations",
    participants: 18,
  },
  {
    id: 3,
    title: "Guest Speaker Session",
    date: "2024-01-01",
    description: "Dr. Maria Garcia spoke about renewable energy",
    participants: 25,
  },
];

export default function ViewActivityPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-5 w-5" />;
      case "club":
        return <BookOpen className="h-5 w-5" />;
      case "team":
        return <Award className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {getActivityIcon(activityData.type)}
              {activityData.name}
            </h2>
            <p className="text-muted-foreground">
              {activityData.type.charAt(0).toUpperCase() + activityData.type.slice(1)} • {activityData.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(activityData.status)}>
            {activityData.status.charAt(0).toUpperCase() + activityData.status.slice(1)}
          </Badge>
          <Button
            onClick={() => router.push(`/admin/activities/${activityId}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Information</CardTitle>
              <CardDescription>
                Basic details about this activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{activityData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Advisor/Coach</p>
                    <p className="text-sm text-muted-foreground">{activityData.advisor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-sm text-muted-foreground">{activityData.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{activityData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Members</p>
                    <p className="text-sm text-muted-foreground">{activityData.members}/{activityData.maxMembers}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest activities and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.date} • {activity.participants} participants
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Members</span>
                <span className="text-2xl font-bold">{activityData.members}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Members</span>
                <span className="text-2xl font-bold">{members.filter(m => m.status === 'active').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Grade Level</span>
                <span className="text-sm">{activityData.gradeLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm">{activityData.createdDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Advisor Information */}
          <Card>
            <CardHeader>
              <CardTitle>Advisor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{activityData.advisor}</h4>
                  <p className="text-sm text-muted-foreground">Faculty Advisor</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-3 w-3" />
                    <span className="text-xs">sarah.johnson@school.edu</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>
            Current members of this activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.class}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.joinedDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
