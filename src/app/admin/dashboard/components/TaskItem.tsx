// components/TaskItem.tsx
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TaskItemProps } from "../types";

export function TaskItem({ title, count, priority }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50";
      case "medium":
        return "text-amber-500 bg-amber-50";
      case "low":
        return "text-green-500 bg-green-50";
      default:
        return "text-blue-500 bg-blue-50";
    }
  };

  return (
    <div className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary p-2 rounded-md">
          <Clock className="h-4 w-4" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {count} {count === 1 ? "item" : "items"} pending
          </p>
        </div>
      </div>
      <Badge className={getPriorityColor(priority)}>{priority}</Badge>
    </div>
  );
}
