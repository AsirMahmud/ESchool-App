import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Save,
  Bell,
  Mail,
  Lock,
  User,
  Building,
  Calendar,
  FileText,
} from "lucide-react";

export default function HRSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">HR Settings</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>
                Basic information about your school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input id="school-name" defaultValue="E-School Academy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-code">School Code</Label>
                  <Input id="school-code" defaultValue="ESA-2025" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-address">School Address</Label>
                <Textarea
                  id="school-address"
                  defaultValue="123 Education Lane, Learning City, LC 12345"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="school-phone">Phone Number</Label>
                  <Input id="school-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-email">Email Address</Label>
                  <Input id="school-email" defaultValue="info@eschool.edu" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>HR Department Settings</CardTitle>
              <CardDescription>
                Configure HR department preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hr-head">HR Department Head</Label>
                  <Input id="hr-head" defaultValue="Lisa Anderson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-email">HR Email Address</Label>
                  <Input id="hr-email" defaultValue="hr@eschool.edu" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                  <Select>
                    <SelectTrigger id="fiscal-year">
                      <SelectValue placeholder="July 1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan">January 1</SelectItem>
                      <SelectItem value="jul">July 1</SelectItem>
                      <SelectItem value="sep">September 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academic-year">Academic Year</Label>
                  <Select>
                    <SelectTrigger id="academic-year">
                      <SelectValue placeholder="2024-2025" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leave-policy">Default Leave Policy</Label>
                <Select>
                  <SelectTrigger id="leave-policy">
                    <SelectValue placeholder="Standard Leave Policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">
                      Standard Leave Policy
                    </SelectItem>
                    <SelectItem value="academic">
                      Academic Staff Policy
                    </SelectItem>
                    <SelectItem value="admin">
                      Administrative Staff Policy
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-leave">Leave Requests</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications for new leave requests
                    </p>
                  </div>
                  <Switch id="email-leave" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reviews">Performance Reviews</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications for scheduled reviews
                    </p>
                  </div>
                  <Switch id="email-reviews" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-training">Training Programs</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications for new training programs
                    </p>
                  </div>
                  <Switch id="email-training" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-policy">Policy Updates</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications for policy changes
                    </p>
                  </div>
                  <Switch id="email-policy" defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">System Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-leave">Leave Approvals</Label>
                    <p className="text-xs text-muted-foreground">
                      Show notifications for leave approvals/rejections
                    </p>
                  </div>
                  <Switch id="system-leave" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-reminders">Task Reminders</Label>
                    <p className="text-xs text-muted-foreground">
                      Show reminders for pending tasks
                    </p>
                  </div>
                  <Switch id="system-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-reports">Report Generation</Label>
                    <p className="text-xs text-muted-foreground">
                      Show notifications when reports are generated
                    </p>
                  </div>
                  <Switch id="system-reports" defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Schedule</h3>
                <div className="space-y-2">
                  <Label htmlFor="digest-frequency">
                    Email Digest Frequency
                  </Label>
                  <Select>
                    <SelectTrigger id="digest-frequency">
                      <SelectValue placeholder="Daily" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quiet-start" className="text-xs">
                        Start Time
                      </Label>
                      <Select>
                        <SelectTrigger id="quiet-start">
                          <SelectValue placeholder="6:00 PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4pm">4:00 PM</SelectItem>
                          <SelectItem value="5pm">5:00 PM</SelectItem>
                          <SelectItem value="6pm">6:00 PM</SelectItem>
                          <SelectItem value="7pm">7:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quiet-end" className="text-xs">
                        End Time
                      </Label>
                      <Select>
                        <SelectTrigger id="quiet-end">
                          <SelectValue placeholder="8:00 AM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6am">6:00 AM</SelectItem>
                          <SelectItem value="7am">7:00 AM</SelectItem>
                          <SelectItem value="8am">8:00 AM</SelectItem>
                          <SelectItem value="9am">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure access levels for different HR roles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">HR Administrator</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="admin-view-all" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="admin-view-all">
                        View All Employee Data
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Access to all employee records and information
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="admin-edit-all" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="admin-edit-all">
                        Edit All Employee Data
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Modify any employee record or information
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="admin-manage-roles" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="admin-manage-roles">
                        Manage Roles & Permissions
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Create and modify user roles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="admin-system-settings" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="admin-system-settings">
                        Modify System Settings
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Change global HR system configurations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">HR Manager</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="manager-view-dept" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="manager-view-dept">
                        View Department Data
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Access to assigned department employee records
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="manager-edit-dept" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="manager-edit-dept">
                        Edit Department Data
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Modify assigned department employee records
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="manager-approve-leave" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="manager-approve-leave">
                        Approve Leave Requests
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Review and approve leave applications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="manager-performance" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="manager-performance">
                        Manage Performance Reviews
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Create and conduct performance evaluations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">HR Staff</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="staff-view-basic" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="staff-view-basic">
                        View Basic Employee Data
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Access to non-sensitive employee information
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="staff-process-leave" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="staff-process-leave">
                        Process Leave Requests
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Record and track leave applications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="staff-generate-reports" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="staff-generate-reports">
                        Generate Reports
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Create standard HR reports
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="staff-training" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="staff-training">
                        Manage Training Records
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Update employee training information
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Department Access</CardTitle>
              <CardDescription>
                Configure which departments can access HR features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="access-admin" defaultChecked />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="access-admin">Administration</Label>
                    <p className="text-xs text-muted-foreground">
                      School administration department
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="access-faculty" defaultChecked />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="access-faculty">Faculty</Label>
                    <p className="text-xs text-muted-foreground">
                      Teaching staff department
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="access-finance" defaultChecked />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="access-finance">Finance</Label>
                    <p className="text-xs text-muted-foreground">
                      Financial management department
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="access-it" defaultChecked />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="access-it">IT Department</Label>
                    <p className="text-xs text-muted-foreground">
                      Information technology department
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="access-maintenance" defaultChecked />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="access-maintenance">Maintenance</Label>
                    <p className="text-xs text-muted-foreground">
                      Facilities and maintenance department
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="access-admission" defaultChecked />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="access-admission">Admission Office</Label>
                    <p className="text-xs text-muted-foreground">
                      Student admission department
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>
                Connect HR system with other school systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        School Calendar System
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Sync HR events with school calendar
                      </p>
                    </div>
                  </div>
                  <Switch id="calendar-integration" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Payroll System</h4>
                      <p className="text-xs text-muted-foreground">
                        Connect with school payroll system
                      </p>
                    </div>
                  </div>
                  <Switch id="payroll-integration" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Document Management
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Connect with document storage system
                      </p>
                    </div>
                  </div>
                  <Switch id="document-integration" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Student Information System
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Connect with student database
                      </p>
                    </div>
                  </div>
                  <Switch id="sis-integration" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">API Configuration</h3>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="api-key"
                      type="password"
                      value="••••••••••••••••••••••••••"
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used for external system integration
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    defaultValue="https://eschool.edu/api/hr/webhook"
                  />
                  <p className="text-xs text-muted-foreground">
                    Endpoint for receiving external system notifications
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Data Synchronization</h3>
                <div className="space-y-2">
                  <Label htmlFor="sync-frequency">Sync Frequency</Label>
                  <Select>
                    <SelectTrigger id="sync-frequency">
                      <SelectValue placeholder="Every 6 hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every hour</SelectItem>
                      <SelectItem value="6hours">Every 6 hours</SelectItem>
                      <SelectItem value="12hours">Every 12 hours</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-log">Sync Logging</Label>
                    <p className="text-xs text-muted-foreground">
                      Keep detailed logs of all synchronization activities
                    </p>
                  </div>
                  <Switch id="sync-log" defaultChecked />
                </div>
                <Button variant="outline" className="w-full">
                  Run Manual Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
              <CardDescription>
                Connect with external HR services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">
                      Email Marketing Service
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Connect with email campaign platform
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">
                      Background Check Service
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Connect with employee verification service
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">
                      SMS Notification Service
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Connect with text messaging service
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
