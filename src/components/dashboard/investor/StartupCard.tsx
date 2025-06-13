
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Startup } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Tag } from "lucide-react";

interface StartupCardProps {
  startup: Startup;
  animationDelay?: string;
}

export function StartupCard({ startup, animationDelay = "0ms" }: StartupCardProps) {
  return (
    <Card 
      className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up transform hover:scale-105" 
      style={{ animationDelay }}
    >
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <Image
          src={startup.logoUrl || "https://placehold.co/80x80.png?text=Logo"}
          alt={`${startup.name} logo`}
          width={60}
          height={60}
          className="rounded-lg border"
          data-ai-hint="company logo"
        />
        <div>
          <CardTitle className="text-xl font-headline mb-1">{startup.name}</CardTitle>
          <CardDescription className="text-sm">{startup.industry}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{startup.summary}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <Badge variant="outline">{startup.stage}</Badge>
        </div>
        {startup.tags && startup.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {startup.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="mr-1 h-3 w-3" />{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/startups/${startup.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

