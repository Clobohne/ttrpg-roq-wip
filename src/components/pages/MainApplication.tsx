import React, { useState } from 'react';
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
    const [localSignal, setLocalSignal] = useState<string>(''); // Signal generated by this peer
    const [remoteSignal, setRemoteSignal] = useState<string>(''); // Signal received from the other peer

    // Initialize Peer connection
    const initializePeer = (initiator: boolean) => {
        const newPeer = new SimplePeer({
            initiator,
            trickle: false, // Simplify signaling for manual flow
        });

        // Generate local signal
        newPeer.on('signal', (data) => {
            setLocalSignal(JSON.stringify(data)); // Convert signal to string for sharing
        });

        // Handle connection establishment
        newPeer.on('connect', () => {
            setConnected(true);
            setMessages((prev) => [...prev, 'Connected to peer!']);
        });

        // Receive messages
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
            peer?.signal(JSON.parse(remoteSignal)); // Apply the remote signal
        } catch (error) {
            setMessages((prev) => [...prev, 'Error: Invalid remote signal format.']);
        }
    };

    // Send a message
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
                                {/* Host Workflow */}
                                <Button colorScheme="blue" onClick={() => initializePeer(true)}>
                                    Start Hosting
                                </Button>
                                {localSignal && (
                                    <Box>
                                        <Text fontSize="sm">Share this signal with the player:</Text>
                                        <Input value={localSignal} isReadOnly bg="gray.200" />
                                    </Box>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Player Workflow */}
                                <Text fontSize="sm">Paste the host's signal:</Text>
                                <Input
                                    placeholder="Enter host's signal"
                                    onChange={(e) => setRemoteSignal(e.target.value)}
                                    bg="gray.200"
                                />
                                <Button colorScheme="green" onClick={() => initializePeer(false)}>
                                    Join and Generate Signal
                                </Button>
                                {localSignal && (
                                    <Box>
                                        <Text fontSize="sm">Share this signal with the host:</Text>
                                        <Input value={localSignal} isReadOnly bg="gray.200" />
                                    </Box>
                                )}
                            </>
                        )}
                        {/* Shared: Paste the signal from the other peer */}
                        <Text fontSize="sm">
                            Paste the {role === 'host' ? "player's" : "host's"} signal:
                        </Text>
                        <Input
                            placeholder={`Enter ${role === 'host' ? "player's" : "host's"} signal`}
                            onChange={(e) => setRemoteSignal(e.target.value)}
                            bg="gray.200"
                        />
                        <Button colorScheme="green" onClick={connectToPeer}>
                            Connect
                        </Button>
                    </>
                ) : (
                    <Text color="green.500">Connected to peer!</Text>
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
