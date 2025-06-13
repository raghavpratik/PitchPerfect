
// src/app/notifications/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react"; // Changed from Heart to Bell for typical notifications

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Bell className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-4">Notifications</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with important activities and alerts. Your notifications will appear here.
        </p>
      </div>
      
      <Card className="w-full max-w-2xl mx-auto animate-fade-in-up">
        <CardHeader>
          <CardTitle>No New Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You're all caught up! Check back later for new updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
