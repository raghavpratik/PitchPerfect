
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Rocket, Users, TrendingUp, Lightbulb, MessageSquare, ShieldCheck, BarChartBig } from "lucide-react";

const features = [
  {
    icon: <Rocket className="h-10 w-10 text-primary mb-4" />,
    title: "Launch Your Vision",
    description: "Founders: Sculpt stunning profiles, share compelling pitch decks, and captivate the right audience.",
    link: "/signup?role=founder",
    linkText: "Start as a Founder"
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: "Unearth Opportunities",
    description: "Investors: Discover a curated selection of disruptive startups. Filter, analyze, and ignite the next unicorn.",
    link: "/signup?role=investor",
    linkText: "Explore as an Investor"
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />,
    title: "Chart Your Ascent",
    description: "Track your startup's evolution from spark to scale. Keep stakeholders engaged with visual progress.",
    link: "/founder-dashboard", 
    linkText: "Visualize Your Milestones"
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary mb-4" />,
    title: "AI-Driven Insights",
    description: "Our intelligent chatbot delivers tailored suggestions, guiding you effortlessly through PitchPerfect.",
    link: "#chatbot", 
    linkText: "Engage Your AI Co-Pilot"
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 text-center bg-transparent animate-fade-in-up"> {/* Removed gradient, body has it */}
        <div className="container mx-auto px-4">
          <Rocket className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 tracking-tight">
            Welcome to <span className="text-primary">PitchPerfect</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Where visionary founders meet insightful investors. PitchPerfect is your launchpad to success. Let's craft the future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup?role=founder">Ignite Your Pitch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup?role=investor">Discover Startups</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-4">Why PitchPerfect?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Fueling innovation with precision tools for breakthrough success.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up bg-card/80 backdrop-blur-sm" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader>
                  <div className="flex justify-center">{feature.icon}</div>
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-24 bg-secondary/30 dark:bg-secondary/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Your Journey to Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center animate-fade-in-up" style={{animationDelay: `600ms`}}>
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Lightbulb className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold font-headline mb-2">1. Register & Define</h3>
              <p className="text-muted-foreground">Select your path. Founders: shape your profile. Investors: set your focus.</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{animationDelay: `700ms`}}>
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <BarChartBig className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold font-headline mb-2">2. Showcase or Scout</h3>
              <p className="text-muted-foreground">Founders: present your innovation. Investors: explore curated opportunities.</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{animationDelay: `800ms`}}>
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold font-headline mb-2">3. Connect & Catalyze</h3>
              <p className="text-muted-foreground">Forge partnerships. Ignite discussions. Accelerate growth together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="w-full py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to Make Your Mark?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Join PitchPerfect today. Your next breakthrough, whether founding or funding, starts here.
          </p>
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/signup">Join PitchPerfect Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
