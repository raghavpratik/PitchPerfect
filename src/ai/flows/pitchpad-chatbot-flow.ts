
// src/ai/flows/pitchpad-chatbot-flow.ts
'use server';
/**
 * @fileOverview A conversational AI flow for the PitchPad chatbot, "Narrato".
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
  prompt: `You are Narrato, a friendly, helpful, and highly intelligent AI assistant for PitchPad.
PitchPad is a platform connecting startup founders with investors.

Your primary goal is to assist users with their queries about PitchPad, startups, investment, and related topics.
However, you are also capable of engaging in general conversation and answering a wide range of questions on various subjects, much like a general-purpose AI assistant.
If the user asks a general question, provide a comprehensive and accurate answer.
If the query is related to PitchPad, founders, or investors, prioritize that context.
Keep your responses informative and engaging.

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
