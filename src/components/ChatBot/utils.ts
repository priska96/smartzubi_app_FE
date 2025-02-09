import { Message } from '@/app/api/chatBotApi';
import { get_encoding } from 'tiktoken';

async function initTiktoken() {
    const tokenizer = await get_encoding('cl100k_base');
    return tokenizer;
}

const tokenizer = await initTiktoken();

/**
 * Counts the tokens in a given message or text.
 * @param text - The text to count tokens for
 * @returns Number of tokens
 */
export const countTokens = (text: string): number => {
    return tokenizer.encode(text).length;
};

/**
 * Counts the tokens in a list of messages (useful for conversations).
 * @param messages - An array of message objects containing role and content
 * @returns Total number of tokens in the conversation
 */
export const countTokensInMessages = (messages: Message[]): number => {
    let totalTokens = 0;
    for (const message of messages) {
        // Add tokens for the role (user/assistant) and message content
        totalTokens += countTokens(message.role) + countTokens(message.content);
    }
    return totalTokens;
};
