import React, { useState } from 'react';
import {
    Box,
    Fab,
    IconButton,
    Paper,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
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
                        width: 300,
                        height: 400,
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
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            Hello! How can I assist you today?
                        </Typography>
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ padding: 1, borderTop: '1px solid #e0e0e0' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Type a message..."
                            sx={{ backgroundColor: 'white' }}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ marginTop: 1, float: 'right' }}
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
