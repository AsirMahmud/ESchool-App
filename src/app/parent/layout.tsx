import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  MessageSquare,
  DollarSign,
  Bell,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const metadata: Metadata = {
  title: "Parent Portal - School Management System",
  description:
    "Parent portal for monitoring student progress and school activities",
};

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = [
    { name: "Dashboard", href: "/parent/dashboard", icon: LayoutDashboard },
    { name: "Children", href: "/parent/children", icon: GraduationCap },
    { name: "Academics", href: "/parent/academics", icon: BookOpen },
    { name: "Schedule", href: "/parent/schedule", icon: Calendar },
    { name: "Reports", href: "/parent/reports", icon: FileText },
    { name: "Payments", href: "/parent/payments", icon: DollarSign },
    { name: "Messages", href: "/parent/messages", icon: MessageSquare },
    { name: "Settings", href: "/parent/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-background border-r p-4 hidden md:block">
        <div className="flex items-center gap-2 pb-4">
          <Image
            src="/placeholder.svg?height=30&width=30"
            alt="School Logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <span className="text-lg font-semibold">EduManage Pro</span>
        </div>
        <nav className="grid gap-2 text-lg font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-background flex items-center justify-between px-4 py-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:max-w-xs">
              <div className="flex items-center gap-2 pb-4 pt-2">
                <Image
                  src="/placeholder.svg?height=30&width=30"
                  alt="School Logo"
                  width={30}
                  height={30}
                  className="rounded-md"
                />
                <span className="text-lg font-semibold">EduManage Pro</span>
              </div>
              <nav className="grid gap-2 text-lg font-medium">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="/placeholder.svg?height=36&width=36"
                      alt="Parent"
                    />
                    <AvatarFallback>PJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Parent Johnson
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      parent@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 bg-muted/40 p-4">{children}</main>
      </div>
    </div>
  );
}
