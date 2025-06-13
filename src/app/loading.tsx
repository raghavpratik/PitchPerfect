
"use client";

import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in-up">
      <div className="flex flex-col items-center gap-6 p-10 rounded-xl bg-card shadow-2xl">
        <div className="relative">
          <Loader2 className="h-20 w-20 animate-spin text-primary" />
          <Image 
            src="https://placehold.co/40x40.png?text=🚀" // Placeholder for a small logo or icon
            alt="PitchPerfect Loading" 
            width={32} 
            height={32} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            data-ai-hint="rocket icon"
          />
        </div>
        <h2 className="text-2xl font-headline font-semibold text-foreground">Igniting Brilliance...</h2>
        <p className="text-md text-muted-foreground max-w-xs text-center">
          Just a moment while PitchPerfect prepares your launchpad to success!
        </p>
      </div>
    </div>
  );
}
