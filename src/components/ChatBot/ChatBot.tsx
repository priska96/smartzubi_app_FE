import React, { useEffect, useRef, useState } from 'react';
import { Box, Fab, IconButton, Paper, Typography, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { cn } from '@/themes/utils';
import { Message, sendMessage } from '@/app/api/chatBotApi';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const [isNewMessageLoading, setIsNewMessageLoading] = useState(false);

    const [messageList, setMessageList] = useState<Message[]>([
        {
            role: 'system',
            content:
                'Du bist Ausbilder im Bereich Gastronomie und Service und Restaurantgewerbe. ' +
                'Du kannst alle fragen der IHK Prüfungen korrekt beantworten. ' +
                'Du antwortest immer zuerst auf deutsch und schickst dann auch immer direkt die vietnamesische Übersetzung mit. ',
        },
    ]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Automatically adjust the height of the textarea based on the content
        const textarea = textareaRef.current;
        const maxHeight = 150;

        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = `${newHeight}px`;

            // border-radius depending on height
            const isExpanded = newHeight > 56;
            textarea.style.borderRadius = isExpanded ? '15px' : '9999px';

            // If the new height reaches maxHeight, enable scroll inside the textarea
            textarea.style.overflowY =
                newHeight >= maxHeight ? 'auto' : 'hidden';
        }
    }, [message]);

    // const updateText = (text: string) => {
    //     setMessage((prev) =>
    //         prev.length === 0 ? prev + '' + text : prev + ' ' + text
    //     );
    // };

    // const clearMessage = (
    //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    // ) => {
    //     e.preventDefault();
    //     setMessage('');
    // };

    const isMessageEmpty = !message.trim();

    const handleSubmit = async () => {
        if (!message.trim()) return; // Prevent submission if message is empty or whitespace
        try {
            setMessage('');
            setIsNewMessageLoading(true);

            const res = await sendMessage(messageList, message);

            if (!res) {
                setIsNewMessageLoading(false);
                return;
            }
            setMessageList([
                ...messageList,
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
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1200 }}>
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
                        bottom: 80,
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
                        <Typography variant="h6">Chatbot</Typography>
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
                    >
                        <Typography variant="body2" color="textSecondary">
                            Hello! How can I assist you today?
                        </Typography>
                        {isNewMessageLoading && <div>Loading</div>}
                        {messageList.slice(1).map((msg, index) => (
                            <Typography
                                key={index}
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
                                    display: 'inline-block',
                                    maxWidth: '80%',
                                    marginLeft:
                                        msg.role !== 'assistant' ? '20%' : '0',
                                    marginTop: 2,
                                }}
                            >
                                {msg.content}
                            </Typography>
                        ))}
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ padding: 1, borderTop: '1px solid #e0e0e0' }}>
                        {/* <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Type a message..."
                            sx={{ backgroundColor: 'white' }}
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                        /> */}
                        <textarea
                            ref={textareaRef}
                            id="chat"
                            rows={1}
                            className={cn(
                                'min-h-[56px] w-full resize-none rounded-full border border-blue-light bg-white px-4 pb-[16px] pt-[13px] leading-[24px] text-gray-950 placeholder-greyScale-70 focus-visible:border-blue-full focus-visible:outline-none',
                                {
                                    'border-0 text-center placeholder-red-600':
                                        isMessageEmpty,
                                },
                                {
                                    'border-0 px-10 text-left text-red-600 placeholder-red-600':
                                        !isMessageEmpty,
                                },
                                { 'pr-10': !isMessageEmpty }
                            )}
                            placeholder={'Stelle eine Frage...'}
                            value={message}
                            onChange={handleChange}
                            //onKeyDown={handleKeyDown}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ marginTop: 1, float: 'right' }}
                            onClick={handleSubmit}
                        >
                            Send
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default ChatBot;
