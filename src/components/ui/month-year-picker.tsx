"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthYearPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 2; i++) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years;
};

export function MonthYearPicker({ 
  value, 
  onChange, 
  placeholder = "Select month and year",
  className 
}: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState<string>("");
  const [selectedYear, setSelectedYear] = React.useState<string>("");

  const years = generateYears();

  // Parse existing value
  React.useEffect(() => {
    if (value) {
      // Try to parse different formats: "January 2024", "01-2024", "2024-01"
      const parts = value.split(/[\s\-]/);
      if (parts.length === 2) {
        const [first, second] = parts;
        
        // Check if first part is a month name
        const monthIndex = months.findIndex(m => 
          m.label.toLowerCase() === first.toLowerCase()
        );
        
        if (monthIndex !== -1) {
          // Format: "January 2024"
          setSelectedMonth(months[monthIndex].value);
          setSelectedYear(second);
        } else if (first.length === 2 && second.length === 4) {
          // Format: "01-2024"
          setSelectedMonth(first);
          setSelectedYear(second);
        } else if (first.length === 4 && second.length === 2) {
          // Format: "2024-01"
          setSelectedYear(first);
          setSelectedMonth(second);
        }
      }
    }
  }, [value]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    if (selectedYear && onChange) {
      const monthName = months.find(m => m.value === month)?.label || "";
      onChange(`${monthName} ${selectedYear}`);
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (selectedMonth && onChange) {
      const monthName = months.find(m => m.value === selectedMonth)?.label || "";
      onChange(`${monthName} ${year}`);
    }
  };

  const displayValue = () => {
    if (selectedMonth && selectedYear) {
      const monthName = months.find(m => m.value === selectedMonth)?.label || "";
      return `${monthName} ${selectedYear}`;
    }
    return null;
  };

  const clearSelection = () => {
    setSelectedMonth("");
    setSelectedYear("");
    if (onChange) {
      onChange("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !displayValue() && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue() || <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="text-sm font-medium">Select Month and Year</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Month</label>
              <Select value={selectedMonth} onValueChange={handleMonthChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Year</label>
              <Select value={selectedYear} onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              disabled={!selectedMonth && !selectedYear}
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
              disabled={!selectedMonth || !selectedYear}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
