
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Startup, StartupStage } from '@/types';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { UploadCloud, Loader2 } from 'lucide-react';

const startupSchema = z.object({
  name: z.string().min(2, "Startup name must be at least 2 characters."),
  industry: z.string().min(1, "Please select an industry."),
  stage: z.enum(["Idea", "Pre-Seed", "Seed", "MVP", "Growth", "Series A", "Series B+", "Acquired", "Others"], { required_error: "Please select a stage." }),
  summary: z.string().min(50, "Pitch summary must be at least 50 characters.").max(500, "Summary cannot exceed 500 characters."),
  logoUrl: z.string().optional(),
});

type StartupFormValues = z.infer<typeof startupSchema>;

interface StartupFormProps {
  initialData?: Partial<Startup>;
  onSubmitSuccess?: (data: Startup) => void;
}

const industries = [
  "Tech", "Healthcare", "Finance", "Education", "E-commerce", "Sustainability", 
  "AI", "Robotics", "Biotech", "Clean Energy", "Web3", "Gaming", "SaaS", 
  "Creator Economy", "Food & Beverage", "Travel & Hospitality", "Real Estate", 
  "Fashion", "Logistics", "Entertainment", "Quantum Computing", "Space Tech", "Cybersecurity", "Others"
];
const stages: StartupStage[] = ["Idea", "Pre-Seed", "Seed", "MVP", "Growth", "Series A", "Series B+", "Acquired", "Others"];

export function StartupForm({ initialData, onSubmitSuccess }: StartupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logoUrl || null);

  const form = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      name: initialData?.name || '',
      industry: initialData?.industry || '',
      stage: initialData?.stage || undefined,
      summary: initialData?.summary || '',
      logoUrl: initialData?.logoUrl || '',
    },
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        form.setValue('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: StartupFormValues) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const processedData: Startup = {
      id: initialData?.id || Date.now().toString(),
      founderId: initialData?.founderId || 'current-user-id', // This should be replaced with actual user ID
      ...values,
      logoUrl: logoPreview || 'https://placehold.co/100x100.png', // Default placeholder
    };
    
    toast({ title: "Startup Profile Saved!", description: `${values.name} details have been updated.` });
    if (onSubmitSuccess) onSubmitSuccess(processedData);
    setIsLoading(false);
  };

  return (
    <Card className="w-full animate-fade-in-up">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {initialData?.name ? `Edit ${initialData.name}` : "Create Your Startup Profile"}
        </CardTitle>
        <CardDescription>
          Share your vision. Attract investors. Let's get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 flex flex-col items-center">
                <FormLabel>Startup Logo</FormLabel>
                <div className="mt-2 w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden bg-muted hover:bg-muted/80 transition-colors">
                  {logoPreview ? (
                    <Image src={logoPreview} alt="Logo Preview" layout="fill" objectFit="contain" data-ai-hint="startup logo"/>
                  ) : (
                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                  )}
                  <Input
                    id="logoUpload"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>
                <FormDescription className="text-center mt-2">Click to upload (Max 2MB)</FormDescription>
                 <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                        <FormItem className="sr-only">
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>
              <div className="md:col-span-2 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Startup Name</FormLabel>
                      <FormControl><Input placeholder="e.g., InnovateX Solutions" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {industries.map(industry => <SelectItem key={industry} value={industry}>{industry}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {stages.map(stage => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pitch Summary</FormLabel>
                  <FormControl><Textarea placeholder="Briefly describe your startup, problem, solution, and market (max 500 characters)." {...field} rows={5} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData?.id && initialData.name ? "Save Changes" : "Create Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
