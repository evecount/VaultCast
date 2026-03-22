'use server';
/**
 * @fileOverview An AI agent for suggesting relevant tags for video content.
 *
 * - aiVideoTagging - A function that handles the video tag generation process.
 * - AiVideoTaggingInput - The input type for the aiVideoTagging function.
 * - AiVideoTaggingOutput - The return type for the aiVideoTagging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiVideoTaggingInputSchema = z.object({
  title: z.string().describe('The title of the video.'),
  description: z.string().describe('The description of the video.'),
});
export type AiVideoTaggingInput = z.infer<typeof AiVideoTaggingInputSchema>;

const AiVideoTaggingOutputSchema = z.object({
  tags: z.array(z.string()).describe('A list of relevant tags for the video.'),
});
export type AiVideoTaggingOutput = z.infer<typeof AiVideoTaggingOutputSchema>;

export async function aiVideoTagging(
  input: AiVideoTaggingInput
): Promise<AiVideoTaggingOutput> {
  return aiVideoTaggingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiVideoTaggingPrompt',
  input: {schema: AiVideoTaggingInputSchema},
  output: {schema: AiVideoTaggingOutputSchema},
  prompt: `You are an expert content categorizer. Based on the provided video title and description, generate a list of highly relevant tags that would help users discover this content.

Only output a JSON object containing a 'tags' array. Do not include any other text.

Video Title: {{{title}}}
Video Description: {{{description}}}`,
});

const aiVideoTaggingFlow = ai.defineFlow(
  {
    name: 'aiVideoTaggingFlow',
    inputSchema: AiVideoTaggingInputSchema,
    outputSchema: AiVideoTaggingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
