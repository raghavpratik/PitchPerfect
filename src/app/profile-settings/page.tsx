
"use client";

import React, { useState, useEffect } from 'react';
import { StartupForm } from '@/components/dashboard/founder/StartupForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import type { Startup } from '@/types';
import { UserCog, Edit3, Building } from 'lucide-react'; // Added Building icon
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const MOCK_STARTUP_ID_PREFIX = "mock_startup_";

export default function ProfileSettingsPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoadingStartup, setIsLoadingStartup] = useState(true); // For founder's startup data

  // Effect for loading founder's startup data
  useEffect(() => {
    if (isLoggedIn && user?.role === 'founder' && user.id) {
      setIsLoadingStartup(true);
      // Simulate a slight delay for loading, good for UX if actual fetch takes time
      setTimeout(() => {
        const storedStartup = localStorage.getItem(MOCK_STARTUP_ID_PREFIX + user.id);
        if (storedStartup) {
          try {
            setStartup(JSON.parse(storedStartup));
          } catch (e) {
            console.error("Failed to parse startup from localStorage", e);
            setStartup(null);
          }
        } else {
          setStartup(null); // No startup profile yet
        }
        setIsLoadingStartup(false);
      }, 300);
    } else {
      setIsLoadingStartup(false); // Not a founder or not logged in, no startup data to load
    }
  }, [isLoggedIn, user]);

  const handleStartupFormSubmit = (data: Startup) => {
    if (user && user.id && user.role === 'founder') {
      const completeStartupData = { ...data, id: startup?.id || Date.now().toString(), founderId: user.id };
      localStorage.setItem(MOCK_STARTUP_ID_PREFIX + user.id, JSON.stringify(completeStartupData));
      setStartup(completeStartupData);
      toast({ title: "Startup Profile Saved!", description: `${data.name} details have been successfully updated.` });
    }
  };

  if (!isLoggedIn && typeof window !== 'undefined') { // Check for window to avoid SSR issues with router
     router.push('/signin');
     return <div className="flex justify-center items-center h-screen"><p>Redirecting to sign in...</p></div>;
  }
  if (!user) {
    return <div className="flex justify-center items-center h-screen"><p>Loading user data...</p></div>;
  }


  return (
    <div className="space-y-12">
      <div className="text-center animate-fade-in-up">
        <UserCog className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-4">Profile Settings</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your account details, preferences, and startup profile if you're a founder.
        </p>
      </div>
      
      <Card className="w-full max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: "100ms"}}>
        <CardHeader>
          <CardTitle className="flex items-center"><Edit3 className="mr-2 h-5 w-5 text-primary"/> Account Information</CardTitle>
          <CardDescription>Your personal information and role on PitchPerfect.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user?.name || ""} placeholder="Your Name" className="mt-1"/>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user?.email || ""} placeholder="your@email.com" disabled  className="mt-1"/>
          </div>
          <div>
            <Label htmlFor="role">Current Role</Label>
            <Input id="role" defaultValue={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Not set"} disabled className="mt-1" />
          </div>
          <Button className="w-full" onClick={() => toast({ title: "Coming Soon!", description: "Ability to update basic profile info is under development."})}>
            Update Account Info (Placeholder)
          </Button>
        </CardContent>
      </Card>

      {user?.role === 'founder' && (
        <Card className="w-full max-w-4xl mx-auto animate-fade-in-up mt-8" style={{animationDelay: "200ms"}}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl md:text-3xl flex items-center">
              <Building className="mr-3 h-7 w-7 text-primary"/> 
              {startup ? "Edit Your Startup Profile" : "Launch Your Startup Profile"}
            </CardTitle>
            <CardDescription>
              This is where you craft the detailed profile for your startup. This information will be showcased to potential investors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingStartup ? (
              <div className="space-y-4 py-8">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-10 w-1/4 ml-auto" />
              </div>
            ) : (
              <StartupForm initialData={startup || undefined} onSubmitSuccess={handleStartupFormSubmit} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
