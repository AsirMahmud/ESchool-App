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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function AccountantSettings() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and financial system preferences.
        </p>
      </div>

      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Settings</CardTitle>
              <CardDescription>
                Configure financial system preferences and defaults.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Currency and Format</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="inr">INR (₹)</SelectItem>
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
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fee Settings</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="late-fee">Default Late Fee (%)</Label>
                    <Input id="late-fee" type="number" defaultValue="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grace-period">Grace Period (Days)</Label>
                    <Input id="grace-period" type="number" defaultValue="10" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-late-fee" />
                  <Label htmlFor="auto-late-fee">
                    Automatically apply late fees
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Invoice Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                  <Input id="invoice-prefix" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                  <Textarea
                    id="invoice-notes"
                    placeholder="Enter default notes to appear on all invoices"
                    className="min-h-[100px]"
                    defaultValue="Payment is due within 30 days. Please include the invoice number with your payment."
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-send-invoice" defaultChecked />
                  <Label htmlFor="auto-send-invoice">
                    Automatically send invoices when generated
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-payments">Payment Received</Label>
                    <Switch id="email-payments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-overdue">Overdue Payments</Label>
                    <Switch id="email-overdue" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-approvals">Pending Approvals</Label>
                    <Switch id="email-approvals" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reports">Financial Reports</Label>
                    <Switch id="email-reports" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-payments">Payment Received</Label>
                    <Switch id="system-payments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-overdue">Overdue Payments</Label>
                    <Switch id="system-overdue" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-approvals">Pending Approvals</Label>
                    <Switch id="system-approvals" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Schedule</h3>
                <div className="space-y-2">
                  <Label htmlFor="reminder-days">
                    Payment Reminder (Days Before Due)
                  </Label>
                  <Select defaultValue="7">
                    <SelectTrigger id="reminder-days">
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="5">5 days before</SelectItem>
                      <SelectItem value="7">7 days before</SelectItem>
                      <SelectItem value="14">14 days before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@school.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" defaultValue="Head Accountant" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup defaultValue="system" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system-wide settings and maintenance options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Backup Financial Data</p>
                      <p className="text-sm text-muted-foreground">
                        Create a backup of all financial records
                      </p>
                    </div>
                    <Button variant="outline">Create Backup</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Export Financial Reports</p>
                      <p className="text-sm text-muted-foreground">
                        Export all financial reports as spreadsheets
                      </p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Academic Year</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-year">Current Academic Year</Label>
                    <Select defaultValue="2022-2023">
                      <SelectTrigger id="current-year">
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2021-2022">2021-2022</SelectItem>
                        <SelectItem value="2022-2023">2022-2023</SelectItem>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                    <Select defaultValue="july">
                      <SelectTrigger id="fiscal-year">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="july">July</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Maintenance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Clear Cache</p>
                      <p className="text-sm text-muted-foreground">
                        Clear system cache to improve performance
                      </p>
                    </div>
                    <Button variant="outline">Clear Cache</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Information</p>
                      <p className="text-sm text-muted-foreground">
                        View detailed system information
                      </p>
                    </div>
                    <Button variant="outline">View Info</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
