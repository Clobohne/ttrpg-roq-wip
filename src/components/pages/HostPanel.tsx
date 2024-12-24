import React, { useState } from 'react';
import { Box, Button, Input, Textarea, Text } from '@chakra-ui/react';
import SimplePeer, { Instance } from 'simple-peer';

const HostPanel: React.FC = () => {
    const [peer, setPeer] = useState<Instance | null>(null);
    const [signalData, setSignalData] = useState<string>('');
    const [inputSignal, setInputSignal] = useState<string>('');
    const [connected, setConnected] = useState(false);

    const startHost = () => {
        const hostPeer = new SimplePeer({ initiator: true, trickle: false });
        setPeer(hostPeer);

        hostPeer.on('signal', (data) => {
            setSignalData(JSON.stringify(data)); // Generate offer
        });

        hostPeer.on('connect', () => {
            setConnected(true);
        });
    };

    const handleSignalInput = () => {
        if (peer && inputSignal) {
            peer.signal(JSON.parse(inputSignal)); // Accept the player's answer
        }
    };

    return (
        <Box>
            <Button onClick={startHost}>Start Hosting</Button>
            <Textarea value={signalData} readOnly placeholder="Offer signal will appear here" />
            <Input
                value={inputSignal}
                onChange={(e) => setInputSignal(e.target.value)}
                placeholder="Paste player answer signal here"
            />
            <Button onClick={handleSignalInput}>Submit Signal</Button>
            {connected && <Text>Player Connected!</Text>}
        </Box>
    );
};

export default HostPanel;
