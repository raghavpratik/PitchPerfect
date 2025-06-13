
"use client"; // Make this a client component to use hooks

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Rocket, Users, TrendingUp, Lightbulb, MessageSquare, ShieldCheck, BarChartBig, Newspaper, LayoutGrid, BrainCircuit, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth

export default function HomePage() {
  const { isLoggedIn, user } = useAuth(); // Get auth state

  const ignitePitchHref = (isLoggedIn && user?.role === 'founder') ? '/founder-dashboard' : '/signup?role=founder';
  const discoverStartupsHref = (isLoggedIn && user?.role === 'investor') ? '/investor-dashboard' : '/signup?role=investor';

  return (
    <div className="flex flex-col items-center space-y-16 md:space-y-24">
      {/* Top Branding */}
      <section className="w-full pt-8 text-center animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">
          <span className="text-accent-foreground">PitchPerfect Ltd.</span>
        </h1>
      </section>

      {/* Hero Section */}
      <section className="w-full text-center animate-fade-in-up">
        <div className="container mx-auto px-4">
          <Rocket className="h-20 w-20 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-bold font-headline mb-6 tracking-tight">
            Welcome to <span className="text-primary">PitchPerfect</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            The ultimate launchpad where visionary founders ignite their ideas with AI, and insightful investors discover the next wave of innovation. Let's build the future, together. ✨
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={ignitePitchHref}>Ignite Your Pitch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={discoverStartupsHref}>Discover Startups</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is PitchPerfect Section */}
      <section id="about" className="w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-4">What is PitchPerfect?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">An ecosystem designed to empower groundbreaking ideas and foster impactful connections. We bridge the gap between creativity and capital.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-fade-in-up bg-card/80 backdrop-blur-sm" style={{animationDelay: `100ms`}}>
              <CardHeader>
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-10 w-10 text-primary mr-4" />
                  <CardTitle className="font-headline text-2xl">For Founders 🚀</CardTitle>
                </div>
                <CardDescription>Turn your spark into a flame. PitchPerfect provides the tools to refine, visualize, and present your startup vision like never before.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <BrainCircuit className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">AI-Powered Idea Enhancement</h4>
                    <p className="text-sm text-muted-foreground">Describe your idea, and let our AI, Narrato, help you craft a more compelling and detailed prompt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LayoutGrid className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Visualize Your Concept</h4>
                    <p className="text-sm text-muted-foreground">Instantly generate images based on your idea to bring your vision to life.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Showcase & Connect</h4>
                    <p className="text-sm text-muted-foreground">Build a stunning startup profile and get discovered by investors actively seeking innovation.</p>
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                    <Image src="https://placehold.co/600x400.png" alt="Founder using PitchPerfect" width={500} height={300} className="rounded-lg shadow-md" data-ai-hint="founder planning startup"/>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-fade-in-up bg-card/80 backdrop-blur-sm" style={{animationDelay: `200ms`}}>
              <CardHeader>
                 <div className="flex items-center mb-3">
                  <Search className="h-10 w-10 text-primary mr-4" />
                  <CardTitle className="font-headline text-2xl">For Investors 💼</CardTitle>
                </div>
                <CardDescription>Discover the unseen. Access a curated pipeline of innovative startups and find your next high-growth opportunity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Curated Deal Flow</h4>
                    <p className="text-sm text-muted-foreground">Explore a diverse range of startups, vetted for potential and innovation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChartBig className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Advanced Filtering & Insights</h4>
                    <p className="text-sm text-muted-foreground">Efficiently find startups matching your criteria with smart filters and market insights.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Direct & Secure Communication</h4>
                    <p className="text-sm text-muted-foreground">Connect directly with founders to discuss opportunities and streamline due diligence (messaging coming soon!).</p>
                  </div>
                </div>
                 <div className="flex justify-center pt-4">
                    <Image src="https://placehold.co/600x400.png" alt="Investor reviewing startups" width={500} height={300} className="rounded-lg shadow-md" data-ai-hint="investor dashboard analytics"/>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Dashboard Advantage Section */}
      <section className="w-full py-16 md:py-24 bg-secondary/30 dark:bg-secondary/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">The Dashboard Advantage 💡</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
            <div className="flex flex-col items-center animate-fade-in-up" style={{animationDelay: `300ms`}}>
              <Image src="https://placehold.co/600x350.png" alt="Founder Dashboard Preview" width={500} height={290} className="rounded-lg shadow-xl mb-6" data-ai-hint="founder dashboard mockup"/>
              <h3 className="text-xl font-semibold font-headline mb-2">Founder's Command Center</h3>
              <p className="text-muted-foreground">From sparking initial ideas with AI to building a comprehensive startup profile, your dashboard is where your vision takes shape and meets opportunity.</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{animationDelay: `400ms`}}>
              <Image src="https://placehold.co/600x350.png" alt="Investor Dashboard Preview" width={500} height={290} className="rounded-lg shadow-xl mb-6" data-ai-hint="investor dashboard interface"/>
              <h3 className="text-xl font-semibold font-headline mb-2">Investor's Discovery Hub</h3>
              <p className="text-muted-foreground">Navigate a dynamic landscape of startups, utilize powerful filters, track promising ventures, and gain market insights, all in one place.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stay Informed Section */}
      <section className="w-full">
        <div className="container mx-auto px-4 text-center">
            <Newspaper className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Stay Informed 📰</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Catch the latest buzz from the startup world, financial markets, and tech innovations. Knowledge is power.
            </p>
            <Button size="lg" variant="outline" asChild>
                <Link href="/news">Explore Latest News</Link>
            </Button>
        </div>
      </section>


      {/* Call to Action Section */}
      <section id="join" className="w-full text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to Make Your Mark?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Join PitchPerfect today. Your next breakthrough, whether founding or funding, is just a click away.
          </p>
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/signup">Join PitchPerfect Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
