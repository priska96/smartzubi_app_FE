import { openAIApi } from './axiosInstance';

export type Message = {
    role: string;
    content: string;
};

export const sendMessage = async (messageList: Message[], message: string) => {
    try {
        return openAIApi.post(
            '',
            JSON.stringify({
                model: 'gpt-4',
                messages: [
                    ...messageList,
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            })
        );
    } catch (error) {
        console.error('Error:', error);
    }
};
