"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, User, Briefcase } from 'lucide-react';
import Image from 'next/image';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['founder', 'investor'], { required_error: 'You must select a role' }),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function AuthForm({ mode }: AuthFormProps) {
  const { login, user, setUserRole: setContextUserRole } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') as 'founder' | 'investor' | null;
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'founder' | 'investor' | undefined>(initialRole || user?.role || undefined);

  const formSchema = mode === 'signup' ? signUpSchema : signInSchema;
  type FormValues = typeof mode extends 'signup' ? SignUpFormValues : SignInFormValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === 'signup'
      ? { email: '', password: '', role: initialRole || undefined, name: '' }
      : { email: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (mode === 'signup') {
      const signupValues = values as SignUpFormValues;
      login({ id: Date.now().toString(), email: signupValues.email, role: signupValues.role, name: signupValues.name });
      toast({ title: "Account Created!", description: "Welcome to PitchPad." });
      router.push(signupValues.role === 'founder' ? '/founder-dashboard' : '/investor-dashboard');
    } else {
      const signinValues = values as SignInFormValues;
      // In a real app, you'd fetch the user's role here
      // For mock, we'll use the last selected role or default to founder
      const userRole = user?.role || 'founder';
      login({ id: Date.now().toString(), email: signinValues.email, role: userRole });
      toast({ title: "Signed In!", description: "Welcome back to PitchPad." });
      router.push(userRole === 'founder' ? '/founder-dashboard' : '/investor-dashboard');
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const roleToLogin = selectedRole || 'founder'; // Default to founder if no role selected for Google sign in
    login({ id: 'google-user', email: 'user@google.com', role: roleToLogin, name: 'Google User' });
    toast({ title: "Signed In with Google!", description: "Welcome to PitchPad." });
    router.push(roleToLogin === 'founder' ? '/founder-dashboard' : '/investor-dashboard');
    setIsLoading(false);
  };
  
  React.useEffect(() => {
    if (mode === 'signup' && initialRole) {
      form.setValue('role' as any, initialRole); // 'role' exists only in SignUpFormValues
      setSelectedRole(initialRole);
      setContextUserRole(initialRole);
    }
  }, [mode, initialRole, form, setContextUserRole]);


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] py-12">
      <Card className="w-full max-w-md shadow-xl animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">
            {mode === 'signin' ? 'Welcome Back!' : 'Create Your Account'}
          </CardTitle>
          <CardDescription>
            {mode === 'signin' ? 'Sign in to access your dashboard.' : 'Join PitchPad as a founder or investor.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {mode === 'signup' && (
                <>
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Your Name" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>I am a...</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value: 'founder' | 'investor') => {
                              field.onChange(value);
                              setSelectedRole(value);
                              setContextUserRole(value);
                            }}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="founder" />
                              </FormControl>
                              <FormLabel className="font-normal">Founder</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="investor" />
                              </FormControl>
                              <FormLabel className="font-normal">Investor</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="email" placeholder="you@example.com" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
              <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-2" data-ai-hint="google logo" />
            }
            Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="link" asChild>
              <a href={mode === 'signin' ? '/signup' : '/signin'} className="font-semibold text-primary">
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </a>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
