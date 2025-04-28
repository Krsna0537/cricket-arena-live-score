
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Award,
  BarChart2,
  Calendar,
  Home,
  Settings,
  ShieldCheck,
  Trophy,
  User,
  Users
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-cricket-600 text-white"
          : "hover:bg-cricket-50 text-gray-700 hover:text-cricket-700"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // If we're on mobile, don't render the sidebar at all
  if (isMobile) {
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="hidden md:flex w-64 shrink-0 flex-col border-r bg-white">
      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          <div className="mb-8 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-cricket-600 flex items-center justify-center">
              <span className="text-white font-bold">CA</span>
            </div>
            <span className="text-xl font-bold text-cricket-700">Cricket Arena</span>
          </div>
          <nav className="space-y-1">
            <SidebarItem icon={Home} label="Dashboard" href="/" isActive={isActive("/")} />
            <SidebarItem
              icon={Trophy}
              label="Tournaments"
              href="/tournaments"
              isActive={isActive("/tournaments")}
            />
            <SidebarItem icon={Users} label="Teams" href="/teams" isActive={isActive("/teams")} />
            <SidebarItem
              icon={User}
              label="Players"
              href="/players"
              isActive={isActive("/players")}
            />
            <SidebarItem
              icon={Calendar}
              label="Matches"
              href="/matches"
              isActive={isActive("/matches")}
            />
            <SidebarItem
              icon={BarChart2}
              label="Statistics"
              href="/statistics"
              isActive={isActive("/statistics")}
            />
            <SidebarItem
              icon={Award}
              label="Awards"
              href="/awards"
              isActive={isActive("/awards")}
            />
            
            <div className="my-4 h-px bg-gray-200" />
            
            <SidebarItem
              icon={ShieldCheck}
              label="Admin"
              href="/admin"
              isActive={isActive("/admin")}
            />
            <SidebarItem
              icon={Settings}
              label="Settings"
              href="/settings"
              isActive={isActive("/settings")}
            />
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
