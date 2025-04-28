
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCricket } from "@/context/CricketContext";
import { Badge } from "../ui/badge-cricket";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const { currentUser, liveMatches } = useCricket();

  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        {/* Left section: Mobile menu and logo */}
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="py-4">
                  <Link to="/" className="flex items-center gap-2 px-2">
                    <span className="text-xl font-bold text-cricket-700">
                      Cricket Arena
                    </span>
                  </Link>
                  <nav className="flex flex-col gap-1 mt-6">
                    <SheetClose asChild>
                      <Link to="/" className="px-2 py-1 rounded-md hover:bg-gray-100">
                        Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tournaments" className="px-2 py-1 rounded-md hover:bg-gray-100">
                        Tournaments
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/teams" className="px-2 py-1 rounded-md hover:bg-gray-100">
                        Teams
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/players" className="px-2 py-1 rounded-md hover:bg-gray-100">
                        Players
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/matches" className="px-2 py-1 rounded-md hover:bg-gray-100">
                        Matches
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/statistics" className="px-2 py-1 rounded-md hover:bg-gray-100">
                        Statistics
                      </Link>
                    </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-cricket-600 flex items-center justify-center">
              <span className="text-white font-bold">CA</span>
            </div>
            {!isMobile && (
              <span className="text-xl font-bold text-cricket-700">Cricket Arena</span>
            )}
          </Link>
        </div>

        {/* Center section: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search teams, players, or matches..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right section: Live matches, notifications, and profile */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Link to="/live">
            <Button variant="outline" size={isMobile ? "icon" : "default"} className="relative">
              {liveMatches.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-live-pulse">
                  {liveMatches.length}
                </span>
              )}
              {!isMobile ? (
                <>
                  Live Matches
                  {liveMatches.length > 0 && (
                    <Badge variant="live" className="ml-2">
                      {liveMatches.length}
                    </Badge>
                  )}
                </>
              ) : (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-live-pulse"></div>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cricket-600 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-cricket-600 text-white">
                    {currentUser?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {currentUser?.name || "User"}
                <p className="text-xs text-gray-500">{currentUser?.role}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer">Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile search overlay */}
      {isMobile && searchOpen && (
        <div className="absolute inset-x-0 top-16 bg-white p-4 border-b shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 w-full"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
