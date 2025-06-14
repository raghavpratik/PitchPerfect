
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { StartupCard } from '@/components/dashboard/investor/StartupCard';
import { StartupFilters } from '@/components/dashboard/investor/StartupFilters';
import type { Startup, User } from '@/types'; // Startup type will be updated
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, TrendingUp, Activity, Users as UsersIcon, BarChart2 } from 'lucide-react'; // Added Activity, UsersIcon, BarChart2
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";


const MOCK_STARTUP_ID_PREFIX = "mock_startup_";

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

const marketInsights = [
  "📈 AI and Sustainability are trending sectors this month.",
  "💡 Early-stage SaaS companies are seeing increased investor interest.",
  "💰 Average seed round sizes are up by 5% this quarter (mock data).",
  "🚀 Fintech innovations continue to disrupt traditional finance.",
  "🌐 Web3 and Decentralized Tech startups are gaining traction.",
  "헬스케어 분야의 기술 스타트업들이 주목받고 있습니다. (Korean: Healthcare tech startups are gaining attention.)"
];


export default function InvestorDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [allStartups, setAllStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ industry: "All", stage: "All", searchTerm: "" });
  const [currentInsight, setCurrentInsight] = useState("");

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'investor') {
      router.push('/signin');
    } else {
      setIsLoading(true);
      const mockData = getAllMockStartups();
      setAllStartups(mockData);
      setFilteredStartups(mockData); 
      setCurrentInsight(marketInsights[Math.floor(Math.random() * marketInsights.length)]);
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
        s.summary.toLowerCase().includes(term)
      );
    }
    setFilteredStartups(startupsToFilter);
    setTimeout(() => setIsLoading(false), 300); 
  };
  
  if (!isLoggedIn || user?.role !== 'investor') {
    return <div className="flex justify-center items-center h-screen"><p>Loading or redirecting...</p></div>;
  }

  return (
    <div className="space-y-8">
      <div className="md:flex md:items-start md:gap-6">
        <div className="flex-grow mb-6 md:mb-0">
            <h1 className="text-3xl font-bold font-headline">Discover Startups</h1>
            <p className="text-muted-foreground">Filter and find your next big investment opportunity.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 md:w-auto md:max-w-xs lg:max-w-md">
            <Card className="w-full animate-fade-in-up hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-headline flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Market Insights (Mock)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{currentInsight}</p>
                </CardContent>
            </Card>
            <Card className="w-full animate-fade-in-up hover:shadow-lg transition-shadow" style={{animationDelay: "100ms"}}>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-headline flex items-center">
                        <Activity className="mr-2 h-5 w-5 text-primary" /> Platform Activity (Mock)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        <strong>{allStartups.length}</strong>&nbsp;Startups Listed
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <UsersIcon className="mr-2 h-4 w-4" />
                        <strong>150+</strong>&nbsp;Active Investors
                    </div>
                     <div className="flex items-center text-sm text-muted-foreground">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <strong>$5M+</strong>&nbsp;Pledged (Demo)
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
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
            No startups match your current filter criteria. Try adjusting your filters or check back later as new startups join PitchPerfect!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
