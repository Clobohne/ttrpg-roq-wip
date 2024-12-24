import React, { useState } from 'react';
import { Center } from '@chakra-ui/react';
import LoginScreen from 'components/pages/LoginScreen';
import MainApplication from 'components/pages/MainApplication';

function App() {
  const [role, setRole] = useState<'host' | 'player' | null>(null);

  return (
    <Center height="100vh" bg="#F5F5F5">
      {role === null ? (
        <LoginScreen onLogin={(selectedRole: 'host' | 'player') => setRole(selectedRole)} />
      ) : (
        <MainApplication role={role} />
      )}
    </Center>
  );
}

export default App;
