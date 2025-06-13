"use client";
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatbotDialog } from './ChatbotDialog';

export function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open chatbot"
      >
        <MessageSquare className="h-7 w-7" />
      </Button>
      <ChatbotDialog isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
