"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { StartupCard } from '@/components/dashboard/investor/StartupCard';
import { StartupFilters } from '@/components/dashboard/investor/StartupFilters';
import type { Startup, User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data - in real app, fetch from API and apply filters server-side or client-side with pagination
const MOCK_STARTUP_ID_PREFIX = "mock_startup_";

// Helper to get all mock startups from localStorage
const getAllMockStartups = (): Startup[] => {
  const startups: Startup[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(MOCK_STARTUP_ID_PREFIX)) {
      try {
        startups.push(JSON.parse(localStorage.getItem(key)!));
      } catch (e) {
        console.error("Failed to parse startup from localStorage", e);
      }
    }
  }
  return startups;
};


export default function InvestorDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [allStartups, setAllStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ industry: "All", stage: "All", searchTerm: "" });

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'investor') {
      router.push('/signin');
    } else {
      // Simulate fetching data
      setIsLoading(true);
      const mockData = getAllMockStartups();
      setAllStartups(mockData);
      setFilteredStartups(mockData); // Initially show all
      setIsLoading(false);
    }
  }, [isLoggedIn, user, router]);

  const handleFilterChange = (newFilters: { industry: string; stage: string; searchTerm: string }) => {
    setFilters(newFilters);
    setIsLoading(true);
    let startupsToFilter = [...allStartups];
    if (newFilters.industry !== "All") {
      startupsToFilter = startupsToFilter.filter(s => s.industry === newFilters.industry);
    }
    if (newFilters.stage !== "All") {
      startupsToFilter = startupsToFilter.filter(s => s.stage === newFilters.stage);
    }
    if (newFilters.searchTerm) {
      const term = newFilters.searchTerm.toLowerCase();
      startupsToFilter = startupsToFilter.filter(s => 
        s.name.toLowerCase().includes(term) || 
        s.summary.toLowerCase().includes(term) ||
        s.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    setFilteredStartups(startupsToFilter);
    // Simulate network delay for filter application
    setTimeout(() => setIsLoading(false), 300); 
  };
  
  if (!isLoggedIn || user?.role !== 'investor') {
    return <div className="flex justify-center items-center h-screen"><p>Loading or redirecting...</p></div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Discover Startups</h1>
      <StartupFilters onFilterChange={handleFilterChange} />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-1/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup, index) => (
            <StartupCard key={startup.id} startup={startup} animationDelay={`${index * 50}ms`} />
          ))}
        </div>
      ) : (
         <Alert className="animate-fade-in-up">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Startups Found</AlertTitle>
          <AlertDescription>
            No startups match your current filter criteria. Try adjusting your filters or check back later as new startups join PitchPad!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
