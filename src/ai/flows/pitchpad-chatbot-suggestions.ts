// src/ai/flows/pitchpad-chatbot-suggestions.ts
'use server';

/**
 * @fileOverview Provides personalized chatbot suggestions for new users based on their user type and activity.
 *
 * - getPersonalizedSuggestions - A function that returns personalized suggestions for the chatbot.
 * - PersonalizedSuggestionsInput - The input type for the getPersonalizedSuggestions function.
 * - PersonalizedSuggestionsOutput - The return type for the getPersonalizedSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSuggestionsInputSchema = z.object({
  userType: z.enum(['founder', 'investor']).describe('The type of user: founder or investor.'),
  userActivity: z
    .string()
    .optional()
    .describe('A description of the user activity on the platform.'),
});
export type PersonalizedSuggestionsInput = z.infer<typeof PersonalizedSuggestionsInputSchema>;

const PersonalizedSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of personalized suggestions for the chatbot.'),
});
export type PersonalizedSuggestionsOutput = z.infer<typeof PersonalizedSuggestionsOutputSchema>;

export async function getPersonalizedSuggestions(
  input: PersonalizedSuggestionsInput
): Promise<PersonalizedSuggestionsOutput> {
  return personalizedSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSuggestionsPrompt',
  input: {schema: PersonalizedSuggestionsInputSchema},
  output: {schema: PersonalizedSuggestionsOutputSchema},
  prompt: `You are an AI assistant that provides personalized suggestions for a chatbot on a startup pitching platform.

  The user is of type: {{userType}}

  Based on the user type, provide 3 suggestions for the chatbot.

  If the user is a founder, suggest options related to pitching their startup, such as "Want to pitch your startup?", "See tips for a successful pitch", or "Explore funding opportunities".

  If the user is an investor, suggest options related to discovering startups, such as "See trending startups", "Filter startups by industry", or "Explore early-stage investment opportunities".

  Return the suggestions in an array.
  Do not include any other explanation.
  Do not include any greeting.
  Do not include any markdown.
  Do not include any quotations.
  For example:
  [suggestion1, suggestion2, suggestion3]`,
});

const personalizedSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedSuggestionsFlow',
    inputSchema: PersonalizedSuggestionsInputSchema,
    outputSchema: PersonalizedSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
