
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Video, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart3,
  LogOut,
  Play,
  Bell,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPlaceholderImage } from "@/app/lib/placeholder-images";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Video, label: "Videos", href: "/dashboard/videos" },
  { icon: Users, label: "Subscribers", href: "/dashboard/subscribers" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: CreditCard, label: "Payouts", href: "/dashboard/payouts" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const creatorAvatar = getPlaceholderImage("creator-avatar");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            </div>
            <span className="font-headline text-xl font-bold">VaultCast</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}>
                <item.icon className={cn("w-4 h-4", pathname === item.href ? "text-white" : "group-hover:text-primary")} />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 px-2 py-4 mb-4">
            <Avatar className="w-9 h-9 border-2 border-primary/20">
              <AvatarImage src={creatorAvatar.imageUrl} data-ai-hint={creatorAvatar.imageHint} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Alex Tech</span>
              <span className="text-xs text-muted-foreground">Creator Pro</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pl-64">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search your library..." className="pl-10 h-9 bg-card/30 border-none ring-1 ring-border" />
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="relative rounded-full">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </Button>
            <Link href="/dashboard/videos/new">
              <Button size="sm" className="bg-primary hover:bg-primary/90 font-medium">
                Upload Video
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
