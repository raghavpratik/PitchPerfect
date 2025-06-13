
// src/app/profile-settings/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { UserCog } from "lucide-react";

export default function ProfileSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <UserCog className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-4">Profile Settings</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your account details and preferences.
        </p>
      </div>
      
      <Card className="w-full max-w-2xl mx-auto animate-fade-in-up">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your personal information and role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={user?.name || ""} placeholder="Your Name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email || ""} placeholder="your@email.com" disabled />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""} disabled />
          </div>
          <Button className="w-full">Save Changes (Placeholder)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
