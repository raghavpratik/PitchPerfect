
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Loader2, UploadCloud, BrainCircuit, Sparkles, FileImage, Wand2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { enhancePrompt } from '../../ai/flows/pitchpad-enhance-prompt.ts';
import { generateImageFromPrompt } from '../../ai/flows/pitchpad-generate-image.ts';

const mockIdeas = [
  { id: '1', title: 'AI-Powered Recipe Generator for Dietary Restrictions', description: 'An app that creates custom recipes based on user-inputted dietary needs, allergies, and available ingredients.' },
  { id: '2', title: 'Sustainable Fashion Swap Platform', description: 'A community-based platform for users to swap high-quality clothing items, promoting circular fashion.' },
  { id: '3', title: 'Gamified Language Learning App for Niche Languages', description: 'Learn less common languages through interactive games and cultural storytelling.' },
  { id: '4', title: 'Hyperlocal Delivery Service for Small Farms', description: 'Connecting local farms directly with consumers for fresh produce delivery within a small radius.' },
];

export default function FounderDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const [ideaPrompt, setIdeaPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoadingEnhance, setIsLoadingEnhance] = useState(false);
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    } else if (user?.role !== 'founder') {
      router.push('/investor-dashboard'); 
    }
  }, [isLoggedIn, user, router]);

  const handleEnhancePrompt = async () => {
    if (!ideaPrompt.trim()) {
      toast({ title: "Empty Prompt", description: "Please enter your idea first.", variant: "destructive" });
      return;
    }
    setIsLoadingEnhance(true);
    setEnhancedPrompt('');
    try {
      const result = await enhancePrompt({ originalPrompt: ideaPrompt });
      setEnhancedPrompt(result.enhancedPrompt);
      toast({ title: "Prompt Enhanced!", description: "Your idea has been refined by AI." });
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      toast({ title: "Enhancement Failed", description: "Could not enhance prompt. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingEnhance(false);
    }
  };

  const handleGenerateImage = async () => {
    const promptToUse = enhancedPrompt || ideaPrompt;
    if (!promptToUse.trim()) {
      toast({ title: "Empty Prompt", description: "Please enter or enhance your idea first.", variant: "destructive" });
      return;
    }
    setIsLoadingGenerate(true);
    setGeneratedImageUrl(null);
    try {
      const result = await generateImageFromPrompt({ prompt: promptToUse });
      setGeneratedImageUrl(result.imageUrl); 
      if (result.revisedPrompt) {
        setEnhancedPrompt(result.revisedPrompt);
         toast({ title: "Image Generated!", description: "AI also revised the prompt slightly for this image." });
      } else {
        toast({ title: "Image Generated!", description: "Your vision, visualized by AI." });
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({ title: "Image Generation Failed", description: "Could not generate image. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingGenerate(false);
    }
  };

  if (!isLoggedIn || user?.role !== 'founder') {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-12">
      <section className="animate-fade-in-up">
        <Card className="shadow-xl border-primary/20">
          <CardHeader className="text-center">
            <BrainCircuit className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-bold font-headline">Spark Your Vision</CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-xl mx-auto">
              Unleash your next big idea. Describe it, let AI enhance it, and visualize it instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Describe your startup idea, a feature, or a concept... Let your imagination flow!"
              value={ideaPrompt}
              onChange={(e) => {
                setIdeaPrompt(e.target.value);
                if (enhancedPrompt) setEnhancedPrompt(''); 
                if (generatedImageUrl) setGeneratedImageUrl(null); 
              }}
              rows={5}
              className="text-base p-4 focus:ring-2 focus:ring-primary/50"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleEnhancePrompt} disabled={isLoadingEnhance || !ideaPrompt.trim()} className="flex-1 group">
                {isLoadingEnhance ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                )}
                Enhance Prompt with AI
              </Button>
              <Button onClick={handleGenerateImage} disabled={isLoadingGenerate || !ideaPrompt.trim()} className="flex-1 group">
                {isLoadingGenerate ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileImage className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                )}
                Generate Image with AI
              </Button>
            </div>
             <Button variant="outline" className="w-full group">
                <UploadCloud className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Upload Photo (Placeholder)
            </Button>

            {enhancedPrompt && (
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center"><Wand2 className="mr-2 h-5 w-5 text-primary"/> AI-Enhanced Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic whitespace-pre-wrap">{enhancedPrompt}</p>
                </CardContent>
              </Card>
            )}

            {isLoadingGenerate && (
              <div className="text-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground mt-2">Generating your vision...</p>
              </div>
            )}

            {generatedImageUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center"><FileImage className="mr-2 h-5 w-5 text-primary"/> Generated Image</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Image
                    src={generatedImageUrl} 
                    alt="AI Generated Image for startup idea"
                    width={512}
                    height={512}
                    className="rounded-md border shadow-md object-contain"
                    data-ai-hint="startup concept art"
                  />
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="animate-fade-in-up" style={{animationDelay: "200ms"}}>
        <div className="flex items-center mb-6">
          <Sparkles className="h-8 w-8 text-primary mr-3" />
          <h2 className="text-2xl md:text-3xl font-bold font-headline">Recent Sparks & Community Ideas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockIdeas.map((idea, index) => (
            <Card key={idea.id} className="hover:shadow-lg transition-shadow transform hover:scale-105">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{idea.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{idea.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
