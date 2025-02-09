import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Fab,
    IconButton,
    Paper,
    Typography,
    Button,
    TextField,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Message, sendMessage } from '@/app/api/chatBotApi';
import { useChatBotStore } from '@/store';
import { useTranslation } from 'react-i18next';
import { TypingIndicator } from '../TypingIndicator';
import { countTokensInMessages } from './utils';
import { TOKEN_LIMIT } from '@/constants';
import { LoadingIndicator } from '../LoadingIndicator';

interface ChatBorProps {
    examId: number;
}
const ChatBot = ({ examId }: ChatBorProps) => {
    const { t } = useTranslation();
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const { chatBot, addMessages } = useChatBotStore();
    const currentMessages = chatBot?.[examId].messageList ?? [];
    const [isOpen, setIsOpen] = useState(false);
    const [isNewMessageLoading, setIsNewMessageLoading] = useState(false);

    const [message, setMessage] = useState('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const scrollChatWindow = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTo({
                top: chatWindowRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };
    useEffect(() => {
        if (isOpen) {
            scrollChatWindow();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            scrollChatWindow();
        }
    }, [isOpen, currentMessages]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const trimMessageList = () => {
        const newList = [currentMessages[0]];
        newList.push(...currentMessages.slice(-5)); // Only keep the last 5 messages
        return newList;
    };

    const handleSubmit = async () => {
        scrollChatWindow();

        if (!message.trim()) return; // Prevent submission if message is empty or whitespace
        try {
            setMessage('');
            setIsNewMessageLoading(true);

            let prevMsgToSend = currentMessages;
            const totalTokens = await countTokensInMessages([
                ...(chatBot?.[examId].messageList ?? []),
                { role: 'user', content: message },
            ]);
            console.log('Total tokens:', totalTokens);
            // Check if token count exceeds the limit
            if (totalTokens > TOKEN_LIMIT) {
                console.log('You are exceeding the token limit.');
                prevMsgToSend = trimMessageList();
            }
            const res = await sendMessage(prevMsgToSend, message);

            if (!res) {
                setIsNewMessageLoading(false);
                return;
            }
            addMessages(examId, [
                { role: 'user', content: message },
                {
                    role: 'assistant',
                    content: res.data.choices[0].message.content,
                },
            ]);

            console.log(res.data);
            setIsNewMessageLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 70, right: 16, zIndex: 1200 }}>
            {/* Floating Action Button */}
            <Fab color="primary" onClick={handleToggle}>
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </Fab>

            {/* Chat Window */}
            {isOpen && (
                <Paper
                    elevation={6}
                    sx={{
                        position: 'fixed',
                        bottom: 130,
                        right: 16,
                        width: 450,
                        height: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            padding: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6">Chatbot </Typography>
                        <IconButton
                            onClick={handleToggle}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Messages */}
                    <Box
                        sx={{
                            padding: 2,
                            flex: 1,
                            overflowY: 'auto',
                            backgroundColor: '#f5f5f5',
                            flexDirection: 'column',
                        }}
                        ref={chatWindowRef}
                    >
                        <Box
                            sx={{
                                padding: 1,
                                color: 'text.secondary',
                                display: 'inline-block',
                                width: '100%',
                                textAlign: 'left',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    padding: 1,
                                    borderRadius: 1,
                                    borderColor: 'primary.main',
                                    borderWidth: 1,
                                    backgroundColor: '#f5f5f5',
                                    color: 'text.secondary',
                                    display: 'inline-block',
                                    maxWidth: '80%',
                                }}
                            >
                                {t('chatbot.welcome_message')}
                            </Typography>
                        </Box>
                        {currentMessages?.slice(1).map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    color: 'text.secondary',
                                    display: 'inline-block',
                                    width: '100%',
                                    marginTop: 1 / 2,
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        padding: 1,
                                        borderRadius: 1,
                                        borderColor:
                                            msg.role === 'assistant'
                                                ? 'primary.main'
                                                : 'transparent',
                                        borderWidth: 1,
                                        backgroundColor:
                                            msg.role === 'assistant'
                                                ? '#f5f5f5'
                                                : 'primary.main',
                                        color:
                                            msg.role === 'assistant'
                                                ? 'text.secondary'
                                                : 'white',
                                        display: 'block',
                                        maxWidth: '80%',
                                        float:
                                            msg.role === 'user'
                                                ? 'right'
                                                : 'left',
                                    }}
                                >
                                    {msg.content}
                                </Typography>
                            </Box>
                        ))}
                        {isNewMessageLoading && <TypingIndicator />}
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ padding: 1, borderTop: '1px solid #e0e0e0' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder={t('chatbot.placeholder')}
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#a1a1aa',
                                },
                            }}
                            value={message}
                            onChange={handleChange}
                            multiline
                            maxRows={5}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ marginTop: 1, float: 'right' }}
                            onClick={handleSubmit}
                            disabled={isNewMessageLoading}
                        >
                            {t('chatbot.send')}
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default ChatBot;
