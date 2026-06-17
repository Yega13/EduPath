// Server-side only — holds secret API keys
if (typeof window !== 'undefined') {
  throw new Error('lib/ai.ts must not be imported client-side');
}

import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

if (!process.env.GEMINI_API_KEY) throw new Error('Missing GEMINI_API_KEY');

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Claude is optional — only used as fallback when ANTHROPIC_API_KEY is present
const anthropic: Anthropic | null = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

export type AIRole = 'plan' | 'chat';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

const GEMINI_PLAN = 'gemini-1.5-pro';
const GEMINI_CHAT = 'gemini-1.5-flash';

export async function generateWithGemini(
  messages: AIMessage[],
  role: AIRole,
  systemPrompt: string
): Promise<string> {
  if (messages.length === 0) throw new Error('messages must not be empty');

  const model = gemini.getGenerativeModel({
    model: role === 'plan' ? GEMINI_PLAN : GEMINI_CHAT,
    systemInstruction: systemPrompt,
  });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({
    history,
    generationConfig: { maxOutputTokens: role === 'plan' ? 2000 : 800 },
  });

  const result = await chat.sendMessage(messages[messages.length - 1].content);
  return result.response.text();
}

async function generateWithClaude(
  messages: AIMessage[],
  role: AIRole,
  systemPrompt: string
): Promise<string> {
  if (!anthropic) throw new Error('ANTHROPIC_API_KEY not configured');

  const model = role === 'plan' ? 'claude-sonnet-4-6' : 'claude-haiku-4-5-20251001';

  const response = await anthropic.messages.create({
    model,
    max_tokens: role === 'plan' ? 2000 : 800,
    system: systemPrompt,
    messages,
  });

  const block = response.content[0];
  if (block.type !== 'text') throw new Error('Unexpected response type from Claude');
  return block.text;
}

const FALLBACK_MESSAGE =
  'AI is temporarily unavailable. Please try again in a moment.';

export async function generateAIResponse(
  messages: AIMessage[],
  role: AIRole,
  systemPrompt: string
): Promise<string> {
  if (messages.length === 0) return FALLBACK_MESSAGE;

  // Primary: Gemini
  try {
    return await generateWithGemini(messages, role, systemPrompt);
  } catch (err) {
    console.error('[AI] Gemini failed:', err);
  }

  // Fallback: Claude (only if ANTHROPIC_API_KEY is set)
  if (anthropic) {
    try {
      return await generateWithClaude(messages, role, systemPrompt);
    } catch (err) {
      console.error('[AI] Claude also failed:', err);
    }
  }

  return FALLBACK_MESSAGE;
}
