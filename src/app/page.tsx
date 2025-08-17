import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calculator,
  UserCog,
  ClipboardList,
  UserPlus,
  Building2,
} from "lucide-react";

export default function LoginSelectionPage() {
  const loginOptions = [
    {
      title: "Admin",
      description: "School administration and management",
      icon: <Building2 className="h-12 w-12 text-primary" />,
      href: "/admin/dashboard",
    },
    {
      title: "Teacher",
      description: "Class management and student grading",
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      href: "/teacher/dashboard",
    },
    {
      title: "Student",
      description: "Access classes, assignments and grades",
      icon: <GraduationCap className="h-12 w-12 text-primary" />,
      href: "/student/dashboard",
    },
    {
      title: "Accountant",
      description: "Financial management and reporting",
      icon: <Calculator className="h-12 w-12 text-primary" />,
      href: "/accountant/dashboard",
    },
    {
      title: "HR Department",
      description: "Staff management and recruitment",
      icon: <Users className="h-12 w-12 text-primary" />,
      href: "/hr/dashboard",
    },
    {
      title: "Staff",
      description: "Support staff and operations",
      icon: <UserCog className="h-12 w-12 text-primary" />,
      href: "/staff/dashboard",
    },
    {
      title: "Admission Office",
      description: "Student admissions and certificates",
      icon: <UserPlus className="h-12 w-12 text-primary" />,
      href: "/admission/dashboard",
    },
    {
      title: "Parent",
      description: "Monitor your child's progress",
      icon: <ClipboardList className="h-12 w-12 text-primary" />,
      href: "/parent/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8 pt-8 pb-10">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="School Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <h1 className="text-3xl font-bold text-primary">EduManage Pro</h1>
          </div>

          <div className="text-center max-w-2xl">
            <h2 className="text-2xl font-semibold mb-2">
              Welcome to our School Management System
            </h2>
            <p className="text-muted-foreground">
              Please select your role to access the appropriate dashboard and
              features.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {loginOptions.map((option, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">{option.icon}</div>
                <CardTitle className="text-center text-xl">
                  {option.title}
                </CardTitle>
                <CardDescription className="text-center">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 pt-0">
                <div className="h-[1px] w-full bg-border mb-4"></div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Link href={option.href} className="w-full">
                  <Button className="w-full" variant="default">
                    Login as {option.title}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <footer className="text-center text-sm text-muted-foreground pb-8">
          <p>© 2025 EduManage Pro. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="#" className="hover:text-primary transition-colors">
              Help
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
