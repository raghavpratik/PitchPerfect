"use client";

import type { PricingTier } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const tiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Basic Founder',
    price: '$0/month',
    features: [
      'Standard startup listing',
      'Upload pitch deck & video',
      'Basic analytics',
      'Community access'
    ],
  },
  {
    id: 'premium',
    name: 'Premium Founder',
    price: '$29/month',
    features: [
      'Everything in Basic',
      'Priority listing',
      'Enhanced profile visibility',
      'Advanced analytics',
      'Direct investor outreach (3/mo)'
    ],
    highlight: true,
  },
  {
    id: 'investor_pro',
    name: 'Investor Pro',
    price: '$49/month',
    features: [
      'Unlimited startup browsing',
      'Advanced filtering tools',
      'Direct contact with founders',
      'Early access to new listings',
      'Personalized deal flow'
    ],
  },
];

export function PricingTiers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier, index) => (
        <Card 
          key={tier.id} 
          className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up ${tier.highlight ? 'border-primary border-2 relative ring-2 ring-primary shadow-primary/20' : ''}`}
          style={{animationDelay: `${index * 100}ms`}}
        >
          {tier.highlight && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
              Most Popular
            </div>
          )}
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-headline">{tier.name}</CardTitle>
            <CardDescription className="text-3xl font-bold text-primary pt-2">{tier.price}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm text-muted-foreground">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className={`w-full ${tier.highlight ? '' : 'bg-accent text-accent-foreground hover:bg-accent/90'}`} size="lg">
              Choose {tier.name}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
