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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditTeacherPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/admin/teachers/${params.id}/profile`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Teacher</h1>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update the teacher's personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    defaultValue="Sarah"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    defaultValue="Johnson"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    defaultValue="1985-06-15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue="female">
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="Nationality"
                    defaultValue="American"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select defaultValue="single">
                    <SelectTrigger id="maritalStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief biography"
                  className="min-h-32"
                  defaultValue="Sarah Johnson is an experienced mathematics teacher with over 10 years of teaching experience. She specializes in advanced calculus and statistics."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update the teacher's contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    defaultValue="sarah.johnson@school.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    defaultValue="+1 (555) 234-5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">
                    Emergency Contact Name
                  </Label>
                  <Input
                    id="emergencyContactName"
                    placeholder="Name"
                    defaultValue="Michael Johnson"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">
                    Emergency Contact Phone
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    placeholder="Phone number"
                    defaultValue="+1 (555) 987-6543"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Full address"
                  defaultValue="123 Education Street, Academic City, AC 12345"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    defaultValue="Academic City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="State/Province"
                    defaultValue="AC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip/Postal Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="Zip/Postal code"
                    defaultValue="12345"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Educational Background</CardTitle>
              <CardDescription>
                Update the teacher's educational qualifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="mb-4 font-medium">Degree 1</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="degree1">Degree/Qualification</Label>
                    <Input
                      id="degree1"
                      placeholder="Degree"
                      defaultValue="Ph.D. in Mathematics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution1">Institution</Label>
                    <Input
                      id="institution1"
                      placeholder="Institution"
                      defaultValue="University of Mathematics"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="yearFrom1">Year From</Label>
                    <Input
                      id="yearFrom1"
                      placeholder="Year"
                      defaultValue="2010"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearTo1">Year To</Label>
                    <Input
                      id="yearTo1"
                      placeholder="Year"
                      defaultValue="2015"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="mb-4 font-medium">Degree 2</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="degree2">Degree/Qualification</Label>
                    <Input
                      id="degree2"
                      placeholder="Degree"
                      defaultValue="M.Sc. in Applied Mathematics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution2">Institution</Label>
                    <Input
                      id="institution2"
                      placeholder="Institution"
                      defaultValue="State University"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="yearFrom2">Year From</Label>
                    <Input
                      id="yearFrom2"
                      placeholder="Year"
                      defaultValue="2008"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearTo2">Year To</Label>
                    <Input
                      id="yearTo2"
                      placeholder="Year"
                      defaultValue="2010"
                    />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Add Another Degree
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Update the teacher's professional certifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="mb-4 font-medium">Certification 1</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cert1">Certification Name</Label>
                    <Input
                      id="cert1"
                      placeholder="Certification"
                      defaultValue="Advanced Teaching Certification"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certIssuer1">Issuing Organization</Label>
                    <Input
                      id="certIssuer1"
                      placeholder="Organization"
                      defaultValue="National Teaching Board"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="certDate1">Date Issued</Label>
                    <Input
                      id="certDate1"
                      type="date"
                      defaultValue="2018-03-15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certExpiry1">
                      Expiry Date (if applicable)
                    </Label>
                    <Input
                      id="certExpiry1"
                      type="date"
                      defaultValue="2028-03-15"
                    />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Add Another Certification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
              <CardDescription>
                Update the teacher's employment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    placeholder="ID"
                    defaultValue={params.id}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="mathematics">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="physical-education">
                        Physical Education
                      </SelectItem>
                      <SelectItem value="computer-science">
                        Computer Science
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    placeholder="Position"
                    defaultValue="Senior Mathematics Teacher"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select defaultValue="full-time">
                    <SelectTrigger id="employmentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    defaultValue="2020-08-15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractEndDate">
                    Contract End Date (if applicable)
                  </Label>
                  <Input id="contractEndDate" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    placeholder="Salary"
                    defaultValue="65000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Employment Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects</Label>
                <Textarea
                  id="subjects"
                  placeholder="Enter subjects (comma separated)"
                  defaultValue="Algebra, Calculus, Statistics"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Employment</CardTitle>
              <CardDescription>
                Update the teacher's work history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="mb-4 font-medium">Previous Position 1</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prevPosition1">Position</Label>
                    <Input
                      id="prevPosition1"
                      placeholder="Position"
                      defaultValue="Senior Mathematics Teacher"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prevEmployer1">Employer</Label>
                    <Input
                      id="prevEmployer1"
                      placeholder="Employer"
                      defaultValue="Elite High School"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prevFrom1">From</Label>
                    <Input
                      id="prevFrom1"
                      type="date"
                      defaultValue="2015-09-01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prevTo1">To</Label>
                    <Input id="prevTo1" type="date" defaultValue="2020-08-01" />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Add Another Previous Position
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Manage the teacher's documents and files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV</Label>
                  <div className="flex items-center gap-4">
                    <Input id="resume" type="file" />
                    <Button variant="outline" size="sm">
                      View Current
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idProof">ID Proof</Label>
                  <div className="flex items-center gap-4">
                    <Input id="idProof" type="file" />
                    <Button variant="outline" size="sm">
                      View Current
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="educationCerts">
                    Educational Certificates
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input id="educationCerts" type="file" multiple />
                    <Button variant="outline" size="sm">
                      View Current
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teachingCerts">Teaching Certificates</Label>
                  <div className="flex items-center gap-4">
                    <Input id="teachingCerts" type="file" multiple />
                    <Button variant="outline" size="sm">
                      View Current
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherDocs">Other Documents</Label>
                  <div className="flex items-center gap-4">
                    <Input id="otherDocs" type="file" multiple />
                    <Button variant="outline" size="sm">
                      View Current
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Upload All Documents</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save All Changes</Button>
      </div>
    </div>
  );
}
