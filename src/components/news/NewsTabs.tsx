
"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsCard } from "./NewsCard";
import type { NewsItem } from "@/types";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const mockNewsData: NewsItem[] = [
  { id: '1', title: "Groundbreaking AI Startup Secures $10M Seed Funding", snippet: "InnovateAI announced today the successful closing of its seed funding round, led by Future Ventures.", imageUrl: "https://placehold.co/600x400.png", source: "TechCrunch", date: "Oct 26, 2023", category: "Funding Rounds", link: "#" , dataAiHint: "AI neural network"},
  { id: '2', title: "The Future of Work: Remote Collaboration Tools on the Rise", snippet: "A new report highlights the increasing adoption of tools that facilitate remote work and collaboration.", imageUrl: "https://placehold.co/600x400.png", source: "Forbes", date: "Oct 25, 2023", category: "Tech & AI", link: "#", dataAiHint: "team collaboration video" },
  { id: '3', title: "Market Hits Record High Amidst Positive Economic Indicators", snippet: "The stock market surged today, driven by strong corporate earnings and optimistic economic forecasts.", imageUrl: "https://placehold.co/600x400.png", source: "Bloomberg", date: "Oct 26, 2023", category: "Stock Market Updates", link: "#", dataAiHint: "stock market graph" },
  { id: '4', title: "Top 5 Startups to Watch in Q4 2023", snippet: "Discover the most promising startups making waves this quarter with innovative solutions.", imageUrl: "https://placehold.co/600x400.png", source: "Startup Weekly", date: "Oct 24, 2023", category: "Startup News", link: "#", dataAiHint: "startup team meeting" },
  { id: '5', title: "EcoTech Innovations: Paving the Way for a Sustainable Future", snippet: "Startups are leveraging technology to address environmental challenges and promote sustainability.", imageUrl: "https://placehold.co/600x400.png", source: "GreenBiz", date: "Oct 23, 2023", category: "Startup News", link: "#", dataAiHint: "green technology innovation" },
  { id: '6', title: "Quantum Computing: The Next Frontier in Tech", snippet: "Experts discuss the potential of quantum computing and its implications for various industries.", imageUrl: "https://placehold.co/600x400.png", source: "Wired", date: "Oct 22, 2023", category: "Tech & AI", link: "#", dataAiHint: "quantum computer chip" },
  { id: '7', title: "Series B Funding Skyrockets for HealthTech Company 'WellLife'", snippet: "'WellLife' has successfully raised $50M in Series B funding to expand its innovative healthcare platform.", imageUrl: "https://placehold.co/600x400.png", source: "VentureBeat", date: "Oct 21, 2023", category: "Funding Rounds", link: "#", dataAiHint: "medical app interface" },
  { id: '8', title: "Navigating Market Volatility: Tips for Investors", snippet: "Financial analysts provide insights on how to manage investments during periods of market uncertainty.", imageUrl: "https://placehold.co/600x400.png", source: "Wall Street Journal", date: "Oct 20, 2023", category: "Stock Market Updates", link: "#", dataAiHint: "financial advisor consultation" },
  { id: '9', title: "New Mobile App 'ConnectSphere' Revolutionizes Social Networking for Professionals", snippet: "ConnectSphere launches, offering a new take on professional networking with AI-powered matchmaking.", imageUrl: "https://placehold.co/600x400.png", source: "App Developer Monthly", date: "Oct 27, 2023", category: "Startup News", link: "#", dataAiHint: "mobile app screen" },
  { id: '10', title: "AI Ethics: Navigating the Moral Landscape of Artificial Intelligence", snippet: "A panel of experts discusses the ethical considerations in the rapid development of AI technologies.", imageUrl: "https://placehold.co/600x400.png", source: "AI Ethics Today", date: "Oct 28, 2023", category: "Tech & AI", link: "#", dataAiHint: "AI ethics concept" },
];

const newsCategories: NewsItem["category"][] = ["Startup News", "Stock Market Updates", "Funding Rounds", "Tech & AI"];

export function NewsTabs() {
  const [newsItems, setNewsItems] = useState<Record<NewsItem["category"], NewsItem[]>>({
    "Startup News": [],
    "Stock Market Updates": [],
    "Funding Rounds": [],
    "Tech & AI": [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    setTimeout(() => {
      const categorizedNews: Record<NewsItem["category"], NewsItem[]> = {
        "Startup News": [],
        "Stock Market Updates": [],
        "Funding Rounds": [],
        "Tech & AI": [],
      };
      mockNewsData.forEach(item => {
        if (categorizedNews[item.category]) {
          categorizedNews[item.category].push(item);
        }
      });
      setNewsItems(categorizedNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Tabs defaultValue={newsCategories[0]} className="w-full animate-fade-in-up">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
        {newsCategories.map(category => (
          <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
        ))}
      </TabsList>
      {newsCategories.map(category => (
        <TabsContent key={category} value={category}>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="flex flex-col h-full">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader className="pb-3"><Skeleton className="h-6 w-3/4" /></CardHeader>
                  <CardContent className="flex-grow pb-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                  <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(newsItems[category].length > 0 ? newsItems[category] : mockNewsData.filter(item => item.category === "Startup News") /* fallback */ ).slice(0,8).map((item, index) => (
                <NewsCard key={item.id} item={item} animationDelay={`${index * 100}ms`} />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
