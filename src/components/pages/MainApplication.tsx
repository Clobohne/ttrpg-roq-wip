import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import SimplePeer, { Instance } from 'simple-peer';
import ChatWindow from 'components/pages/ChatWindow';

interface MainApplicationProps {
    role: 'host' | 'player';
}

const MainApplication: React.FC<MainApplicationProps> = ({ role }) => {
    const [peer, setPeer] = useState<Instance | null>(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [peers, setPeers] = useState<Instance[]>([]); // For multiple players (host mode)
    const socketRef = useRef<WebSocket | null>(null); // WebSocket reference

    const logMessage = (message: string) => {
        setMessages((prev) => [...prev, `[DEBUG] ${message}`]);
    };

    useEffect(() => {
        // Initialize WebSocket
        socketRef.current = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket URL
        socketRef.current.onopen = () => logMessage('WebSocket connection established.');
        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            logMessage(`WebSocket message received: ${event.data}`);

            // Handle signals received via WebSocket
            if (data.type === 'signal') {
                peer?.signal(data.signal);
            } else if (data.type === 'peer-join' && role === 'host') {
                // If a new player joins, create a new peer connection
                initializePeer(false, data.id); // Pass player's ID
            }
        };
        socketRef.current.onerror = (error) => logMessage(`WebSocket error: ${error}`);
        return () => socketRef.current?.close();
    }, []);

    const initializePeer = (initiator: boolean, peerId?: string) => {
        logMessage(`Initializing peer. Role: ${role}, Initiator: ${initiator}`);

        const newPeer = new SimplePeer({
            initiator,
            trickle: false,
        });

        // Signal generation
        newPeer.on('signal', (signal) => {
            logMessage(`Generated signal: ${JSON.stringify(signal)}`);
            // Send signal to WebSocket
            socketRef.current?.send(
                JSON.stringify({
                    type: 'signal',
                    signal,
                    to: peerId || 'host', // Target the specific peer or host
                })
            );
        });

        newPeer.on('connect', () => {
            setConnected(true);
            logMessage('Peer connection established!');
        });

        newPeer.on('data', (data) => {
            setMessages((prev) => [...prev, `Peer: ${data.toString()}`]);
        });

        if (role === 'host') {
            setPeers((prev) => [...prev, newPeer]);
        } else {
            setPeer(newPeer);
        }
    };

    const startHost = () => {
        logMessage('Starting host...');
        initializePeer(true);
    };

    const joinAsPlayer = () => {
        logMessage('Joining as player...');
        initializePeer(false);
    };

    const sendMessage = (message: string) => {
        if (peer && connected) {
            peer.send(message);
            logMessage(`Message sent: ${message}`);
        } else if (role === 'host' && peers.length > 0) {
            peers.forEach((p) => p.send(message));
            logMessage(`Broadcast message: ${message}`);
        } else {
            logMessage('Message not sent: Not connected to any peer.');
        }
    };

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <VStack spacing={4} padding={4} flex="1" overflow="auto">
                {!connected ? (
                    <>
                        {role === 'host' ? (
                            <Button colorScheme="blue" onClick={startHost}>
                                Start Hosting
                            </Button>
                        ) : (
                            <Button colorScheme="green" onClick={joinAsPlayer}>
                                Join as Player
                            </Button>
                        )}
                    </>
                ) : (
                    <Text color="green.500">Connected to peer!</Text>
                )}
            </VStack>

            <ChatWindow messages={messages} onSendMessage={sendMessage} />
        </Box>
    );
};

export default MainApplication;
