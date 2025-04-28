
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend && (
            <div
              className={cn(
                "mr-1",
                trend === "up" && "text-green-500",
                trend === "down" && "text-red-500"
              )}
            >
              {trend === "up" ? "▲" : trend === "down" ? "▼" : "◆"}
            </div>
          )}
          {trendValue && <div>{trendValue}</div>}
          {subtitle && (
            <div className={!trendValue ? "" : "ml-2 border-l pl-2"}>
              {subtitle}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
