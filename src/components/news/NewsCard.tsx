"use client";

import Image from "next/image";
import type { NewsItem } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CalendarDays } from "lucide-react";

interface NewsCardProps {
  item: NewsItem;
  animationDelay?: string;
}

export function NewsCard({ item, animationDelay = "0ms" }: NewsCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-fade-in-up" style={{ animationDelay }}>
      <div className="relative w-full h-48">
        <Image
          src={item.imageUrl || "https://placehold.co/600x400.png?text=News"}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint="news article"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-headline leading-tight line-clamp-2">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{item.snippet}</p>
        <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> {item.date} &bull; {item.source}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
