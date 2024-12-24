import React, { useState } from 'react';
import { Box, Button, Input, Textarea, Text } from '@chakra-ui/react';
import SimplePeer, { Instance } from 'simple-peer';

const PlayerPanel: React.FC = () => {
    const [peer, setPeer] = useState<Instance | null>(null);
    const [signalData, setSignalData] = useState<string>('');
    const [inputSignal, setInputSignal] = useState<string>('');
    const [connected, setConnected] = useState(false);

    const startPlayer = () => {
        const playerPeer = new SimplePeer({ initiator: false, trickle: false });
        setPeer(playerPeer);

        playerPeer.on('signal', (data) => {
            setSignalData(JSON.stringify(data)); // Generate answer
        });

        playerPeer.on('connect', () => {
            setConnected(true);
        });

        if (inputSignal) {
            playerPeer.signal(JSON.parse(inputSignal)); // Accept the host's offer
        }
    };

    return (
        <Box>
            <Input
                value={inputSignal}
                onChange={(e) => setInputSignal(e.target.value)}
                placeholder="Paste host offer signal here"
            />
            <Button onClick={startPlayer}>Join Host</Button>
            <Textarea value={signalData} readOnly placeholder="Answer signal will appear here" />
            {connected && <Text>Connected to Host!</Text>}
        </Box>
    );
};

export default PlayerPanel;
