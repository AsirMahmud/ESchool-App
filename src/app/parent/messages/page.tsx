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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Send,
  Paperclip,
  User,
  Bell,
  Filter,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ParentMessages() {
  // Sample contacts data
  const contacts = [
    {
      id: 1,
      name: "Ms. Sarah Williams",
      role: "Class Teacher - 8A",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage:
        "Thank you for attending the parent-teacher meeting yesterday.",
      time: "2 hours ago",
      unread: false,
      online: true,
    },
    {
      id: 2,
      name: "Mr. James Anderson",
      role: "Class Teacher - 5C",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Noah has been doing great in mathematics this week.",
      time: "Yesterday",
      unread: true,
      online: false,
    },
    {
      id: 3,
      name: "Dr. Martinez",
      role: "Science Teacher",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage:
        "Emma's science project was outstanding. I'd like to discuss...",
      time: "2 days ago",
      unread: false,
      online: true,
    },
    {
      id: 4,
      name: "Mrs. Johnson",
      role: "History Teacher",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Please remind Emma to bring her history textbook tomorrow.",
      time: "3 days ago",
      unread: false,
      online: false,
    },
    {
      id: 5,
      name: "Principal Davis",
      role: "School Principal",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage:
        "We're looking forward to seeing you at the school event next week.",
      time: "1 week ago",
      unread: false,
      online: true,
    },
  ];

  // Sample conversation data
  const conversation = [
    {
      id: 1,
      sender: "Ms. Sarah Williams",
      senderRole: "Class Teacher - 8A",
      avatar: "/placeholder.svg?height=40&width=40",
      message:
        "Hello Mr. Johnson, I wanted to discuss Emma's recent progress in mathematics. She's been doing exceptionally well in algebra.",
      time: "May 10, 10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      message:
        "Thank you for letting me know. We've been practicing algebra at home. She seems to enjoy it a lot.",
      time: "May 10, 10:45 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Ms. Sarah Williams",
      senderRole: "Class Teacher - 8A",
      avatar: "/placeholder.svg?height=40&width=40",
      message:
        "That's great to hear! I'd like to recommend some additional resources that might challenge her further. She has a natural aptitude for mathematics.",
      time: "May 10, 11:00 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Me",
      message:
        "That would be very helpful. Emma has mentioned she'd like more challenging problems.",
      time: "May 10, 11:15 AM",
      isMe: true,
    },
    {
      id: 5,
      sender: "Ms. Sarah Williams",
      senderRole: "Class Teacher - 8A",
      avatar: "/placeholder.svg?height=40&width=40",
      message:
        "Perfect! I'll send over some resources by the end of the day. Also, I wanted to remind you about the upcoming mathematics competition. I think Emma should consider participating.",
      time: "May 10, 11:30 AM",
      isMe: false,
    },
    {
      id: 6,
      sender: "Me",
      message:
        "Thank you for the recommendation. We'll definitely discuss the competition with Emma. When is the registration deadline?",
      time: "May 10, 11:45 AM",
      isMe: true,
    },
    {
      id: 7,
      sender: "Ms. Sarah Williams",
      senderRole: "Class Teacher - 8A",
      avatar: "/placeholder.svg?height=40&width=40",
      message:
        "The registration deadline is May 20th. I'll send you the registration form along with the additional resources. Let me know if you have any other questions!",
      time: "May 10, 12:00 PM",
      isMe: false,
    },
    {
      id: 8,
      sender: "Me",
      message:
        "Thank you for attending the parent-teacher meeting yesterday. It was very informative and helpful to understand Emma's progress.",
      time: "Today, 10:15 AM",
      isMe: true,
    },
  ];

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      message:
        "Reminder: Parent-teacher meeting scheduled for tomorrow at 4:00 PM.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 2,
      title: "New Message",
      message:
        "You have a new message from Mr. James Anderson regarding Noah's progress.",
      time: "2 days ago",
      read: true,
    },
    {
      id: 3,
      title: "School Event",
      message:
        "Annual Sports Day is scheduled for May 25, 2025. Your presence is requested.",
      time: "3 days ago",
      read: true,
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with teachers and school staff
        </p>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Contacts</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search contacts..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between px-4 py-2 border-y bg-muted/50">
                  <div className="text-sm font-medium">
                    Recent Conversations
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </Button>
                </div>
                <div className="divide-y">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer ${
                        contact.id === 1 ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={contact.avatar}
                            alt={contact.name}
                          />
                          <AvatarFallback>
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate">
                            {contact.name}
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {contact.time}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {contact.role}
                        </div>
                        <div className="text-sm truncate mt-1">
                          {contact.lastMessage}
                        </div>
                      </div>
                      {contact.unread && (
                        <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={contacts[0].avatar}
                        alt={contacts[0].name}
                      />
                      <AvatarFallback>
                        {contacts[0].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{contacts[0].name}</CardTitle>
                      <CardDescription>{contacts[0].role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4" />
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-y bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                  Today, May 11, 2025
                </div>
                <div className="p-4 h-[400px] overflow-y-auto space-y-4">
                  {conversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.isMe ? "flex-row-reverse" : ""
                        }`}
                      >
                        {!message.isMe && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={message.avatar}
                              alt={message.sender}
                            />
                            <AvatarFallback>
                              {message.sender
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.isMe
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <div className="text-sm">{message.message}</div>
                          </div>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            {!message.isMe && (
                              <span className="font-medium mr-2">
                                {message.sender}
                              </span>
                            )}
                            <span>{message.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-3">
                <div className="flex items-end gap-2 w-full">
                  <Textarea
                    placeholder="Type your message..."
                    className="min-h-[80px] flex-1"
                  />
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Attach</span>
                    </Button>
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Notifications</CardTitle>
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-3 rounded-lg border ${
                      !notification.read
                        ? "bg-secondary/20 border-secondary"
                        : ""
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md ${
                        !notification.read ? "bg-secondary/30" : "bg-muted"
                      }`}
                    >
                      <Bell
                        className={`h-5 w-5 ${
                          !notification.read
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button variant="ghost" size="sm">
                        Mark as read
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing recent notifications
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium">Email Notifications</div>
                    <Select defaultValue="important">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All messages</SelectItem>
                        <SelectItem value="important">
                          Important only
                        </SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Message Notifications</div>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All messages</SelectItem>
                        <SelectItem value="mentions">Mentions only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">School Announcements</div>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All announcements</SelectItem>
                        <SelectItem value="important">
                          Important only
                        </SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Event Reminders</div>
                    <Select defaultValue="day">
                      <SelectTrigger>
                        <SelectValue placeholder="Select reminder time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">1 week before</SelectItem>
                        <SelectItem value="day">1 day before</SelectItem>
                        <SelectItem value="hour">1 hour before</SelectItem>
                        <SelectItem value="none">No reminders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
