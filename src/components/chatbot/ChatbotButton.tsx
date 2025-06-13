
"use client";
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react'; // Or a new Narrato-specific icon if desired for the button itself
import { Button } from '@/components/ui/button';
import { NarratoSheet } from './NarratoSheet'; // Changed from ChatbotDialog

export function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open Narrato assistant"
      >
        <MessageSquare className="h-7 w-7" />
      </Button>
      <NarratoSheet isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}

