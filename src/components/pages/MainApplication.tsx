import React, { useState, useRef } from 'react';
import { Box, Button, VStack, Input } from '@chakra-ui/react';
import SimplePeer, { Instance } from 'simple-peer';
import ChatWindow from 'components/pages/ChatWindow';

interface MainApplicationProps {
    role: 'host' | 'player';
}

const MainApplication: React.FC<MainApplicationProps> = ({ role }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [peer, setPeer] = useState<Instance | null>(null);
    const [signalData, setSignalData] = useState<string>('');
    const [remoteSignal, setRemoteSignal] = useState<string>('');

    const inputSignalRef = useRef<HTMLInputElement | null>(null);

    // Initialize the peer connection
    const initializePeer = (initiator: boolean) => {
        const newPeer = new SimplePeer({
            initiator,
            trickle: false,
        });

        newPeer.on('signal', (data) => {
            setSignalData(JSON.stringify(data));
        });

        newPeer.on('connect', () => {
            setMessages((prev) => [...prev, 'Connected to peer!']);
        });

        newPeer.on('data', (data) => {
            setMessages((prev) => [...prev, `Peer: ${data.toString()}`]);
        });

        setPeer(newPeer);
    };

    // Send a message to the connected peer
    const sendMessage = (message: string) => {
        if (peer) {
            peer.send(message);
            setMessages((prev) => [...prev, `You: ${message}`]);
        } else {
            setMessages((prev) => [...prev, 'Not connected to a peer.']);
        }
    };

    // Handle receiving the remote signal
    const handleConnect = () => {
        if (remoteSignal && peer) {
            peer.signal(JSON.parse(remoteSignal));
        }
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <VStack spacing={4} padding={4} flex="1" overflow="auto">
                {/* Connection Setup */}
                {role === 'host' ? (
                    <>
                        <Button colorScheme="blue" onClick={() => initializePeer(true)}>
                            Start Hosting
                        </Button>
                    </>
                ) : (
                    <>
                        <Button colorScheme="green" onClick={() => initializePeer(false)}>
                            Join as Player
                        </Button>
                    </>
                )}

                {signalData && (
                    <Box>
                        <Input
                            value={signalData}
                            isReadOnly
                            placeholder="Share this signal with the other peer"
                        />
                    </Box>
                )}

                {role === 'player' && (
                    <>
                        <Input
                            ref={inputSignalRef}
                            placeholder="Paste host signal here"
                            onChange={(e) => setRemoteSignal(e.target.value)}
                        />
                        <Button onClick={handleConnect} colorScheme="green">
                            Connect to Host
                        </Button>
                    </>
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
