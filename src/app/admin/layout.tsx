import { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  BookOpen,
  DollarSign,
  Award,
  Activity,
  User2,
  School,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },

    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Finance",
      href: "/admin/finance",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Teachers",
      href: "/admin/teachers",
    },
    {
      icon: <School className="h-5 w-5" />,
      label: "Academics",
      href: "/admin/academics",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Students",
      href: "/admin/students",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Teachers",
      href: "/admin/teachers",
    },
    {
      icon: <User2 className="h-5 w-5" />,
      label: "Employee",
      href: "/admin/employee",
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Exams",
      href: "/admin/exams",
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Activities",
      href: "/admin/activities",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r flex flex-col">
        <div className="p-4 border-b">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="p-1 rounded">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl">EduAdmin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 transition-opacity"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button className="w-full flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold hidden md:block">
              Admin Portal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Admin"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs">admin@school.edu</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-2 w-full"
                  >
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 w-full"
                  >
                    School Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/logout"
                    className="flex items-center gap-2 w-full"
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
