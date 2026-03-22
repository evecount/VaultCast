
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Lock, ChevronRight, User, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getPlaceholderImage } from "@/app/lib/placeholder-images";

const SAMPLE_VIDEOS = [
  { id: "v1", title: "Mastering Modern Architecture", description: "Deep dive into clean code and microservices.", tier: "Premium", image: getPlaceholderImage("video-1"), creator: "Alex Tech" },
  { id: "v2", title: "The Art of Visual Storytelling", description: "Learn how to capture cinematic moments.", tier: "Basic", image: getPlaceholderImage("video-2"), creator: "Elena Frames" },
  { id: "v3", title: "Growth Marketing 2.0", description: "Strategies used by billion-dollar startups.", tier: "Premium", image: getPlaceholderImage("video-3"), creator: "Marketing Lab" },
  { id: "v4", title: "Foundations of UX Design", description: "From wireframes to high-fidelity prototypes.", tier: "Basic", image: getPlaceholderImage("video-4"), creator: "Design Dojo" },
];

export default function LandingPage() {
  const heroImage = getPlaceholderImage("hero-bg");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            </div>
            <span className="font-headline text-xl font-bold">VaultCast</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Browse</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Creator Portal</Button>
            </Link>
            <Link href="/subscribe">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-12">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="relative rounded-3xl overflow-hidden bg-card border aspect-[21/9] flex items-center group">
            <div className="absolute inset-0 opacity-40">
              <Image 
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            </div>
            
            <div className="relative z-10 p-8 md:p-16 max-w-2xl">
              <Badge variant="outline" className="mb-4 border-primary text-primary font-medium px-3 py-1">
                Featured Content
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Unlock Premium <span className="text-primary">Knowledge.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                The world's leading creators host their exclusive content on VaultCast. 
                Subscribe to get instant access to hundreds of hours of expert-led videos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8">
                  Get Unlimited Access
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 backdrop-blur-sm">
                  View Catalog
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Filter */}
        <section className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              <button className="text-sm font-bold border-b-2 border-primary pb-2 px-1">All Videos</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2 px-1 transition-colors">Tech</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2 px-1 transition-colors">Business</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2 px-1 transition-colors">Design</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2 px-1 transition-colors">Marketing</button>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search catalog..." className="pl-10 bg-card/50" />
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Trending Library
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_VIDEOS.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 video-card-hover border bg-muted">
                  <Image 
                    src={video.image.imageUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={video.image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className={video.tier === 'Premium' ? 'bg-primary' : 'bg-accent text-accent-foreground'}>
                      {video.tier}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{video.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    <span>{video.creator}</span>
                    <span>•</span>
                    <span>12.5k views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
                <span className="font-headline text-2xl font-bold">VaultCast</span>
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6">
                The premium destination for curated video subscriptions. Secure your content, reward your audience.
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost" className="rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary">Features</Link></li>
                <li><Link href="#" className="hover:text-primary">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-primary">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 VaultCast Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-primary">Terms</Link>
              <Link href="#" className="hover:text-primary">Privacy</Link>
              <Link href="#" className="hover:text-primary">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
