"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { DollarSign, CreditCard, User, CalendarIcon, Lock } from 'lucide-react';

export function PaymentPlaceholder() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid amount.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({ title: "Payment Successful (Placeholder)", description: `Successfully processed payment of $${amount}.` });
    setAmount('');
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center"><DollarSign className="mr-2 h-6 w-6 text-primary"/> Make an Investment (Placeholder)</CardTitle>
        <CardDescription>This is a placeholder for processing investments. No real transactions will occur.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="amount">Investment Amount ($)</Label>
          <div className="relative mt-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="cardName">Name on Card</Label>
           <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="cardName" placeholder="John Doe" className="pl-10" />
          </div>
        </div>
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="relative mt-1">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="cardNumber" placeholder="•••• •••• •••• ••••" className="pl-10" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
             <div className="relative mt-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="expiryDate" placeholder="MM/YY" className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="cvc">CVC</Label>
             <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="cvc" placeholder="•••" className="pl-10" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePayment} disabled={isLoading}>
          {isLoading ? 'Processing...' : `Invest $${amount || '0'}`}
        </Button>
      </CardFooter>
    </Card>
  );
}
