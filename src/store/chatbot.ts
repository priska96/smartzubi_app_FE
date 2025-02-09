import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Message } from '@/app/api/chatBotApi';

export type Chat = {
    userId?: number;
    examId?: number;
    messageList: Message[];
};
export type ChatBot = {
    [key: number]: Chat;
};
export type ChatBotState = {
    chatBot: ChatBot | undefined;
    initializeChatRoom: (examId: number, userId: number) => void;
    addMessage: (examId: number, message: Message) => void;
    addMessages: (examId: number, messages: Message[]) => void;
};

export const systemMessage = {
    role: 'system',
    content:
        'Du bist Ausbilder im Bereich Gastronomie und Service und Restaurantgewerbe. ' +
        'Du kannst alle fragen der IHK Prüfungen korrekt beantworten. ' +
        'Du antwortest immer zuerst auf deutsch und schickst dann auch immer direkt die vietnamesische Übersetzung mit. ',
};

export const useChatBotStore = create<ChatBotState>()(
    persist(
        (set) => ({
            chatBot: undefined,
            initializeChatRoom: (examId: number, userId: number) =>
                set((state) => {
                    if (state.chatBot?.[examId]) {
                        return state;
                    }
                    const newChat = {
                        examId,
                        userId,
                        messageList: [systemMessage],
                    };
                    const newChatRoom: ChatBot = {};
                    newChatRoom[examId] = newChat;

                    return {
                        ...state,
                        chatBot: { ...state.chatBot, ...newChatRoom },
                    };
                }),

            addMessage: (examId: number, message: Message) =>
                set((state) => {
                    const currentChatRoom = state.chatBot?.[examId];

                    const newChatRoom: ChatBot = {};
                    newChatRoom[examId] = {
                        ...currentChatRoom,
                        messageList: [
                            ...(currentChatRoom?.messageList ?? []),
                            message,
                        ],
                    };

                    return {
                        ...state,
                        chatBot: {
                            ...state.chatBot,
                            ...newChatRoom,
                        },
                    };
                }),
            addMessages: (examId: number, messages: Message[]) =>
                set((state) => {
                    const currentChatRoom = state.chatBot?.[examId];

                    const newChatRoom: ChatBot = {};
                    newChatRoom[examId] = {
                        ...currentChatRoom,
                        messageList: [
                            ...(currentChatRoom?.messageList ?? []),
                            ...messages,
                        ],
                    };

                    return {
                        ...state,
                        chatBot: {
                            ...state.chatBot,
                            ...newChatRoom,
                        },
                    };
                }),
        }),
        {
            name: 'smartzubi.chatbot',
        }
    )
);
