// components/EventItem.tsx
import { Calendar } from "lucide-react";
import { EventItemProps } from "../types";

export function EventItem({ title, date, time, location }: EventItemProps) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
      <div className="bg-primary/10 text-primary p-2 rounded-md flex items-center justify-center">
        <Calendar className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="font-medium">{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{location}</p>
      </div>
    </div>
  );
}
