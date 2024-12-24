import React from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';

interface LoginScreenProps {
    onLogin: (role: 'host' | 'player') => void; // Restrict to 'host' or 'player'
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    return (
        <Box
            bg="white"
            borderRadius="md"
            padding="20px"
            width="300px"
            textAlign="center"
            boxShadow="lg"
        >
            <Heading size="xl" mb={4}>
                Choose Your Role
            </Heading>
            <Stack spacing={4}>
                <Button colorScheme="blue" onClick={() => onLogin('host')}>
                    Host
                </Button>
                <Button colorScheme="green" onClick={() => onLogin('player')}>
                    Player
                </Button>
            </Stack>
        </Box>
    );
};

export default LoginScreen;
