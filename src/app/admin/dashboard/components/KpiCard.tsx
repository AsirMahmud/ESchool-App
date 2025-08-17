// components/KpiCard.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { KpiCardProps } from "../types";

export function KpiCard({
  title,
  value,
  trend,
  trendUp,
  description,
  icon,
  linkHref,
}: KpiCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trendUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {trendUp ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{trend}</span>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-3 px-6">
        <Button
          variant="ghost"
          size="sm"
          className="w-full h-7 text-xs"
          asChild
        >
          <Link href={linkHref}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
