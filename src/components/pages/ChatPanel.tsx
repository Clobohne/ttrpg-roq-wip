import React, { useState } from 'react';
import { Box, Input, Button, Text, Stack } from '@chakra-ui/react';

const ChatPanel: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const sendMessage = () => {
        if (message) {
            setMessages((prev) => [...prev, `You: ${message}`]);
            setMessage('');
        }
    };

    return (
        <Box>
            <Stack spacing={2}>
                {messages.map((msg, index) => (
                    <Text key={index}>{msg}</Text>
                ))}
            </Stack>
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <Button onClick={sendMessage}>Send</Button>
        </Box>
    );
};

export default ChatPanel;
