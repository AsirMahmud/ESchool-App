// Remove this import
// import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Bell,
  Calendar,
  FileText,
  Home,
  Settings,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  Briefcase,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function HRLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link
          href="/hr/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <GraduationCap className="h-6 w-6" />
          <span>E-School HR Portal</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/hr/dashboard">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          {/* Remove ModeToggle component */}
        </nav>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[250px] flex-col border-r bg-background md:flex">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/employees">
                <Users className="mr-2 h-4 w-4" />
                Employees
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/departments">
                <Briefcase className="mr-2 h-4 w-4" />
                Departments
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/teacher-recruitment">
                <UserPlus className="mr-2 h-4 w-4" />
                Teacher Recruitment
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/leave-management">
                <Calendar className="mr-2 h-4 w-4" />
                Leave Management
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/training">
                <BookOpen className="mr-2 h-4 w-4" />
                Training & Development
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/performance">
                <Award className="mr-2 h-4 w-4" />
                Performance
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/policies">
                <FileText className="mr-2 h-4 w-4" />
                Policies
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/reports">
                <BarChart3 className="mr-2 h-4 w-4" />
                Reports
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/hr/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
