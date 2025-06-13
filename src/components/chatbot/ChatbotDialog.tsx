"use client";

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { getPersonalizedSuggestions } from '@/ai/flows/pitchpad-chatbot-suggestions';
import type { PersonalizedSuggestionsInput, PersonalizedSuggestionsOutput } from '@/ai/flows/pitchpad-chatbot-suggestions';
import { Bot, Send, User as UserIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ChatbotDialog({ isOpen, onOpenChange }: ChatbotDialogProps) {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchSuggestions = async () => {
        setIsLoadingSuggestions(true);
        try {
          const input: PersonalizedSuggestionsInput = {
            userType: user?.role || 'founder', // Default to founder if no user/role
          };
          const result: PersonalizedSuggestionsOutput = await getPersonalizedSuggestions(input);
          setSuggestions(result.suggestions);
          
          // Add initial bot message with suggestions
          setMessages([{
            id: Date.now().toString(),
            text: "Hi there! How can I help you today? Here are some things you can do:",
            sender: 'bot'
          }]);

        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions(["Sorry, I couldn't load suggestions right now."]);
           setMessages([{
            id: Date.now().toString(),
            text: "Sorry, I couldn't load suggestions right now.",
            sender: 'bot'
          }]);
        } finally {
          setIsLoadingSuggestions(false);
        }
      };
      fetchSuggestions();
    } else {
      // Reset messages when dialog closes
      setMessages([]);
      setSuggestions([]);
    }
  }, [isOpen, user?.role]);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    const newUserMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
    // Placeholder bot response
    const botResponse: Message = { id: (Date.now() + 1).toString(), text: `I received: "${inputText}". I am still learning!`, sender: 'bot' };
    setMessages(prev => [...prev, newUserMessage, botResponse]);
    setInputText('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    const newUserMessage: Message = { id: Date.now().toString(), text: suggestion, sender: 'user' };
    // Placeholder bot response for suggestion
    const botResponse: Message = { id: (Date.now() + 1).toString(), text: `Okay, let's explore "${suggestion}"! (This feature is coming soon)`, sender: 'bot' };
    setMessages(prev => [...prev, newUserMessage, botResponse]);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center font-headline">
            <Bot className="mr-2 h-6 w-6 text-primary" /> PitchPerfect AI Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me anything or choose a suggestion below.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] p-6 pt-0">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                <div className={`max-w-[75%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && <UserIcon className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
              </div>
            ))}
            {isLoadingSuggestions && (
              <div className="space-y-2 pt-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            )}
            {!isLoadingSuggestions && suggestions.length > 0 && messages.length === 1 && ( // Only show initial suggestions if no other interaction
               <div className="pt-2 space-y-2">
                 {suggestions.map((suggestion, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start" onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion}
                    </Button>
                  ))}
               </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-2 border-t">
          <div className="flex w-full items-center space-x-2">
            <Input 
              placeholder="Type your message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
