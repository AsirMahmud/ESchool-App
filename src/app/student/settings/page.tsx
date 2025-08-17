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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Bell,
  Download,
  Globe,
  Lock,
  Moon,
  Palette,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StudentSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="alex.johnson@student.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Campus Drive" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="College Town" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" defaultValue="90210" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>View your academic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Student ID</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    S12345678
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Program</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    Computer Science
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Academic Year</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    Sophomore
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Enrollment Date</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    September 2023
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Academic Advisor</Label>
                <div className="rounded-md border px-3 py-2 text-sm">
                  Dr. Sarah Williams (s.williams@school.edu)
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Academic Records
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language & Regional Settings</CardTitle>
              <CardDescription>
                Customize your language and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select defaultValue="12h">
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <Separator />
                {emailNotifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`email-${index}`}>
                        {notification.title}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <Switch
                      id={`email-${index}`}
                      defaultChecked={notification.enabled}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Push Notifications</h3>
                <Separator />
                {pushNotifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`push-${index}`}>
                        {notification.title}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <Switch
                      id={`push-${index}`}
                      defaultChecked={notification.enabled}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Disable All</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
              <CardDescription>
                Manage how we communicate with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {communicationPreferences.map((preference, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`comm-${index}`}>
                        {preference.title}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {preference.description}
                      </p>
                    </div>
                    <Switch
                      id={`comm-${index}`}
                      defaultChecked={preference.enabled}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Update Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="flex-1">
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Globe className="mr-2 h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex aspect-square items-center justify-center rounded-md border-2 border-primary bg-primary p-2">
                    <span className="sr-only">Default</span>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-[#1e40af] p-2">
                    <span className="sr-only">Blue</span>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-[#047857] p-2">
                    <span className="sr-only">Green</span>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-[#b91c1c] p-2">
                    <span className="sr-only">Red</span>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-[#7e22ce] p-2">
                    <span className="sr-only">Purple</span>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-[#0f172a] p-2">
                    <span className="sr-only">Dark</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Customize accessibility settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {accessibilitySettings.map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`access-${index}`}>{setting.title}</Label>
                      <p className="text-xs text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={`access-${index}`}
                      defaultChecked={setting.enabled}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Update Accessibility Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive a verification code via email or authenticator app
                    when signing in
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not Configured</AlertTitle>
                <AlertDescription>
                  Two-factor authentication is not set up yet. Click the button
                  below to get started.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Set Up Two-Factor Authentication
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {privacySettings.map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`privacy-${index}`}>
                        {setting.title}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={`privacy-${index}`}
                      defaultChecked={setting.enabled}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Privacy Policy
              </Button>
              <Button>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const emailNotifications = [
  {
    title: "Assignment Updates",
    description: "Receive emails when assignments are posted or graded",
    enabled: true,
  },
  {
    title: "Course Announcements",
    description: "Receive emails for important course announcements",
    enabled: true,
  },
  {
    title: "Grade Updates",
    description: "Receive emails when grades are posted",
    enabled: true,
  },
  {
    title: "Due Date Reminders",
    description: "Receive reminders for upcoming assignment due dates",
    enabled: true,
  },
  {
    title: "System Notifications",
    description: "Receive emails about system maintenance and updates",
    enabled: false,
  },
];

const pushNotifications = [
  {
    title: "Assignment Reminders",
    description: "Receive push notifications for upcoming assignments",
    enabled: true,
  },
  {
    title: "Grade Updates",
    description: "Receive push notifications when grades are posted",
    enabled: true,
  },
  {
    title: "Course Announcements",
    description:
      "Receive push notifications for important course announcements",
    enabled: false,
  },
  {
    title: "Messages",
    description: "Receive push notifications for new messages",
    enabled: true,
  },
];

const communicationPreferences = [
  {
    title: "Marketing Emails",
    description: "Receive emails about new courses and programs",
    enabled: false,
  },
  {
    title: "Newsletter",
    description:
      "Receive our monthly newsletter with educational tips and resources",
    enabled: true,
  },
  {
    title: "Event Invitations",
    description: "Receive invitations to campus events and webinars",
    enabled: true,
  },
  {
    title: "Research Surveys",
    description: "Participate in educational research surveys",
    enabled: false,
  },
];

const accessibilitySettings = [
  {
    title: "High Contrast Mode",
    description: "Increase contrast for better visibility",
    enabled: false,
  },
  {
    title: "Reduce Animations",
    description: "Minimize motion effects throughout the interface",
    enabled: false,
  },
  {
    title: "Screen Reader Optimization",
    description: "Optimize the interface for screen readers",
    enabled: false,
  },
];

const privacySettings = [
  {
    title: "Profile Visibility",
    description: "Allow other students to see your profile information",
    enabled: true,
  },
  {
    title: "Activity Status",
    description: "Show when you're online or last active",
    enabled: true,
  },
  {
    title: "Data Analytics",
    description:
      "Allow us to collect anonymous usage data to improve our services",
    enabled: true,
  },
  {
    title: "Third-Party Integrations",
    description: "Allow third-party services to access your account data",
    enabled: false,
  },
];
