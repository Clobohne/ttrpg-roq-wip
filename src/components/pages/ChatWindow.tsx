import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
    VStack,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing from react-icons

interface ChatWindowProps {
    messages: string[]; // Array of messages to display
    onSendMessage: (message: string) => void; // Function to handle sending messages
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage }) => {
    const [isVisible, setIsVisible] = useState(true); // Controls visibility
    const [message, setMessage] = useState<string>(''); // Message input state

    const handleSendMessage = () => {
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
            {/* Toggle Button */}
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

            {/* Chat Content */}
            {isVisible && (
                <VStack spacing={2} p={4} maxHeight="200px" overflowY="auto" bg="gray.700">
                    <Stack spacing={2} align="start" width="100%">
                        {messages.map((msg, index) => (
                            <Box key={index} bg="gray.600" p={2} borderRadius="md" width="fit-content">
                                {msg}
                            </Box>
                        ))}
                    </Stack>
                </VStack>
            )}

            {/* Input Box */}
            {isVisible && (
                <HStack p={2} bg="gray.800">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        bg="gray.700"
                        color="white"
                    />
                    <Button onClick={handleSendMessage} colorScheme="blue">
                        Send
                    </Button>
                </HStack>
            )}
        </Box>
    );
};

export default ChatWindow;
