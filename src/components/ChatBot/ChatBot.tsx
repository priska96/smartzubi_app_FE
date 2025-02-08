import { openAIApi } from '@/app/api';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);

    const [val, setVal] = useState('');
    const [result, setResult] = useState('');
    const handleSubmit = async () => {
        try {
            const res = await openAIApi.post(
                '',
                JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content:
                                'You are now a friendly assistent that know everything about restaurant business and service.',
                        },
                        {
                            role: 'user',
                            content: val,
                        },
                    ],
                })
            );
            console.log(res.data);
            //setResult(res.data.messages[1].content);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="chatBot fixed z-[1200] bottom-4 right-4">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
            >
                {isOpen ? '×' : '💬'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-80 h-96 mt-2">
                    <div className="flex items-center justify-between bg-blue-600 text-white p-2 rounded-t-lg">
                        <span className="font-semibold">Chatbot</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-300 focus:outline-none"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto h-72">
                        <p className="text-gray-600">
                            Hello! How can I assist you today?
                        </p>
                        {/* Chat messages can go here */}
                    </div>
                    <div className="p-2 border-t border-gray-300">
                        {/* <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        /> */}
                        <TextField
                            sx={{
                                flex: '0 0 100px',
                                '.MuiInputBase-input': {
                                    padding: '8px!important',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    bgcolor: 'white',
                                },
                            }}
                            className="min-w-[100px] w-[100px]"
                            id="outlined-basic"
                            disabled={!!result || false}
                            label=""
                            variant="outlined"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                        />
                        <Button
                            className="!text-white"
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Absenden
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
