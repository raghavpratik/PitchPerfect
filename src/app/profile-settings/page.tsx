
"use client";

import React, { useState, useEffect } from 'react';
import { StartupForm } from '@/components/dashboard/founder/StartupForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import type { Startup } from '@/types';
import { UserCog, Building } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const MOCK_STARTUP_ID_PREFIX = "mock_startup_";

export default function ProfileSettingsPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoadingStartup, setIsLoadingStartup] = useState(true); 

  useEffect(() => {
    if (isLoggedIn && user?.role === 'founder' && user.id) {
      setIsLoadingStartup(true);
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
          setStartup(null); 
        }
        setIsLoadingStartup(false);
      }, 300);
    } else if (!isLoggedIn && typeof window !== 'undefined') {
      router.push('/signin');
    }
    else {
      setIsLoadingStartup(false); 
    }
  }, [isLoggedIn, user, router]);

  const handleStartupFormSubmit = (data: Startup) => {
    if (user && user.id && user.role === 'founder') {
      const completeStartupData = { ...data, id: startup?.id || Date.now().toString(), founderId: user.id };
      localStorage.setItem(MOCK_STARTUP_ID_PREFIX + user.id, JSON.stringify(completeStartupData));
      setStartup(completeStartupData);
      toast({ title: "Startup Profile Saved!", description: `${data.name} details have been successfully updated.` });
    }
  };

  if (!isLoggedIn && typeof window !== 'undefined') { 
     return <div className="flex justify-center items-center h-screen"><p>Redirecting to sign in...</p></div>;
  }
  if (!user && isLoggedIn) { // only show loading if logged in but user data is not yet available
    return <div className="flex justify-center items-center h-screen"><p>Loading user data...</p></div>;
  }


  return (
    <div className="space-y-12">
      <div className="text-center animate-fade-in-up">
        <UserCog className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-4">Profile Settings</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {user?.role === 'founder' 
            ? "Manage your startup profile and preferences."
            : "Manage your account preferences."
          }
        </p>
      </div>
      
      {user?.role === 'founder' && (
        <Card className="w-full max-w-4xl mx-auto animate-fade-in-up mt-8" style={{animationDelay: "100ms"}}>
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

      {user?.role !== 'founder' && !isLoadingStartup && (
         <Card className="w-full max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: "100ms"}}>
            <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your notification settings and other preferences here (coming soon).</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">More settings will be available soon.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
