import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import SimplePeer, { Instance } from 'simple-peer'; // Default import with TypeScript support
import ChatWindow from 'components/pages/ChatWindow';

interface MainApplicationProps {
    role: 'host' | 'player';
}

const MainApplication: React.FC<MainApplicationProps> = ({ role }) => {
    const [peer, setPeer] = useState<Instance | null>(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [signal, setSignal] = useState<string>('');
    const [remoteSignal, setRemoteSignal] = useState<string>('');

    // Initialize WebRTC peer connection
    const initializePeer = (initiator: boolean) => {
        const newPeer = new SimplePeer({
            initiator,
            trickle: false,
        });

        // Generate signal data to share with the other peer
        newPeer.on('signal', (data) => {
            setSignal(JSON.stringify(data));
        });

        // Mark the connection as established
        newPeer.on('connect', () => {
            setConnected(true);
            setMessages((prev) => [...prev, 'Connected to peer!']);
        });

        // Handle incoming messages
        newPeer.on('data', (data) => {
            setMessages((prev) => [...prev, `Peer: ${data.toString()}`]);
        });

        setPeer(newPeer);
    };

    // Apply the remote signal to establish the connection
    const connectToPeer = () => {
        if (!remoteSignal) {
            setMessages((prev) => [...prev, 'Error: Remote signal is empty.']);
            return;
        }
        try {
            peer?.signal(JSON.parse(remoteSignal));
        } catch (error) {
            setMessages((prev) => [...prev, 'Error: Invalid remote signal format.']);
        }
    };

    // Send a chat message
    const sendMessage = (message: string) => {
        if (peer && connected) {
            peer.send(message);
            setMessages((prev) => [...prev, `You: ${message}`]);
        } else {
            setMessages((prev) => [...prev, 'Not connected to a peer.']);
        }
    };

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <VStack spacing={4} padding={4} flex="1" overflow="auto">
                {!connected ? (
                    <>
                        {role === 'host' ? (
                            <>
                                <Button colorScheme="blue" onClick={() => initializePeer(true)}>
                                    Start Hosting
                                </Button>
                                {signal && (
                                    <Box>
                                        <Text fontSize="sm">Share this signal with the player:</Text>
                                        <Input value={signal} isReadOnly bg="gray.200" />
                                    </Box>
                                )}
                            </>
                        ) : (
                            <>
                                <Input
                                    placeholder="Paste host's signal here"
                                    onChange={(e) => setRemoteSignal(e.target.value)}
                                    bg="gray.200"
                                />
                                {!peer && (
                                    <Button colorScheme="green" onClick={() => initializePeer(false)}>
                                        Join as Player
                                    </Button>
                                )}
                                {peer && (
                                    <Button colorScheme="green" onClick={connectToPeer}>
                                        Connect to Host
                                    </Button>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <Text color="green.500">You are connected to the peer!</Text>
                )}
            </VStack>

            {/* Persistent Chat Window */}
            <ChatWindow
                messages={messages}
                onSendMessage={(message) => sendMessage(message)}
            />
        </Box>
    );
};

export default MainApplication;
