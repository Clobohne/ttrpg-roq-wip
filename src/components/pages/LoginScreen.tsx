import React from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';

interface LoginScreenProps {
    onLogin: (role: 'host' | 'player') => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    return (
        <Box
            bg="white"
            borderRadius="lg"
            padding="24px"
            maxWidth="400px"
            textAlign="center"
            boxShadow="lg"
        >
            <Heading as="h1" size="lg" mb={6}>
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
