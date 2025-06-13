
// src/ai/flows/pitchpad-chatbot-flow.ts
'use server';
/**
 * @fileOverview A conversational AI flow for the PitchPad chatbot, "Gemini".
 *
 * - getChatbotResponse - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the getChatbotResponse function.
 * - ChatbotOutput - The return type for the getChatbotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  userInput: z.string().describe("The user's message to the chatbot."),
  userRole: z.enum(['founder', 'investor', 'guest']).optional().describe('The role of the user, if known.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe("The chatbot's generated response."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pitchpadChatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are Gemini, a friendly and helpful AI assistant for PitchPad.
PitchPad is a platform connecting startup founders with investors.
Your goal is to assist users with their queries about PitchPad, startups, investment, or provide general conversational support.
Keep your responses concise and informative.

User's role (if known): {{userRole}}
User's message: "{{{userInput}}}"

Your response:
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input: ChatbotInput) => {
    const {output} = await prompt(input);
    if (!output) {
      return { response: "I'm currently unable to process that request. Please try again later." };
    }
    return output;
  }
);
