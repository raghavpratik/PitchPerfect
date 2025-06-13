
"use client";

import React, { useEffect, useState, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose, // Added for potential close button inside
} from "@/components/ui/sheet"; // Changed from Dialog
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { getPersonalizedSuggestions } from '@/ai/flows/pitchpad-chatbot-suggestions';
import type { PersonalizedSuggestionsInput, PersonalizedSuggestionsOutput } from '@/ai/flows/pitchpad-chatbot-suggestions';
import { BrainCircuit, Send, User as UserIcon, MessageSquare } from 'lucide-react'; // Changed Bot to BrainCircuit
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isSuggestion?: boolean;
}

interface NarratoSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function NarratoSheet({ isOpen, onOpenChange }: NarratoSheetProps) {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const narratoTitle = user?.role === 'founder'
    ? "Narrato - Craft your startup narrative"
    : user?.role === 'investor'
      ? "Narrato - Uncover investment stories"
      : "Narrato - Your AI Assistant";
  
  const initialBotMessage = user?.role === 'founder'
    ? "Hello Founder! I'm Narrato. How can I assist with your pitch today? Here are some ideas:"
    : user?.role === 'investor'
      ? "Greetings Investor! Narrato here. Looking for the next big thing? Here's how I can help:"
      : "Hi there! I'm Narrato. How can I help you navigate PitchPerfect?";

  useEffect(() => {
    if (isOpen) {
      // Set initial bot message as soon as the sheet opens
      setMessages([{
        id: Date.now().toString(),
        text: initialBotMessage,
        sender: 'bot'
      }]);

      const fetchSuggestions = async () => {
        setIsLoadingSuggestions(true);
        try {
          const input: PersonalizedSuggestionsInput = {
            userType: user?.role || 'founder', 
          };
          const result: PersonalizedSuggestionsOutput = await getPersonalizedSuggestions(input);
          setSuggestions(result.suggestions);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]); // Set to empty array, no error message in chat
        } finally {
          setIsLoadingSuggestions(false);
        }
      };
      fetchSuggestions();
    } else {
      // Reset state when sheet closes
      setMessages([]);
      setSuggestions([]);
      setInputText('');
      setIsLoadingSuggestions(true); // Reset loading state for next open
    }
  }, [isOpen, user?.role, initialBotMessage]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollableView = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollableView) {
        scrollableView.scrollTop = scrollableView.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const currentText = textToSend || inputText;
    if (currentText.trim() === '') return;

    const newUserMessage: Message = { 
      id: Date.now().toString(), 
      text: currentText, 
      sender: 'user' 
    };
    
    let botResponseText = '';
    const lowerCaseText = currentText.toLowerCase();

    const creatorQueries = [
      "who created you", "who made you", "who developed you", "who designed you",
      "who built this app", "who coded this", "who's behind this project",
      "who’s the maker", "developer of this site", "designer of pitchperfect",
      "founder of pitchperfect", "made by whom", "who is the creator of this",
      "created by whom", "who’s your creator", "credits?", "show developer info",
      "who’s running this", "who launched this site", "who owns this project"
    ];

    const teamQueries = [
      "who are the people behind pitchperfect", "what’s the team like",
      "who are the co-founders", "show me the core team",
      "team members of this project", "who contributed to this project"
    ];

    if (creatorQueries.some(query => lowerCaseText.includes(query))) {
      botResponseText = "PitchPerfect is Design & Developed by raghavpratik.";
    } else if (teamQueries.some(query => lowerCaseText.includes(query))) {
      botResponseText = "Here’s the founding team of PitchPerfect:\n\n👑 Raghav Pratik – Founder & CEO\n🎯 Muskan Sharma – Co-Founder & Chief Product Officer\n💡 Naman Bhojwani – Co-Founder & Chief Technology Officer";
    }
     else if (lowerCaseText.includes("hello") || lowerCaseText.includes("hi")) {
      botResponseText = `Hello there! How can I assist you with PitchPerfect today?`;
    } else {
      // In a real app, this would call a Genkit flow for chat
      botResponseText = `I've received your message: "${currentText}". My full conversational abilities are still under development, but I'm learning fast!`;
    }

    const botResponse: Message = { 
      id: (Date.now() + 1).toString(), 
      text: botResponseText, 
      sender: 'bot' 
    };
    
    setMessages(prev => [...prev, newUserMessage, botResponse]);
    if (!textToSend) { // Clear input only if it wasn't a suggestion click
      setInputText('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md w-full flex flex-col p-0">
        <SheetHeader className="p-4 pb-2 border-b">
          <SheetTitle className="flex items-center text-xl font-headline">
            <BrainCircuit className="mr-2 h-7 w-7 text-primary" /> {narratoTitle}
          </SheetTitle>
          <SheetDescription className="text-xs">
            Your AI-powered guide on PitchPerfect.
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-grow h-[calc(100vh-200px)]" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <BrainCircuit className="h-6 w-6 text-primary flex-shrink-0 self-start" />}
                <div className={`max-w-[85%] rounded-lg p-3 text-sm shadow-md whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && <UserIcon className="h-6 w-6 text-muted-foreground flex-shrink-0 self-start" />}
              </div>
            ))}
            {isLoadingSuggestions && messages.length <= 1 && ( // Only show skeleton if it's initial load and only bot greeting is present
              <div className="space-y-2 pt-2">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-5/6 rounded-md" />
                <Skeleton className="h-10 w-3/4 rounded-md" />
              </div>
            )}
            {!isLoadingSuggestions && suggestions.length > 0 && messages.length <=1 && ( // Only show initial suggestions if no other interaction
               <div className="pt-4 space-y-2">
                 <p className="text-xs text-muted-foreground mb-2">Or try one of these:</p>
                 {suggestions.map((suggestion, index) => (
                    <Button 
                        key={index} 
                        variant="outline" 
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2" 
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4 text-primary/80 flex-shrink-0"/>
                      {suggestion}
                    </Button>
                  ))}
               </div>
            )}
          </div>
        </ScrollArea>

        <SheetFooter className="p-4 pt-2 border-t bg-background">
          <div className="flex w-full items-center space-x-2">
            <Input 
              placeholder="Ask Narrato..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); }}}
              className="flex-1"
            />
            <Button onClick={() => handleSend()} size="icon" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
