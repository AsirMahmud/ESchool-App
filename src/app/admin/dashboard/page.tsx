"use client";
import {
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useStudents } from "@/hooks/use-students";
import { useTeachers } from "@/hooks/use-teachers";

import { QuickAccessButton } from "./components/QuickAccessButton";
import { KpiCard } from "./components/KpiCard";

export default function AdminDashboard() {
  const { data: students, isLoading: studentsLoading } = useStudents()
  const { data: teachers, isLoading: teachersLoading } = useTeachers()


  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening in your school today.
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KpiCard
          title="Total Students"
          value={studentsLoading ? "Loading..." : (students?.length || 0).toString()}
          trend="+3.2%"
          trendUp={true}
          description="From database"
          icon={<Users className="h-5 w-5" />}
          linkHref="/admin/students"
        />
        <KpiCard
          title="Total Teachers"
          value={teachersLoading ? "Loading..." : (teachers?.length || 0).toString()}
          trend="+1.2%"
          trendUp={true}
          description="From database"
          icon={<GraduationCap className="h-5 w-5" />}
          linkHref="/admin/teachers"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <QuickAccessButton
                icon={<Users className="h-5 w-5" />}
                label="Students"
                href="/admin/students"
              />
              <QuickAccessButton
                icon={<GraduationCap className="h-5 w-5" />}
                label="Teachers"
                href="/admin/teachers"
              />
              <QuickAccessButton
                icon={<BookOpen className="h-5 w-5" />}
                label="Classes"
                href="/admin/academic/classes"
              />
              <QuickAccessButton
                icon={<Calendar className="h-5 w-5" />}
                label="Timetable"
                href="/admin/academic/timetable"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
