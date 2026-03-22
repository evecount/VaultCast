'use server';
/**
 * @fileOverview A GenAI flow for generating video descriptions.
 *
 * - generateVideoDescription - A function that generates a concise and engaging description for a video.
 * - GenerateVideoDescriptionInput - The input type for the generateVideoDescription function.
 * - GenerateVideoDescriptionOutput - The return type for the generateVideoDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the video.'),
  keywords: z.array(z.string()).optional().describe('Optional keywords related to the video content.'),
});
export type GenerateVideoDescriptionInput = z.infer<typeof GenerateVideoDescriptionInputSchema>;

const GenerateVideoDescriptionOutputSchema = z.object({
  description: z.string().describe('A concise and engaging description for the video.'),
});
export type GenerateVideoDescriptionOutput = z.infer<typeof GenerateVideoDescriptionOutputSchema>;

export async function generateVideoDescription(
  input: GenerateVideoDescriptionInput
): Promise<GenerateVideoDescriptionOutput> {
  return generateVideoDescriptionFlow(input);
}

const generateVideoDescriptionPrompt = ai.definePrompt({
  name: 'generateVideoDescriptionPrompt',
  input: {schema: GenerateVideoDescriptionInputSchema},
  output: {schema: GenerateVideoDescriptionOutputSchema},
  prompt: `You are an AI assistant tasked with writing concise and engaging video descriptions.

Generate a description for a video with the following title and keywords:

Title: {{{title}}}
{{#if keywords}}
Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

The description should be no more than 3-4 sentences, captivating, and encourage potential subscribers to watch the video.`,
});

const generateVideoDescriptionFlow = ai.defineFlow(
  {
    name: 'generateVideoDescriptionFlow',
    inputSchema: GenerateVideoDescriptionInputSchema,
    outputSchema: GenerateVideoDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateVideoDescriptionPrompt(input);
    return output!;
  }
);
