
"use client";

import React from "react";
import { 
  Users, 
  Video, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  Play,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const DATA = [
  { name: "Mon", revenue: 2400 },
  { name: "Tue", revenue: 1398 },
  { name: "Wed", revenue: 9800 },
  { name: "Thu", revenue: 3908 },
  { name: "Fri", revenue: 4800 },
  { name: "Sat", revenue: 3800 },
  { name: "Sun", revenue: 4300 },
];

const RECENT_VIDEOS = [
  { id: 1, title: "Modern Next.js Patterns", views: "1.2k", date: "2 days ago", status: "Published", tier: "Premium" },
  { id: 2, title: "AI Integration Guide", views: "850", date: "5 days ago", status: "Published", tier: "Basic" },
  { id: 3, title: "Scalable CSS with Tailwind", views: "0", date: "Just now", status: "Draft", tier: "Premium" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Creator Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button className="bg-primary">Manage Tiers</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "$12,450.00", icon: DollarSign, trend: "+12%", color: "text-primary" },
          { label: "Active Subscribers", value: "1,240", icon: Users, trend: "+5.2%", color: "text-accent" },
          { label: "Total Views", value: "48.5k", icon: Play, trend: "+18%", color: "text-emerald-400" },
          { label: "Videos Hosted", value: "32", icon: Video, trend: "+2", color: "text-orange-400" },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg bg-secondary", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none flex items-center gap-1">
                  {stat.trend}
                  <ArrowUpRight className="w-3 h-3" />
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="lg:col-span-2 bg-card/50">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Daily earnings for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Videos */}
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Your latest video performance</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">See all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {RECENT_VIDEOS.map((video) => (
                <div key={video.id} className="flex items-center gap-4 group">
                  <div className="w-16 aspect-video bg-muted rounded border overflow-hidden relative">
                    <Play className="absolute inset-0 m-auto w-4 h-4 text-white/50" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{video.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {video.date}</span>
                      <span>•</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                  <Badge variant={video.status === 'Published' ? 'outline' : 'secondary'} className="text-[10px]">
                    {video.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
