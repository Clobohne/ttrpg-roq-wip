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
    const [localSignal, setLocalSignal] = useState<string>(''); // Signal, das der Host/Player generiert
    const [remoteSignal, setRemoteSignal] = useState<string>(''); // Signal des anderen Peers

    // Initialisiere Peer-Verbindung
    const initializePeer = (initiator: boolean) => {
        const newPeer = new SimplePeer({
            initiator,
            trickle: false, // Keine asynchrone Signalierung (erleichtert manuelle Signale)
        });

        // Generiere lokales Signal
        newPeer.on('signal', (data) => {
            setLocalSignal(JSON.stringify(data)); // Signal in einen String umwandeln
        });

        // Verbindungsaufbau
        newPeer.on('connect', () => {
            setConnected(true);
            setMessages((prev) => [...prev, 'Verbindung erfolgreich hergestellt!']);
        });

        // Empfangene Nachrichten verarbeiten
        newPeer.on('data', (data) => {
            setMessages((prev) => [...prev, `Peer: ${data.toString()}`]);
        });

        setPeer(newPeer);
    };

    // Signal des anderen Peers anwenden
    const connectToPeer = () => {
        if (!remoteSignal) {
            setMessages((prev) => [...prev, 'Fehler: Remote-Signal fehlt.']);
            return;
        }
        try {
            peer?.signal(JSON.parse(remoteSignal)); // Signal anwenden
        } catch (error) {
            setMessages((prev) => [...prev, 'Fehler: Ungültiges Signal-Format.']);
        }
    };

    // Nachricht senden
    const sendMessage = (message: string) => {
        if (peer && connected) {
            peer.send(message);
            setMessages((prev) => [...prev, `Du: ${message}`]);
        } else {
            setMessages((prev) => [...prev, 'Keine Verbindung vorhanden.']);
        }
    };

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <VStack spacing={4} padding={4} flex="1" overflow="auto">
                {/* Signal-Austausch */}
                {!connected ? (
                    <>
                        {role === 'host' ? (
                            <>
                                {/* Host: Signal erstellen */}
                                <Button colorScheme="blue" onClick={() => initializePeer(true)}>
                                    Host starten
                                </Button>
                                {localSignal && (
                                    <Box>
                                        <Text fontSize="sm">Teile dieses Signal mit dem Player:</Text>
                                        <Input value={localSignal} isReadOnly bg="gray.200" />
                                    </Box>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Player: Signal erstellen */}
                                <Button colorScheme="green" onClick={() => initializePeer(false)}>
                                    Als Player verbinden
                                </Button>
                                {localSignal && (
                                    <Box>
                                        <Text fontSize="sm">Teile dieses Signal mit dem Host:</Text>
                                        <Input value={localSignal} isReadOnly bg="gray.200" />
                                    </Box>
                                )}
                            </>
                        )}

                        {/* Remote Signal eingeben */}
                        <Box>
                            <Text fontSize="sm">
                                Füge hier das Signal des {role === 'host' ? 'Players' : 'Hosts'} ein:
                            </Text>
                            <Input
                                placeholder="Remote-Signal hier einfügen"
                                onChange={(e) => setRemoteSignal(e.target.value)}
                                bg="gray.200"
                            />
                            <Button colorScheme="green" onClick={connectToPeer}>
                                Mit {role === 'host' ? 'Player' : 'Host'} verbinden
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Text color="green.500">Verbindung hergestellt!</Text>
                )}
            </VStack>

            {/* Chatfenster */}
            <ChatWindow
                messages={messages}
                onSendMessage={(message) => sendMessage(message)}
            />
        </Box>
    );
};

export default MainApplication;
