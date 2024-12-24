import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    VStack,
    HStack,
    Text,
    IconButton,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ChatWindowProps {
    messages: string[];
    onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <Box
            position="fixed"
            bottom={0}
            left={0}
            width="100%"
            bg="gray.800"
            color="white"
            boxShadow="lg"
            borderTop="2px solid gray"
            zIndex={10}
        >
            <HStack justifyContent="space-between" p={2}>
                <Text fontWeight="bold">Chat</Text>
                <IconButton
                    aria-label="Toggle Chat"
                    icon={isVisible ? <FaChevronDown /> : <FaChevronUp />}
                    onClick={() => setIsVisible(!isVisible)}
                    variant="ghost"
                    colorScheme="whiteAlpha"
                />
            </HStack>
            {isVisible && (
                <>
                    <VStack spacing={2} p={4} maxHeight="200px" overflowY="auto" bg="gray.700">
                        {messages.map((msg, index) => (
                            <Text key={index}>{msg}</Text>
                        ))}
                    </VStack>
                    <HStack p={2}>
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            bg="gray.600"
                            color="white"
                        />
                        <Button onClick={handleSend} colorScheme="blue">
                            Send
                        </Button>
                    </HStack>
                </>
            )}
        </Box>
    );
};

export default ChatWindow;
