import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  FileText,
  GraduationCap,
  Home,
  Settings,
  UserPlus,
  Users,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admission Office Dashboard",
  description: "Admission Office Management System",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admission/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Student Admissions",
    href: "/admission/student-admissions",
    icon: <UserPlus className="h-5 w-5" />,
  },
  {
    title: "Certificate Management",
    href: "/admission/certificate-management",
    icon: <FileCheck className="h-5 w-5" />,
  },
  {
    title: "Admission Calendar",
    href: "/admission/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/admission/reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admission/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link
          href="/admission/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <GraduationCap className="h-6 w-6" />
          <span>Admission Office</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {/* Removed ModeToggle */}
        </nav>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            {sidebarNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
