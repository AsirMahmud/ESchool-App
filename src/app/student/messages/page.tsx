import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  FileText,
  Filter,
  MoreHorizontal,
  PaperclipIcon,
  Search,
  Send,
  Star,
  Trash,
  User,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StudentMessages() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">
            Communicate with teachers and classmates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            New Group
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid flex-1 gap-4 md:grid-cols-[300px_1fr]">
        <div className="flex flex-col border rounded-lg">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1">
            <div className="px-4 py-2 border-b">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="starred" className="flex-1">
                  Starred
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="px-4 py-2 border-b flex items-center justify-between">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="all" className="m-0">
                {conversations.map((conversation, index) => (
                  <ConversationItem
                    key={index}
                    conversation={conversation}
                    isActive={index === 0}
                  />
                ))}
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                {conversations
                  .filter((c) => c.unread)
                  .map((conversation, index) => (
                    <ConversationItem key={index} conversation={conversation} />
                  ))}
              </TabsContent>
              <TabsContent value="starred" className="m-0">
                {conversations
                  .filter((c) => c.starred)
                  .map((conversation, index) => (
                    <ConversationItem key={index} conversation={conversation} />
                  ))}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center border-b p-4">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Dr. Robert Johnson"
              />
              <AvatarFallback>RJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-base">Dr. Robert Johnson</CardTitle>
              <CardDescription>Mathematics Professor</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  <span>Star Conversation</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete Conversation</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            <div className="text-center text-xs text-muted-foreground">
              <Separator className="mb-2" />
              <span>Today</span>
              <Separator className="mt-2" />
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {message.sender !== "user" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Dr. Robert Johnson"
                      />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground ml-2"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                      {message.attachment && (
                        <div className="mt-2 flex items-center rounded-md bg-background/10 p-2 text-xs">
                          <FileText className="mr-2 h-4 w-4" />
                          <span className="flex-1 truncate">
                            {message.attachment}
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className={`mt-1 text-xs text-muted-foreground ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center space-x-2">
              <Button variant="outline" size="icon">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Input placeholder="Type your message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function ConversationItem({ conversation, isActive = false }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 ${
        isActive ? "bg-muted" : ""
      } ${conversation.unread ? "font-medium" : ""}`}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={conversation.avatar} alt={conversation.name} />
        <AvatarFallback>{conversation.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{conversation.name}</div>
          <div className="text-xs text-muted-foreground">
            {conversation.time}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm truncate text-muted-foreground">
            {conversation.lastMessage}
          </div>
          <div className="flex items-center">
            {conversation.starred && (
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
            )}
            {conversation.unread && (
              <Badge className="h-2 w-2 rounded-full p-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const conversations = [
  {
    name: "Dr. Robert Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    lastMessage: "Yes, I'll review your assignment draft tomorrow.",
    time: "10:42 AM",
    unread: true,
    starred: true,
  },
  {
    name: "Prof. Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
    lastMessage: "The lab report deadline has been extended to Friday.",
    time: "Yesterday",
    unread: true,
    starred: false,
  },
  {
    name: "Computer Science Study Group",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "CS",
    lastMessage: "Emily: Can someone share the notes from today's lecture?",
    time: "Yesterday",
    unread: false,
    starred: true,
  },
  {
    name: "Michael Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MT",
    lastMessage: "Thanks for helping with the project!",
    time: "Mar 24",
    unread: false,
    starred: false,
  },
  {
    name: "Academic Advisor",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AA",
    lastMessage: "Your course registration has been approved.",
    time: "Mar 22",
    unread: false,
    starred: false,
  },
  {
    name: "Emily Parker",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EP",
    lastMessage: "Are you going to the study session tonight?",
    time: "Mar 20",
    unread: false,
    starred: false,
  },
  {
    name: "David Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DC",
    lastMessage: "Can you send me the programming assignment instructions?",
    time: "Mar 18",
    unread: false,
    starred: false,
  },
];

const messages = [
  {
    sender: "other",
    content:
      "Hello Alex, I wanted to follow up on your question from class today about differential equations.",
    time: "10:30 AM",
  },
  {
    sender: "user",
    content:
      "Hi Dr. Johnson, thanks for reaching out. I was having trouble understanding the method for solving second-order differential equations.",
    time: "10:32 AM",
  },
  {
    sender: "other",
    content:
      "I understand. It can be challenging at first. Let me explain it in a different way that might help.",
    time: "10:35 AM",
  },
  {
    sender: "other",
    content:
      "For a second-order differential equation of the form ay'' + by' + cy = 0, we start by assuming a solution of the form y = e^(rx) and then solve for the values of r that make this work.",
    time: "10:36 AM",
  },
  {
    sender: "user",
    content:
      "That makes sense. So we substitute that solution into the original equation and solve for r?",
    time: "10:38 AM",
  },
  {
    sender: "other",
    content:
      "Exactly! When you substitute y = e^(rx), you'll get a characteristic equation ar^2 + br + c = 0. The solutions to this quadratic equation give you the values of r that you need.",
    time: "10:39 AM",
  },
  {
    sender: "other",
    content:
      "I've attached some additional examples that might help clarify the process.",
    time: "10:40 AM",
    attachment: "differential_equations_examples.pdf",
  },
  {
    sender: "user",
    content:
      "Thank you so much! This is really helpful. Would it be possible to go over one of these examples during your office hours tomorrow?",
    time: "10:42 AM",
  },
];
