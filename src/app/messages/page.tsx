
// src/app/messages/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-4">Messages</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with founders and investors. Your conversations will appear here.
        </p>
      </div>
      
      <Card className="w-full max-w-2xl mx-auto animate-fade-in-up">
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The messaging functionality is currently under development. Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
