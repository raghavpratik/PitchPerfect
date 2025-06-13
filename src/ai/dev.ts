
import { config } from 'dotenv';
config();

import '@/ai/flows/pitchpad-pitch-summary.ts';
import '@/ai/flows/pitchpad-chatbot-suggestions.ts';
import '@/ai/flows/pitchpad-startup-tagging.ts';
import '@/ai/flows/pitchpad-enhance-prompt.ts';
import '@/ai/flows/pitchpad-generate-image.ts';
import '@/ai/flows/pitchpad-chatbot-flow.ts'; // Added new flow
