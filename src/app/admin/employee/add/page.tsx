import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditStudentPage({
  params,
}: {
  params: { id: string };
}) {
  // This would normally be fetched from an API
  const student = {
    id: params.id,
    name: "Emma Johnson",
    firstName: "Emma",
    lastName: "Johnson",
    studentId: "S2025-001",
    grade: "Grade 10",
    section: "A",
    dateOfBirth: "2008-05-15",
    gender: "Female",
    address: "123 School Lane, Cityville, State 12345",
    email: "emma.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    parentName: "Robert & Sarah Johnson",
    parentEmail: "rjohnson@example.com",
    parentPhone: "+1 (555) 987-6543",
    enrollmentDate: "2020-09-01",
    status: "Active",
    bloodGroup: "O+",
    emergencyContact: "Sarah Johnson (+1 555-987-6543)",
    medicalConditions:
      "Mild asthma, requires inhaler during physical activities",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/students/${params.id}/profile`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Student</h1>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
          <TabsTrigger value="academic">Academic Details</TabsTrigger>
          <TabsTrigger value="medical">Medical Information</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>
                Update the student's personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={student.firstName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={student.lastName} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" defaultValue={student.studentId} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    defaultValue={student.dateOfBirth}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue={student.gender.toLowerCase()}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select defaultValue={student.bloodGroup}>
                    <SelectTrigger id="bloodGroup">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue={student.address} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update the student's and parent's contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Student Email</Label>
                <Input id="email" type="email" defaultValue={student.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Student Phone</Label>
                <Input id="phone" defaultValue={student.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input id="parentName" defaultValue={student.parentName} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    defaultValue={student.parentEmail}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                  <Input id="parentPhone" defaultValue={student.parentPhone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  defaultValue={student.emergencyContact}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Update the student's academic details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Class</Label>
                  <Select
                    defaultValue={student.grade.replace("Grade ", "grade")}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade1">Grade 1</SelectItem>
                      <SelectItem value="grade2">Grade 2</SelectItem>
                      <SelectItem value="grade3">Grade 3</SelectItem>
                      <SelectItem value="grade4">Grade 4</SelectItem>
                      <SelectItem value="grade5">Grade 5</SelectItem>
                      <SelectItem value="grade6">Grade 6</SelectItem>
                      <SelectItem value="grade7">Grade 7</SelectItem>
                      <SelectItem value="grade8">Grade 8</SelectItem>
                      <SelectItem value="grade9">Grade 9</SelectItem>
                      <SelectItem value="grade10">Grade 10</SelectItem>
                      <SelectItem value="grade11">Grade 11</SelectItem>
                      <SelectItem value="grade12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select defaultValue={student.section.toLowerCase()}>
                    <SelectTrigger id="section">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">Section A</SelectItem>
                      <SelectItem value="b">Section B</SelectItem>
                      <SelectItem value="c">Section C</SelectItem>
                      <SelectItem value="d">Section D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                  <Input
                    id="enrollmentDate"
                    type="date"
                    defaultValue={student.enrollmentDate}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={student.status.toLowerCase()}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>
                Update the student's medical details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Textarea
                  id="medicalConditions"
                  defaultValue={student.medicalConditions}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  placeholder="List any allergies the student has"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="List any medications the student is taking"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
          <CardDescription>
            Any other relevant information about the student
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter any additional notes or comments about the student"
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/admin/students/${params.id}/profile`}>Cancel</Link>
          </Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
