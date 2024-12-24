import React, { useState } from 'react';
import { Box, Button, Input, Textarea, VStack, Text, HStack } from '@chakra-ui/react';
import SimplePeer from 'simple-peer';

interface MainApplicationProps {
    role: 'host' | 'player';
    onLogout: () => void;
}

const MainApplication: React.FC<MainApplicationProps> = ({ role, onLogout }) => {
    const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
    const [hostSignal, setHostSignal] = useState<string>(''); // Host's generated signal
    const [pastedSignal, setPastedSignal] = useState<string>(''); // Signal pasted by player
    const [playerSignal, setPlayerSignal] = useState<string>(''); // Player's generated signal
    const [connectionStatus, setConnectionStatus] = useState<string>('Not connected');
    const [messages, setMessages] = useState<string[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [debugEnabled, setDebugEnabled] = useState<boolean>(false);

    const logMessage = (message: string) => {
        if (debugEnabled) {
            setMessages((prev) => [...prev, `[DEBUG] ${message}`]);
        }
    };

    const handleSendMessage = () => {
        if (!peer || connectionStatus !== 'Connected') {
            logMessage('Error: Not connected to a peer.');
            return;
        }

        peer.send(messageInput);
        setMessages((prev) => [...prev, `You: ${messageInput}`]);
        setMessageInput('');
    };

    const createHostSignal = () => {
        const newPeer = new SimplePeer({ initiator: true, trickle: false });

        newPeer.on('signal', (signal) => {
            const encodedSignal = btoa(JSON.stringify(signal));
            setHostSignal(encodedSignal);
            logMessage('Host signal generated. Share this with the player.');
        });

        newPeer.on('connect', () => {
            setConnectionStatus('Connected');
            logMessage('Host: Connection established with the player.');
        });

        newPeer.on('data', (data) => {
            setMessages((prev) => [...prev, `Player: ${data.toString()}`]);
        });

        setPeer(newPeer);
    };

    const connectToHost = () => {
        if (!pastedSignal) {
            logMessage('Error: No host signal provided.');
            return;
        }

        const decodedSignal = JSON.parse(atob(pastedSignal));
        peer?.signal(decodedSignal);
        logMessage('Player: Connected to the host signal.');
    };

    const createPlayerSignal = () => {
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

        setPeer(newPeer);
    };

    const renderHostUI = () => (
        <>
            <Button colorScheme="blue" onClick={createHostSignal}>
                Generate Host Signal
            </Button>
            {hostSignal && (
                <Textarea value={hostSignal} isReadOnly placeholder="Host Signal" />
            )}
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
                <Textarea value={playerSignal} isReadOnly placeholder="Player Signal" />
            )}
            <Button colorScheme="blue" onClick={createPlayerSignal}>
                Generate Player Signal
            </Button>
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
