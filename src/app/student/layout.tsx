import type React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  BookOpen,
  Calendar,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <StudentSidebar />
        <div className="flex-1">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Student Portal</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Student"
                  />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function StudentSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-6">
        <Link
          href="/student/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <BookOpen className="h-6 w-6" />
          <span>E-School</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/classes">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Classes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/assignments">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Assignments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/grades">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Grades</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/schedule">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Schedule</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
