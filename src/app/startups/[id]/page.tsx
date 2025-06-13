
"use client";

import React, { useEffect, useState } } from 'react';
import Image from 'next/image';
import type { Startup, StartupStage } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusTracker } from '@/components/dashboard/founder/StatusTracker';
import { ArrowLeft, MessageCircle, Briefcase, DollarSign, Lightbulb, Zap, TrendingUp, UserCircle, Info, Package, Target, CheckCircle, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const MOCK_STARTUP_ID_PREFIX = "mock_startup_";

const getMockStartupById = (id: string): Startup | null => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(MOCK_STARTUP_ID_PREFIX)) {
      try {
        const startup = JSON.parse(localStorage.getItem(key)!);
        if (startup.id === id) {
          return startup;
        }
      } catch (e) {
        console.error("Failed to parse startup from localStorage", e);
      }
    }
  }
  const item = localStorage.getItem(id); 
  if(item) {
    try { return JSON.parse(item); } catch (e) { /* ignore */ }
  }
  return null;
};

const stageIcons: Record<StartupStage, React.ReactElement> = {
  "Idea": <Lightbulb className="mr-2 h-5 w-5" />,
  "Pre-Seed": <Package className="mr-2 h-5 w-5" />,
  "Seed": <Target className="mr-2 h-5 w-5" />,
  "MVP": <Zap className="mr-2 h-5 w-5" />,
  "Growth": <TrendingUp className="mr-2 h-5 w-5" />,
  "Series A": <CheckCircle className="mr-2 h-5 w-5" />,
  "Series B+": <Award className="mr-2 h-5 w-5" />,
  "Acquired": <DollarSign className="mr-2 h-5 w-5" />,
  "Others": <Info className="mr-2 h-5 w-5" />,
};

export default function StartupProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setTimeout(() => {
        const fetchedStartup = getMockStartupById(id);
        setStartup(fetchedStartup);
        setIsLoading(false);
      }, 500);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <Button variant="outline" size="sm" disabled><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <Skeleton className="h-24 w-24 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-5 w-1/4" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-52 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Startup Not Found</h1>
        <p className="text-muted-foreground">The startup profile you are looking for does not exist or could not be loaded.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }
  

  return (
    <div className="space-y-8">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="animate-fade-in-up">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Discover
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg animate-fade-in-up hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.01]">
            <CardHeader className="flex flex-col sm:flex-row items-start gap-6">
              <Image
                src={startup.logoUrl || "https://placehold.co/120x120.png?text=Logo"}
                alt={`${startup.name} logo`}
                width={120}
                height={120}
                className="rounded-xl border-2 border-primary/20 object-contain"
                data-ai-hint="company logo"
              />
              <div className="flex-1">
                <CardTitle className="text-3xl font-headline mb-2">{startup.name}</CardTitle>
                <div className="flex items-center text-muted-foreground mb-1">
                    <Briefcase className="mr-2 h-5 w-5 text-primary" /> {startup.industry}
                </div>
                <div className="flex items-center text-muted-foreground">
                    {stageIcons[startup.stage] || stageIcons["Others"]} {startup.stage} Stage
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold font-headline mb-2">Pitch Summary</h3>
                <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">{startup.summary}</p>
              </div>

              {/* Pitch Deck, Video Link, and Tags sections are removed */}

            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="animate-fade-in-up" style={{animationDelay: "100ms"}}>
            <StatusTracker currentStage={startup.stage} />
          </div>
          
          <Card className="shadow-lg animate-fade-in-up hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.01]" style={{animationDelay: "200ms"}}>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Founder & Investment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <UserCircle className="mr-3 h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Founder Name (Placeholder)</p>
                        <p className="text-sm text-muted-foreground">contact@example.com</p>
                    </div>
                </div>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" /> Contact Founder
              </Button>
              
              <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2 text-md flex items-center">
                    <Info className="mr-2 h-5 w-5 text-primary" /> Investment Opportunities
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                      Interested in this venture? Use the 'Contact Founder' button to open discussions, negotiate terms, or signal your investment intent.
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                      (Note: Direct bidding and formal negotiation features are planned for a future update. The button below is a placeholder.)
                  </p>
                  <Button variant="accent" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <DollarSign className="mr-2 h-4 w-4" /> Express Investment Interest (Placeholder)
                  </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
