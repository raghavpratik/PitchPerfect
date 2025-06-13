// pitchpad-pitch-summary.ts
'use server';
/**
 * @fileOverview Generates a compelling pitch summary for founders.
 *
 * - generatePitchSummary - A function that generates a pitch summary from a pitch deck or video link.
 * - GeneratePitchSummaryInput - The input type for the generatePitchSummary function.
 * - GeneratePitchSummaryOutput - The return type for the generatePitchSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePitchSummaryInputSchema = z.object({
  pitchDeckOrVideoLink: z.string().describe('URL of the pitch deck (PDF) or video link.'),
});
export type GeneratePitchSummaryInput = z.infer<typeof GeneratePitchSummaryInputSchema>;

const GeneratePitchSummaryOutputSchema = z.object({
  pitchSummary: z.string().describe('A concise and engaging pitch summary.'),
});
export type GeneratePitchSummaryOutput = z.infer<typeof GeneratePitchSummaryOutputSchema>;

export async function generatePitchSummary(
  input: GeneratePitchSummaryInput
): Promise<GeneratePitchSummaryOutput> {
  return generatePitchSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePitchSummaryPrompt',
  input: {schema: GeneratePitchSummaryInputSchema},
  output: {schema: GeneratePitchSummaryOutputSchema},
  prompt: `You are an expert in creating compelling startup pitch summaries.

  Based on the provided pitch deck or video link, create a concise and engaging pitch summary that highlights the startup's key value proposition, target market, and potential for growth.

  Pitch Deck or Video Link: {{{pitchDeckOrVideoLink}}}
  `,
});

const generatePitchSummaryFlow = ai.defineFlow(
  {
    name: 'generatePitchSummaryFlow',
    inputSchema: GeneratePitchSummaryInputSchema,
    outputSchema: GeneratePitchSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
