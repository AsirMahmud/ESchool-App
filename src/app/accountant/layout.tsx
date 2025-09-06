import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const metadata: Metadata = {
  title: "Accountant Portal - School Management System",
  description: "Financial management portal for school accountants",
};

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/accountant/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:underline"
              >
                Dashboard
              </Link>
              <Link
                href="/accountant/fee-management"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:underline"
              >
                Student Payments
              </Link>
              <Link
                href="/accountant/expenses"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:underline"
              >
                Expenses
              </Link>
              <Link
                href="/accountant/payroll"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:underline"
              >
                Employee Salaries
              </Link>
              
              <Link
                href="/accountant/reports"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:underline"
              >
                Reports
              </Link>
              <Link
                href="/accountant/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:underline"
              >
                Settings
              </Link>

            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/accountant/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold">School Finance</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <form className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 rounded-lg bg-white pl-8 md:w-80"
              />
            </div>
          </form>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-blue-600" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                role="combobox"
                className="flex items-center gap-1"
              >
                <span>John Doe</span>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/accountant/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/accountant/settings">Settings</Link>
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
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-white md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="/accountant/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              href="/accountant/fee-management"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600"
            >
              Student Payments
            </Link>
            <Link
              href="/accountant/expenses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600"
            >
              Expenses
            </Link>
            <Link
              href="/accountant/payroll"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600"
            >
              Employee Salaries
            </Link>
            <Link
              href="/accountant/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600"
            >
              Reports
            </Link>
            <Link
              href="/accountant/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600"
            >
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
