
// src/ai/flows/pitchpad-enhance-prompt.ts
'use server';
/**
 * @fileOverview Enhances a user's startup idea prompt using AI.
 *
 * - enhancePrompt - A function that takes an original prompt and returns an AI-enhanced version.
 * - EnhancePromptInput - The input type for the enhancePrompt function.
 * - EnhancePromptOutput - The return type for the enhancePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePromptInputSchema = z.object({
  originalPrompt: z.string().describe('The original startup idea or feature description provided by the user.'),
});
export type EnhancePromptInput = z.infer<typeof EnhancePromptInputSchema>;

const EnhancePromptOutputSchema = z.object({
  enhancedPrompt: z.string().describe('An AI-refined, more detailed, or more compelling version of the original prompt.'),
});
export type EnhancePromptOutput = z.infer<typeof EnhancePromptOutputSchema>;

export async function enhancePrompt(input: EnhancePromptInput): Promise<EnhancePromptOutput> {
  return enhancePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceStartupIdeaPrompt',
  input: {schema: EnhancePromptInputSchema},
  output: {schema: EnhancePromptOutputSchema},
  prompt: `You are an expert startup advisor and creative copywriter.
  A founder has provided the following idea or feature description:
  "{{{originalPrompt}}}"

  Your task is to enhance this prompt. Make it more descriptive, compelling, and actionable.
  Consider adding details about:
  - Target audience
  - Key problem solved
  - Unique value proposition
  - Potential innovative angle

  Return only the enhanced prompt text.
  For example, if the input is "A social media app for pets",
  an enhanced prompt could be "A vibrant social media platform exclusively for pet owners to share their furry friends' milestones, connect with local pet services, and discover pet-friendly locations, fostering a supportive community around animal companionship."
  `,
});

const enhancePromptFlow = ai.defineFlow(
  {
    name: 'enhancePromptFlow',
    inputSchema: EnhancePromptInputSchema,
    outputSchema: EnhancePromptOutputSchema,
  },
  async (input: EnhancePromptInput) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model for enhancing prompt.');
    }
    return output;
  }
);
