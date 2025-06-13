"use client";

import React, { useEffect, useState } } from 'react';
import Image from 'next/image';
import type { Startup } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusTracker } from '@/components/dashboard/founder/StatusTracker';
import { ArrowLeft, MessageCircle, Briefcase, DollarSign, Tag, Link as LinkIcon, Youtube, Lightbulb, Zap, TrendingUp, UserCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data fetching - in a real app, fetch from API based on ID
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
  // Fallback if exact ID match not found (e.g., if ID format changed)
  const item = localStorage.getItem(id); // Check if ID itself is the key (older mock data)
  if(item) {
    try { return JSON.parse(item); } catch (e) { /* ignore */ }
  }
  return null;
};

const stageIcons = {
  "Idea": <Lightbulb className="mr-2 h-5 w-5" />,
  "MVP": <Zap className="mr-2 h-5 w-5" />,
  "Growth": <TrendingUp className="mr-2 h-5 w-5" />,
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
      // Simulate API call
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
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-1/4" />
                <div className="flex gap-2"> <Skeleton className="h-8 w-24" /> <Skeleton className="h-8 w-24" /></div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
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
  
  const videoId = startup.videoLink && startup.videoLink.includes('youtube.com/watch?v=') 
                  ? startup.videoLink.split('v=')[1].split('&')[0]
                  : null;


  return (
    <div className="space-y-8">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="animate-fade-in-up">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Startups
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg animate-fade-in-up">
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
                    {stageIcons[startup.stage]} {startup.stage} Stage
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold font-headline mb-2">Pitch Summary</h3>
                <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">{startup.summary}</p>
              </div>

              {videoId && (
                <div>
                  <h3 className="text-xl font-semibold font-headline mb-3 flex items-center"><Youtube className="mr-2 h-5 w-5 text-primary"/> Video Pitch</h3>
                  <div className="aspect-video rounded-lg overflow-hidden border">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              {(startup.pitchDeckUrl || startup.videoLink && !videoId) && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold font-headline mb-2">Resources</h3>
                  {startup.pitchDeckUrl && (
                     <a href={startup.pitchDeckUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                       <LinkIcon className="mr-2 h-4 w-4"/> View Pitch Deck (PDF)
                     </a>
                  )}
                  {startup.videoLink && !videoId && (
                     <a href={startup.videoLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline mt-2">
                       <Youtube className="mr-2 h-4 w-4"/> Watch Video Pitch
                     </a>
                  )}
                </div>
              )}


              {startup.tags && startup.tags.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold font-headline mb-2 flex items-center"><Tag className="mr-2 h-5 w-5 text-primary"/> Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {startup.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="animate-fade-in-up" style={{animationDelay: "100ms"}}>
            <StatusTracker currentStage={startup.stage} />
          </div>
          
          <Card className="shadow-lg animate-fade-in-up" style={{animationDelay: "200ms"}}>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Founder Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center">
                    <UserCircle className="mr-3 h-8 w-8 text-muted-foreground" />
                    <div>
                        {/* Placeholder - In a real app, fetch founder details */}
                        <p className="font-semibold">Founder Name (Placeholder)</p>
                        <p className="text-sm text-muted-foreground">contact@example.com</p>
                    </div>
                </div>
              <Button className="w-full mt-2">
                <MessageCircle className="mr-2 h-4 w-4" /> Contact Founder
              </Button>
              <Button variant="accent" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <DollarSign className="mr-2 h-4 w-4" /> Invest Now (Placeholder)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
