// components/QuickAccessButton.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QuickAccessButtonProps } from "../types";

export function QuickAccessButton({
  icon,
  label,
  href,
}: QuickAccessButtonProps) {
  return (
    <Button variant="outline" className="h-auto flex-col py-3 px-2" asChild>
      <Link href={href}>
        <div className="bg-primary/10 text-primary p-2 rounded-full mb-1">
          {icon}
        </div>
        <span className="text-xs font-medium">{label}</span>
      </Link>
    </Button>
  );
}
