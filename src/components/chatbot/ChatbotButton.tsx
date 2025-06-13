
"use client";
import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react'; // Changed from MessageSquare
import { Button } from '@/components/ui/button';
import { NarratoSheet } from './NarratoSheet'; 

export function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary" // Changed to primary to use the theme's primary color
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 group hover:scale-110 transition-transform duration-200"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open Narrato assistant"
      >
        <BrainCircuit className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[15deg]" />
      </Button>
      <NarratoSheet isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
