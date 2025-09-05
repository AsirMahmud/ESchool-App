"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, CalendarIcon } from "lucide-react";

export default function AddActivityPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [activityType, setActivityType] = useState<string>("event");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would normally save the data to your backend
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to activities page
      router.push("/admin/activities");
    } catch (error) {
      console.error("Error creating activity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderEventForm = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="event-name">Event Name *</Label>
          <Input id="event-name" placeholder="Annual Science Fair" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-type">Event Type *</Label>
          <Select>
            <SelectTrigger id="event-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="holiday">Holiday</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="event-date">Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-time">Time *</Label>
          <Input id="event-time" type="time" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="event-location">Location *</Label>
        <Input id="event-location" placeholder="School Auditorium" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="event-coordinator">Coordinator *</Label>
        <Input id="event-coordinator" placeholder="Dr. Sarah Johnson" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="event-description">Description</Label>
        <Textarea
          id="event-description"
          placeholder="Provide details about the event..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="event-capacity">Maximum Capacity</Label>
        <Input id="event-capacity" type="number" placeholder="100" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="event-requires-registration" />
        <Label htmlFor="event-requires-registration">Requires Registration</Label>
      </div>
    </>
  );

  const renderClubForm = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="club-name">Club Name *</Label>
          <Input id="club-name" placeholder="Science Club" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="club-category">Category *</Label>
          <Select>
            <SelectTrigger id="club-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="service">Community Service</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="club-advisor">Faculty Advisor *</Label>
        <Input id="club-advisor" placeholder="Dr. Sarah Johnson" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="club-schedule">Meeting Schedule *</Label>
          <Input id="club-schedule" placeholder="Every Monday, 3:00 PM" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="club-location">Meeting Location *</Label>
          <Input id="club-location" placeholder="Room 203" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="club-description">Description</Label>
        <Textarea
          id="club-description"
          placeholder="Provide details about the club, its activities and goals..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="club-max-members">Maximum Members</Label>
          <Input id="club-max-members" type="number" placeholder="30" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="club-grade-level">Grade Level</Label>
          <Select>
            <SelectTrigger id="club-grade-level">
              <SelectValue placeholder="Select grade level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="elementary">Elementary (1-5)</SelectItem>
              <SelectItem value="middle">Middle School (6-8)</SelectItem>
              <SelectItem value="high">High School (9-12)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="club-requires-approval" />
        <Label htmlFor="club-requires-approval">Requires Approval to Join</Label>
      </div>
    </>
  );

  const renderTeamForm = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="team-name">Team Name *</Label>
          <Input id="team-name" placeholder="Varsity Basketball" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="team-sport">Sport *</Label>
          <Select>
            <SelectTrigger id="team-sport">
              <SelectValue placeholder="Select sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="soccer">Soccer</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="volleyball">Volleyball</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="swimming">Swimming</SelectItem>
              <SelectItem value="track">Track & Field</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-coach">Coach *</Label>
        <Input id="team-coach" placeholder="Coach Mike Wilson" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="team-schedule">Practice Schedule *</Label>
          <Input id="team-schedule" placeholder="Mon/Wed/Fri, 4:00 PM" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="team-location">Practice Location *</Label>
          <Input id="team-location" placeholder="School Gymnasium" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-description">Description</Label>
        <Textarea
          id="team-description"
          placeholder="Provide details about the team, requirements, tryouts, etc..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="team-max-players">Maximum Players</Label>
          <Input id="team-max-players" type="number" placeholder="15" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="team-level">Team Level</Label>
          <Select>
            <SelectTrigger id="team-level">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="varsity">Varsity</SelectItem>
              <SelectItem value="junior-varsity">Junior Varsity</SelectItem>
              <SelectItem value="freshman">Freshman</SelectItem>
              <SelectItem value="recreational">Recreational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="team-requires-tryout" />
        <Label htmlFor="team-requires-tryout">Requires Tryout</Label>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Activity</h2>
        <p className="text-muted-foreground">
          Create a new school event, club, or sports team.
        </p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Activity Details</CardTitle>
          <CardDescription>
            Enter the details for the new activity you want to create.
          </CardDescription>

          <div className="flex items-center space-x-2 mt-4">
            <Button
              variant={activityType === "event" ? "default" : "outline"}
              onClick={() => setActivityType("event")}
              className="w-full"
            >
              Event
            </Button>
            <Button
              variant={activityType === "club" ? "default" : "outline"}
              onClick={() => setActivityType("club")}
              className="w-full"
            >
              Club
            </Button>
            <Button
              variant={activityType === "team" ? "default" : "outline"}
              onClick={() => setActivityType("team")}
              className="w-full"
            >
              Sports Team
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {activityType === "event" && renderEventForm()}
            {activityType === "club" && renderClubForm()}
            {activityType === "team" && renderTeamForm()}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Activity"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
