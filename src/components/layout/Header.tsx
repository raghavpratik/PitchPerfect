
"use client";

import Link from "next/link";
import { Rocket, LogIn, UserPlus, LogOut, Newspaper, DollarSign, MessageCircle, Heart, Briefcase, UserCog, Bell, UserCircle as UserIconLucide } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


export function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  const getDashboardPath = () => {
    if (!isLoggedIn) return "/signin"; // Should not be active in nav if not logged in
    if (user?.role === "founder") return "/founder-dashboard";
    if (user?.role === "investor") return "/investor-dashboard";
    return "/signin"; 
  }

  const getBrandLink = () => {
    return "/";
  }

  const RoleDisplay = ({ role }: { role: "founder" | "investor" | null }) => {
    if (role === "founder") return <UserCog className="mr-2 h-4 w-4 text-primary" aria-label="Founder" />;
    if (role === "investor") return <Briefcase className="mr-2 h-4 w-4 text-primary" aria-label="Investor" />;
    return <UserIconLucide className="mr-2 h-4 w-4 text-muted-foreground" />;
  };

  const dashboardPath = getDashboardPath();
  const newsPath = "/news";
  const messagesPath = "/messages";

  const isDashboardActive = isLoggedIn && pathname === dashboardPath;
  const isNewsActive = pathname === newsPath;
  const isMessagesActive = pathname === messagesPath;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href={getBrandLink()} className="flex items-center gap-2">
          <Rocket className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary">PitchPerfect</span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex"> {/* Increased gap for better spacing with border */}
          {isLoggedIn && (
             <Link 
              href={dashboardPath} 
              className={cn(
                "text-sm font-medium transition-colors py-1",
                isDashboardActive
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
                Dashboard
            </Link>
          )}
          <Link 
            href={newsPath} 
            className={cn(
              "text-sm font-medium transition-colors py-1",
              isNewsActive
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            News
          </Link>
           <Link 
            href={messagesPath} 
            className={cn(
              "text-sm font-medium transition-colors py-1",
              isMessagesActive
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Messages
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push('/notifications')} aria-label="Notifications">
            <Heart className="h-[1.2rem] w-[1.2rem] text-red-500" />
          </Button>
          <ThemeToggleButton />
          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl || `https://placehold.co/40x40.png?text=${user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}`} alt={user.name || user.email} data-ai-hint="profile avatar"/>
                    <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none flex items-center">
                      <RoleDisplay role={user.role} /> {user.name || user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                       {user.email} ({user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''})
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => router.push('/profile-settings')}>
                  <UserCog className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signin">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
