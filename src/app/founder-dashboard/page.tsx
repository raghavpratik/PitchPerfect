
"use client";

import React, { useState, useEffect } from 'react';
import { StartupForm } from '@/components/dashboard/founder/StartupForm';
import { StatusTracker } from '@/components/dashboard/founder/StatusTracker';
import type { Startup, User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Edit2, Eye, Tag, Link as LinkIcon, Youtube, Sparkles } from 'lucide-react'; // Added Sparkles

const MOCK_STARTUP_ID_PREFIX = "mock_startup_";

const allTips = [
  "🚀 Keep your profile updated with your latest achievements.",
  "💡 Network actively with investors on the platform.",
  "📈 Share your progress and milestones regularly.",
  "✨ A compelling summary can make all the difference.",
  "📸 Ensure your logo and visuals are professional.",
  "🔗 Link your pitch deck and video for maximum impact.",
  "🏷️ Use relevant tags to improve discoverability.",
  "🎯 Clearly define your target audience and problem.",
  "🤝 Practice your pitch until it's seamless and impactful."
];

export default function FounderDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [editing, setEditing] = useState(false);
  const [displayedTips, setDisplayedTips] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'founder') {
      router.push('/signin');
    } else {
      const storedStartup = localStorage.getItem(MOCK_STARTUP_ID_PREFIX + user.id);
      if (storedStartup) {
        setStartup(JSON.parse(storedStartup));
        setEditing(false); 
      } else {
        setEditing(true); 
      }
      // Set dynamic tips
      const shuffledTips = [...allTips].sort(() => 0.5 - Math.random());
      setDisplayedTips(shuffledTips.slice(0, 3));
    }
  }, [isLoggedIn, user, router]);

  const handleFormSubmit = (data: Startup) => {
    setStartup(data);
    if(user) {
        localStorage.setItem(MOCK_STARTUP_ID_PREFIX + user.id, JSON.stringify(data));
    }
    setEditing(false);
  };

  if (!isLoggedIn || user?.role !== 'founder') {
    return <div className="flex justify-center items-center h-screen"><p>Loading or redirecting...</p></div>;
  }
  
  if (editing || !startup) {
     return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">
              {startup ? "Edit Your Startup Profile" : "Launch Your Startup Profile"}
            </h1>
            <StartupForm initialData={startup || undefined} onSubmitSuccess={handleFormSubmit} />
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Founder Dashboard</h1>
        <Button onClick={() => setEditing(true)} variant="outline">
            <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="animate-fade-in-up hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
                {startup.logoUrl && (
                    <Image 
                        src={startup.logoUrl} 
                        alt={`${startup.name} logo`} 
                        width={80} 
                        height={80} 
                        className="rounded-lg border"
                        data-ai-hint="company logo" 
                    />
                )}
                <div>
                    <CardTitle className="text-2xl font-headline">{startup.name}</CardTitle>
                    <CardDescription className="text-md">{startup.industry}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">Pitch Summary</h3>
              <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{startup.summary}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {startup.pitchDeckUrl && (
                  <div>
                    <h4 className="font-semibold flex items-center"><LinkIcon className="mr-2 h-4 w-4 text-primary"/>Pitch Deck</h4>
                    <a href={startup.pitchDeckUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{startup.pitchDeckUrl}</a>
                  </div>
                )}
                {startup.videoLink && (
                  <div>
                    <h4 className="font-semibold flex items-center"><Youtube className="mr-2 h-4 w-4 text-primary"/>Video Pitch</h4>
                    <a href={startup.videoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{startup.videoLink}</a>
                  </div>
                )}
              </div>

              {startup.tags && startup.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold flex items-center mb-1"><Tag className="mr-2 h-4 w-4 text-primary"/>Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {startup.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              <Button asChild className="mt-4">
                <a href={`/startups/${startup.id}`} target="_blank">
                  <Eye className="mr-2 h-4 w-4" /> View Public Profile
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <div className="animate-fade-in-up" style={{animationDelay: "100ms"}}>
                 <StatusTracker currentStage={startup.stage} />
            </div>
            <Card className="animate-fade-in-up hover:shadow-lg transition-shadow" style={{animationDelay: "200ms"}}>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center"><Sparkles className="mr-2 h-5 w-5 text-primary" />Founder Fuel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    {displayedTips.length > 0 ? displayedTips.map((tip, index) => (
                        <p key={index} className="flex items-start">
                           <span className="mr-2 mt-1 text-primary">{tip.substring(0,1)}</span> 
                           {tip.substring(2)}
                        </p>
                    )) : (
                        <>
                            <p>🚀 Keep your profile updated.</p>
                            <p>💡 Network with investors.</p>
                            <p>📈 Share your progress!</p>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

