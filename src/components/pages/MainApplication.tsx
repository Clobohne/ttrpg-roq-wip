import React, { useState } from 'react';
import { Box, Button, Input, Textarea, VStack, Text, HStack, useToast } from '@chakra-ui/react';
import SimplePeer from 'simple-peer';

interface MainApplicationProps {
    role: 'host' | 'player';
    onLogout: () => void;
}

const MainApplication: React.FC<MainApplicationProps> = ({ role, onLogout }) => {
    const [hostSignal, setHostSignal] = useState<string>(''); // Host's generated signal
    const [pastedSignal, setPastedSignal] = useState<string>(''); // Signal pasted by player
    const [playerSignalInput, setPlayerSignalInput] = useState<string>(''); // Player signal pasted by host
    const [playerSignal, setPlayerSignal] = useState<string>(''); // Player's generated signal
    const [peer, setPeer] = useState<SimplePeer.Instance | null>(null); // Single peer for player
    const [peers, setPeers] = useState<SimplePeer.Instance[]>([]); // Multiple peers for host
    const [connectionStatus, setConnectionStatus] = useState<string>('Not connected');
    const [messages, setMessages] = useState<string[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [debugEnabled, setDebugEnabled] = useState<boolean>(false);
    const toast = useToast();

    const logMessage = (message: string) => {
        if (debugEnabled) {
            setMessages((prev) => [...prev, `[DEBUG] ${message}`]);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copied to clipboard!',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    const handleSendMessage = () => {
        if (!peer && peers.length === 0) {
            logMessage('Error: Not connected to a peer.');
            return;
        }

        if (role === 'host') {
            peers.forEach((p) => p.send(messageInput));
        } else if (peer) {
            peer.send(messageInput);
        }

        setMessages((prev) => [...prev, `You: ${messageInput}`]);
        setMessageInput('');
    };

    const createHostSignal = () => {
        const newPeer = new SimplePeer({ initiator: true, trickle: false });

        newPeer.on('signal', (signal) => {
            const encodedSignal = btoa(JSON.stringify(signal));
            setHostSignal(encodedSignal);
            logMessage('Host signal generated. Share this with the players.');
        });

        newPeer.on('connect', () => {
            setConnectionStatus('Connected');
            logMessage('Host: Connection established with a player.');
        });

        newPeer.on('data', (data) => {
            setMessages((prev) => [...prev, `Player: ${data.toString()}`]);
        });

        setPeers((prev) => [...prev, newPeer]);
    };

    const connectToPlayer = () => {
        if (!playerSignalInput) {
            logMessage('Error: No player signal provided.');
            return;
        }

        const newPeer = peers[peers.length - 1]; // Use the most recently created peer
        const decodedSignal = JSON.parse(atob(playerSignalInput));
        newPeer.signal(decodedSignal);
        logMessage('Host: Connected to a player signal.');
    };

    const connectToHost = () => {
        if (!pastedSignal) {
            logMessage('Error: No host signal provided.');
            return;
        }

        const newPeer = new SimplePeer({ initiator: false, trickle: false });

        newPeer.on('signal', (signal) => {
            const encodedSignal = btoa(JSON.stringify(signal));
            setPlayerSignal(encodedSignal);
            logMessage('Player signal generated. Share this with the host.');
        });

        newPeer.on('connect', () => {
            setConnectionStatus('Connected');
            logMessage('Player: Connection established with the host.');
        });

        newPeer.on('data', (data) => {
            setMessages((prev) => [...prev, `Host: ${data.toString()}`]);
        });

        const decodedSignal = JSON.parse(atob(pastedSignal));
        newPeer.signal(decodedSignal);

        setPeer(newPeer);
    };

    const renderHostUI = () => (
        <>
            <Button colorScheme="blue" onClick={createHostSignal}>
                Generate Host Signal
            </Button>
            {hostSignal && (
                <>
                    <Textarea value={hostSignal} isReadOnly placeholder="Host Signal" />
                    <Button colorScheme="teal" onClick={() => copyToClipboard(hostSignal)}>
                        Copy Host Signal
                    </Button>
                </>
            )}
            <Textarea
                placeholder="Paste Player Signal"
                value={playerSignalInput}
                onChange={(e) => setPlayerSignalInput(e.target.value)}
            />
            <Button colorScheme="green" onClick={connectToPlayer}>
                Connect to Player
            </Button>
        </>
    );

    const renderPlayerUI = () => (
        <>
            <Textarea
                placeholder="Paste Host Signal"
                value={pastedSignal}
                onChange={(e) => setPastedSignal(e.target.value)}
            />
            <Button colorScheme="green" onClick={connectToHost}>
                Connect to Host
            </Button>
            {playerSignal && (
                <>
                    <Textarea value={playerSignal} isReadOnly placeholder="Player Signal" />
                    <Button colorScheme="teal" onClick={() => copyToClipboard(playerSignal)}>
                        Copy Player Signal
                    </Button>
                </>
            )}
        </>
    );

    return (
        <Box height="100vh" display="flex" flexDirection="column" padding={4}>
            <VStack spacing={4}>
                <HStack justify="space-between" width="100%">
                    <Text>Status: {connectionStatus}</Text>
                    <Button colorScheme="red" onClick={onLogout}>
                        Logout
                    </Button>
                </HStack>

                <Text>Role: {role === 'host' ? 'Hosting' : 'Player'}</Text>
                <Button
                    colorScheme="yellow"
                    onClick={() => setDebugEnabled((prev) => !prev)}
                >
                    {debugEnabled ? 'Disable Debug' : 'Enable Debug'}
                </Button>

                {role === 'host' ? renderHostUI() : renderPlayerUI()}

                <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <Button colorScheme="purple" onClick={handleSendMessage}>
                    Send Message
                </Button>

                <VStack
                    align="start"
                    borderWidth={1}
                    borderRadius="md"
                    padding={2}
                    width="100%"
                    overflowY="auto"
                    maxHeight="300px"
                >
                    {messages.map((msg, idx) => (
                        <Text key={idx}>{msg}</Text>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
};

export default MainApplication;
