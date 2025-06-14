
// src/app/messages/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { Users, MessageCircle, BrainCircuit } from "lucide-react"; // Added BrainCircuit

export default function MessagesPage() {
  // Note: The ChatbotButton for Narrato is globally available.
  // This page will guide users to it and also house P2P messaging (coming soon).
  return (
    <div className="space-y-12">
      <section className="text-center animate-fade-in-up">
        <BrainCircuit className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold font-headline mb-3">Chat with Narrato</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Your AI assistant, Narrato, is always ready to help! Ask questions, get advice on your pitch, or explore investment strategies.
          You can find Narrato by clicking the chat bubble icon at the bottom right of your screen.
        </p>
        <div className="flex justify-center">
          <Image 
            src="https://placehold.co/150x150.png" 
            alt="Narrato AI Assistant Visual" 
            width={150} 
            height={150} 
            className="rounded-full shadow-lg border-2 border-primary/30"
            data-ai-hint="friendly AI assistant face" 
          />
        </div>
      </section>
      
      <Separator className="my-12" />
      
      <section className="text-center animate-fade-in-up" style={{animationDelay: "200ms"}}>
        <Users className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold font-headline mb-3">Connect & Collaborate</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Direct messaging with founders and investors is on its way! Soon, you'll be able to build connections, discuss opportunities, and collaborate right here.
        </p>
        <Card className="w-full max-w-lg mx-auto mt-8 bg-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-center"><MessageCircle className="mr-2"/>Peer-to-Peer Messaging</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is currently under development. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
