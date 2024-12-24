import React, { useState } from 'react';
import { Box, HStack, Button } from '@chakra-ui/react';
import HostPanel from 'components/pages/HostPanel';
import PlayerPanel from 'components/pages/PlayerPanel';
import ChatPanel from 'components/pages/ChatPanel';
import DiceRoller from 'components/pages/DiceRoller';
import CharacterSheet from 'components/pages/CharacterSheet';
import ChatWindow from 'components/pages/ChatWindow';

interface MainApplicationProps {
    role: 'host' | 'player';
}

const MainApplication: React.FC<MainApplicationProps> = ({ role }) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [messages, setMessages] = useState<string[]>([]);

    // Tab definitions
    const tabs = [
        { label: 'Character', content: <CharacterSheet /> },
        { label: 'Dice Roller', content: <DiceRoller /> },
        { label: 'Chat', content: <ChatPanel /> },
        {
            label: role === 'host' ? 'Host Panel' : 'Player Panel',
            content: role === 'host' ? <HostPanel /> : <PlayerPanel />,
        },
    ];

    const handleSendMessage = (message: string) => {
        setMessages((prev) => [...prev, `You: ${message}`]);
    };

    const handleReceiveMessage = (message: string) => {
        setMessages((prev) => [...prev, `Other: ${message}`]);
    };

    React.useEffect(() => {
        // const interval = setInterval(() => {
        //     handleReceiveMessage('Simulated WebRTC message from MainApplication');
        // }, 10000);

        // return () => clearInterval(interval);
    }, []);

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            {/* Dynamic Navigation */}
            <HStack spacing={4} padding={4} bg="blue.600" color="white" justifyContent="center">
                {tabs.map((tab, index) => (
                    <Button
                        key={index}
                        variant={activeTabIndex === index ? 'solid' : 'ghost'}
                        colorScheme="whiteAlpha"
                        onClick={() => setActiveTabIndex(index)}
                    >
                        {tab.label}
                    </Button>
                ))}
            </HStack>

            {/* Tab Content */}
            <Box flex="1" padding={4} overflow="auto">
                {tabs[activeTabIndex].content}
            </Box>

            {/* Persistent Chat Window */}
            <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
        </Box>
    );
};

export default MainApplication;
