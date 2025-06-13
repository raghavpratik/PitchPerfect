
// src/ai/flows/pitchpad-generate-image.ts
'use server';
/**
 * @fileOverview Generates an image from a text prompt using an AI model.
 *
 * - generateImageFromPrompt - A function that takes a text prompt and returns an image URL (data URI).
 * - GenerateImageInput - The input type for the generateImageFromPrompt function.
 * - GenerateImageOutput - The return type for the generateImageFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from. This should be descriptive and evocative.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe("The data URI of the generated image. Format: 'data:image/png;base64,<encoded_data>'."),
  revisedPrompt: z.string().optional().describe("The prompt that was used to generate the image, if revised by the model.")
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImageFromPrompt(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

// Note: Genkit's `ai.generate` with Gemini for image generation currently returns media directly.
// We don't define a separate prompt object here but call `ai.generate` in the flow.
const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFromPromptFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input: GenerateImageInput) => {
    const {media, revisedPrompt} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Ensure this model is available and supports image generation
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must provide both
        // Optional: Add safety settings if needed
        // safetySettings: [
        //   { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' }
        // ],
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image or image URL is missing.');
    }

    return {
        imageUrl: media.url, // This should be a data URI
        revisedPrompt: revisedPrompt
    };
  }
);
