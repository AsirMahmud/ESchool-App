// components/ActivityItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ActivityItemProps } from "../types";

export function ActivityItem({
  user,
  action,
  resource,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{user.name}</span>
          <span className="text-muted-foreground"> {action} </span>
          {resource && <span className="font-medium">{resource}</span>}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="secondary" className="text-xs font-normal">
            {user.role}
          </Badge>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
}
