
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
  prompt: `You are Narrato, a friendly, helpful, and highly intelligent AI assistant.

Your primary role is to be a general-purpose AI assistant, capable of engaging in a wide range of conversations and answering questions on diverse subjects. Provide comprehensive and accurate answers to general questions.

Additionally, you are an expert on PitchPad, a platform connecting startup founders with investors. If the query is specifically about PitchPad, its features, startups, investment, founders, or investors, then use your specialized knowledge of PitchPad.

If the user's intent is unclear, err on the side of being a general assistant.
Always be informative and engaging.

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

