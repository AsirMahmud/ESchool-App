// components/StatusItem.tsx
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { StatusItemProps } from "../types";

export function StatusItem({ title, status, details }: StatusItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-500";
      case "degraded":
        return "text-amber-500";
      case "down":
        return "text-red-500";
      case "upcoming":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4" />;
      case "degraded":
        return <AlertCircle className="h-4 w-4" />;
      case "down":
        return <AlertCircle className="h-4 w-4" />;
      case "upcoming":
        return <Clock className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{details}</p>
      </div>
      <div className={`flex items-center gap-1 ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        <span className="text-xs capitalize">{status}</span>
      </div>
    </div>
  );
}
