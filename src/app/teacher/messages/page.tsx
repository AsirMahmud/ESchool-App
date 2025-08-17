"use client";

import { useState } from "react";
import {
  Archive,
  AtSign,
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  Filter,
  GraduationCap,
  Grid,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  Smile,
  Star,
  Sun,
  User,
  Users,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Menu icon component
const MenuIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

// Sidebar items
const sidebarItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/teacher/dashboard",
  },
  {
    title: "Classes",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/teacher/classes",
  },
  {
    title: "Students",
    icon: <Users className="h-5 w-5" />,
    href: "/teacher/students",
  },
  {
    title: "Attendees",
    icon: <Check className="h-5 w-5" />,
    href: "/teacher/attendees",
  },
  {
    title: "Grades",
    icon: <FileText className="h-5 w-5" />,
    href: "/teacher/grades",
  },
  {
    title: "Schedule",
    icon: <Calendar className="h-5 w-5" />,
    href: "/teacher/schedule",
  },
  {
    title: "Resources",
    icon: <Grid className="h-5 w-5" />,
    href: "/teacher/resources",
  },
  {
    title: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/teacher/messages",
  },
  {
    title: "Profile",
    icon: <User className="h-5 w-5" />,
    href: "/teacher/profile",
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/teacher/settings",
  },
];

// Sample messages data
const generateMessages = () => {
  const contacts = [
    { id: 1, name: "Emma Johnson", role: "Student", avatar: "EJ", unread: 2 },
    { id: 2, name: "Michael Chen", role: "Parent", avatar: "MC", unread: 0 },
    { id: 3, name: "Sarah Williams", role: "Teacher", avatar: "SW", unread: 0 },
    {
      id: 4,
      name: "Principal Roberts",
      role: "Admin",
      avatar: "PR",
      unread: 1,
    },
    { id: 5, name: "David Thompson", role: "Parent", avatar: "DT", unread: 0 },
    { id: 6, name: "Olivia Brown", role: "Student", avatar: "OB", unread: 0 },
    { id: 7, name: "James Anderson", role: "Student", avatar: "JA", unread: 0 },
    { id: 8, name: "Lisa Martinez", role: "Teacher", avatar: "LM", unread: 0 },
    { id: 9, name: "Robert Johnson", role: "Parent", avatar: "RJ", unread: 0 },
    { id: 10, name: "Jennifer Lee", role: "Admin", avatar: "JL", unread: 0 },
  ];

  const conversations = contacts.map((contact) => {
    const messages = [];
    const messageCount = Math.floor(Math.random() * 10) + 1;

    const today = new Date();
    let messageDate = new Date(today);
    messageDate.setDate(today.getDate() - Math.floor(Math.random() * 7));

    for (let i = 0; i < messageCount; i++) {
      const isFromMe = Math.random() > 0.5;

      // Add some time between messages
      messageDate = new Date(
        messageDate.getTime() + Math.floor(Math.random() * 3600000)
      );

      messages.push({
        id: `msg-${contact.id}-${i}`,
        sender: isFromMe ? "me" : contact.id,
        content: getRandomMessage(isFromMe, contact.role),
        timestamp: messageDate.toISOString(),
        read: isFromMe || Math.random() > 0.3,
        attachments:
          Math.random() > 0.8
            ? [{ name: "document.pdf", size: "2.4 MB", type: "pdf" }]
            : [],
      });
    }

    return {
      id: `conv-${contact.id}`,
      contact,
      messages,
      lastMessageDate: messages[messages.length - 1].timestamp,
      starred: Math.random() > 0.7,
      archived: Math.random() > 0.8,
    };
  });

  return {
    contacts,
    conversations: conversations.sort(
      (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
    ),
  };
};

// Helper function to generate random message content
const getRandomMessage = (isFromMe, role) => {
  const teacherMessages = [
    "I wanted to discuss your recent assignment submission.",
    "Here's the study guide for the upcoming exam.",
    "Could we schedule a meeting to discuss your progress?",
    "I've posted new resources for the next unit.",
    "Great job on your recent project!",
    "Please remember to complete the online quiz by Friday.",
    "I've updated the due date for the lab report.",
    "Let me know if you have any questions about the homework.",
    "Your presentation yesterday was excellent.",
    "I've shared feedback on your essay in the comments.",
  ];

  const studentMessages = [
    "I have a question about the homework assignment.",
    "Will we need to bring our textbooks to class tomorrow?",
    "I'm having trouble understanding the concept from today's lesson.",
    "Could I get an extension on the project deadline?",
    "I'll be absent tomorrow due to a doctor's appointment.",
    "Thank you for the feedback on my essay.",
    "Could you explain the formula we covered in class again?",
    "I've submitted my assignment through the portal.",
    "When will the test results be available?",
    "Can I schedule a time to meet with you during office hours?",
  ];

  const parentMessages = [
    "I'd like to discuss my child's progress in your class.",
    "Will there be a parent-teacher conference this semester?",
    "My child will be absent next week due to a family event.",
    "Thank you for the detailed feedback on my child's project.",
    "Could you recommend any additional resources for my child?",
    "I'm concerned about my child's recent test scores.",
    "Is there any extra credit work available?",
    "My child mentioned a field trip coming up. Could you provide details?",
    "How can I help my child prepare for the upcoming exam?",
    "I appreciate your dedication to teaching.",
  ];

  const adminMessages = [
    "Please submit your quarterly assessment reports by Friday.",
    "There will be a faculty meeting next Tuesday at 3:30 PM.",
    "The professional development workshop has been rescheduled.",
    "Could you provide your classroom supply requests for next semester?",
    "Thank you for volunteering to chaperone the school dance.",
    "We're updating the curriculum guidelines. Your input would be valuable.",
    "The school board has approved the new technology budget.",
    "Please review the updated emergency procedures document.",
    "Congratulations on your students' excellent test scores.",
    "We're implementing a new grading system next semester.",
  ];

  if (isFromMe) {
    return [
      "Thank you for reaching out. I'll look into this.",
      "I'm available to meet on Tuesday or Thursday afternoon.",
      "I've attached the document you requested.",
      "Let me know if you need any additional information.",
      "I'll address this in our next class session.",
      "The deadline for the assignment is next Friday.",
      "I've posted additional resources on the class portal.",
      "Please submit your work through the online system.",
      "I'm happy to provide extra help during office hours.",
      "I've reviewed your submission and provided feedback.",
    ][Math.floor(Math.random() * 10)];
  }

  switch (role) {
    case "Student":
      return studentMessages[
        Math.floor(Math.random() * studentMessages.length)
      ];
    case "Parent":
      return parentMessages[Math.floor(Math.random() * parentMessages.length)];
    case "Admin":
      return adminMessages[Math.floor(Math.random() * adminMessages.length)];
    case "Teacher":
      return teacherMessages[
        Math.floor(Math.random() * teacherMessages.length)
      ];
    default:
      return "Hello, how are you?";
  }
};

// Format date for messages
const formatMessageDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // Today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // This week
  const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (daysDiff < 7) {
    return date.toLocaleDateString([], { weekday: "long" });
  }

  // Older
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

// Generate message data
const messageData = generateMessages();

export default function TeacherMessagesPage() {
  const [theme, setTheme] = useState("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState(messageData.conversations);
  const [contacts, setContacts] = useState(messageData.contacts);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isMobileConversationOpen, setIsMobileConversationOpen] =
    useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Filter conversations based on search query and selected filter
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.contact.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conversation.messages.some((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (selectedFilter === "all") {
      return matchesSearch && !conversation.archived;
    } else if (selectedFilter === "unread") {
      return (
        matchesSearch &&
        conversation.messages.some((msg) => !msg.read && msg.sender !== "me") &&
        !conversation.archived
      );
    } else if (selectedFilter === "starred") {
      return matchesSearch && conversation.starred && !conversation.archived;
    } else if (selectedFilter === "archived") {
      return matchesSearch && conversation.archived;
    }

    return matchesSearch && !conversation.archived;
  });

  // Get the selected conversation details
  const currentConversation = selectedConversation
    ? conversations.find((conv) => conv.id === selectedConversation)
    : null;

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim() || !currentConversation) return;

    const newMessage = {
      id: `msg-new-${Date.now()}`,
      sender: "me",
      content: messageText,
      timestamp: new Date().toISOString(),
      read: true,
      attachments: [],
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === currentConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessageDate: newMessage.timestamp,
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setMessageText("");
  };

  // Mark conversation as read
  const markAsRead = (conversationId) => {
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: conv.messages.map((msg) => ({
            ...msg,
            read: true,
          })),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
  };

  // Toggle starred status
  const toggleStarred = (conversationId) => {
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          starred: !conv.starred,
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
  };

  // Toggle archived status
  const toggleArchived = (conversationId) => {
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          archived: !conv.archived,
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    markAsRead(conversationId);
    setIsMobileConversationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pr-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 border-b p-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Brightwood Academy</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-auto py-2">
                <div className="flex flex-col gap-1 px-2">
                  {sidebarItems.map((item) => (
                    <Button
                      key={item.title}
                      variant={
                        item.title === "Messages" ? "secondary" : "ghost"
                      }
                      className="justify-start gap-2"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary hidden md:block" />
          <span className="text-xl font-bold hidden md:block">
            Brightwood Academy
          </span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Teacher"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">John Smith</div>
                  <div className="text-xs text-muted-foreground">
                    Science Teacher
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/teacher/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/teacher/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
          <nav className="flex-1 overflow-auto py-4">
            <div className="flex flex-col gap-1 px-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.title === "Messages" ? "secondary" : "ghost"}
                  className="justify-start gap-2"
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col md:flex-row">
          {/* Conversation list */}
          <div
            className={`w-full md:w-80 border-r ${
              isMobileConversationOpen ? "hidden md:block" : "block"
            }`}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Messages</h1>
                <Dialog
                  open={isNewMessageOpen}
                  onOpenChange={setIsNewMessageOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Message</DialogTitle>
                      <DialogDescription>
                        Compose a new message to students, parents, or
                        colleagues
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient">To</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all_students">
                              All Students
                            </SelectItem>
                            <SelectItem value="all_parents">
                              All Parents
                            </SelectItem>
                            <SelectItem value="physics101">
                              Physics 101 Class
                            </SelectItem>
                            <SelectItem value="physics102">
                              Physics 102 Class
                            </SelectItem>
                            <SelectItem value="chemistry101">
                              Chemistry 101 Class
                            </SelectItem>
                            {contacts.map((contact) => (
                              <SelectItem
                                key={contact.id}
                                value={`contact_${contact.id}`}
                              >
                                {contact.name} ({contact.role})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Enter message subject"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Type your message here"
                          className="min-h-[150px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Attachments</Label>
                        <div className="border-2 border-dashed rounded-md p-4 text-center">
                          <Paperclip className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium mb-1">
                            Drag and drop files here
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Or click to browse
                          </p>
                          <Button variant="outline" size="sm">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsNewMessageOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setIsNewMessageOpen(false)}>
                        Send Message
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <Select
                  value={selectedFilter}
                  onValueChange={setSelectedFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter messages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="starred">Starred</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-13rem)]">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <Inbox className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No messages found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery
                      ? "Try a different search term"
                      : "Your inbox is empty"}
                  </p>
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const lastMessage =
                    conversation.messages[conversation.messages.length - 1];
                  const unreadCount = conversation.messages.filter(
                    (msg) => !msg.read && msg.sender !== "me"
                  ).length;

                  return (
                    <div
                      key={conversation.id}
                      className={`flex items-start gap-3 p-4 border-b cursor-pointer hover:bg-muted/50 ${
                        selectedConversation === conversation.id
                          ? "bg-muted"
                          : ""
                      } ${unreadCount > 0 ? "bg-primary/5" : ""}`}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      <Avatar>
                        <AvatarFallback>
                          {conversation.contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">
                            {conversation.contact.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatMessageDate(lastMessage.timestamp)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {conversation.contact.role}
                          </Badge>
                          {conversation.starred && (
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground truncate mt-1">
                          {lastMessage.sender === "me" ? "You: " : ""}
                          {lastMessage.content}
                        </div>
                      </div>
                      {unreadCount > 0 && (
                        <Badge className="ml-2">{unreadCount}</Badge>
                      )}
                    </div>
                  );
                })
              )}
            </ScrollArea>
          </div>

          {/* Conversation view */}
          {currentConversation ? (
            <div
              className={`flex-1 flex flex-col ${
                isMobileConversationOpen ? "block" : "hidden md:flex"
              }`}
            >
              {/* Conversation header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileConversationOpen(false)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar>
                    <AvatarFallback>
                      {currentConversation.contact.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {currentConversation.contact.name}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Badge variant="outline" className="text-xs font-normal">
                        {currentConversation.contact.role}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleStarred(currentConversation.id)}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              currentConversation.starred
                                ? "text-amber-500 fill-amber-500"
                                : ""
                            }`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{currentConversation.starred ? "Unstar" : "Star"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleArchived(currentConversation.id)}
                        >
                          <Archive className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {currentConversation.archived
                            ? "Unarchive"
                            : "Archive"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                      <DropdownMenuItem>Mute conversation</DropdownMenuItem>
                      <DropdownMenuItem>Block contact</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentConversation.messages.map((message, index) => {
                    const isFromMe = message.sender === "me";
                    const showDate =
                      index === 0 ||
                      new Date(message.timestamp).toDateString() !==
                        new Date(
                          currentConversation.messages[index - 1].timestamp
                        ).toDateString();

                    return (
                      <div key={message.id} className="space-y-2">
                        {showDate && (
                          <div className="flex items-center justify-center my-4">
                            <div className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
                              {new Date(message.timestamp).toLocaleDateString(
                                [],
                                {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        )}
                        <div
                          className={`flex ${
                            isFromMe ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex gap-2 max-w-[80%] ${
                              isFromMe ? "flex-row-reverse" : ""
                            }`}
                          >
                            {!isFromMe && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {currentConversation.contact.avatar}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  isFromMe
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                {message.content}
                                {message.attachments.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-primary-foreground/20">
                                    {message.attachments.map(
                                      (attachment, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center gap-2 text-sm rounded-md p-2 bg-background/20"
                                        >
                                          <Paperclip className="h-4 w-4" />
                                          <span>{attachment.name}</span>
                                          <span className="text-xs opacity-70">
                                            {attachment.size}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <span>
                                  {new Date(
                                    message.timestamp
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {isFromMe && (
                                  <Check
                                    className={`h-3 w-3 ml-1 ${
                                      message.read ? "text-primary" : ""
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type a message..."
                      className="min-h-[80px] resize-none"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Attach file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Attach image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Smile className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add emoji</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <AtSign className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mention</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 text-center">
              <div>
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">
                  No conversation selected
                </h2>
                <p className="text-muted-foreground mb-4">
                  Select a conversation from the list or start a new one
                </p>
                <Button onClick={() => setIsNewMessageOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
