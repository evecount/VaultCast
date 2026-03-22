
"use client";

import React from "react";
import { Check, ArrowRight, Star, Zap, ShieldCheck, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Basic",
    price: "$9",
    description: "Essential access to our foundational content.",
    features: [
      "Access to 50+ Basic Videos",
      "720p HD Quality",
      "Standard Support",
      "Ad-free Experience"
    ],
    highlight: false,
    button: "Get Started"
  },
  {
    name: "Premium",
    price: "$29",
    description: "The complete archive plus exclusive live events.",
    features: [
      "Everything in Basic",
      "Full Library (200+ Videos)",
      "4K Ultra HD Quality",
      "Priority Creator Q&A",
      "Download for Offline Viewing"
    ],
    highlight: true,
    button: "Upgrade to Pro"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Team-wide access and management for organizations.",
    features: [
      "Unlimited Users",
      "Admin Dashboard",
      "SAML/SSO Integration",
      "Dedicated Account Manager",
      "Custom Training Content"
    ],
    highlight: false,
    button: "Contact Sales"
  }
];

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      <header className="w-full p-8 flex justify-between items-center max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          </div>
          <span className="font-headline text-2xl font-bold">VaultCast</span>
        </Link>
        <Link href="/">
          <Button variant="ghost">Back to Library</Button>
        </Link>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center mb-16 space-y-4 max-w-2xl">
          <Badge variant="outline" className="border-primary text-primary px-4 py-1">Pricing Plans</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Simple, Transparent <span className="text-primary">Subscriptions.</span></h1>
          <p className="text-xl text-muted-foreground">
            Choose the level of access that's right for you. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {TIERS.map((tier) => (
            <Card key={tier.name} className={cn(
              "relative flex flex-col transition-all duration-300 hover:scale-[1.02]",
              tier.highlight ? "border-primary bg-card shadow-2xl shadow-primary/10 ring-1 ring-primary/50" : "bg-card/50 border-border"
            )}>
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white hover:bg-primary font-bold px-4 py-1 uppercase tracking-widest text-[10px]">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                </div>
              </CardHeader>

              <CardContent className="flex-grow space-y-4">
                <div className="h-px bg-border/50 mb-6" />
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <div className={cn(
                      "mt-0.5 rounded-full p-0.5",
                      tier.highlight ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-8">
                <Button className={cn(
                  "w-full h-12 text-md font-bold transition-all rounded-full",
                  tier.highlight ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}>
                  {tier.button}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: Zap, title: "Instant Access", text: "Start watching immediately after secure checkout." },
            { icon: ShieldCheck, title: "Secure Payments", text: "We use bank-grade encryption for all transactions." },
            { icon: Star, title: "Premium Content", text: "New expert-led videos added every single week." },
          ].map((benefit, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center transition-transform group-hover:rotate-12">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
