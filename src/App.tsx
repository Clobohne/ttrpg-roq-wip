import React, { useState } from 'react';
import { Center } from '@chakra-ui/react';
import LoginScreen from 'components/pages/LoginScreen';
import MainApplication from 'components/pages/MainApplication';

const App: React.FC = () => {
  const [role, setRole] = useState<'host' | 'player' | null>(null);

  const handleLogin = (selectedRole: 'host' | 'player') => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null); // Reset role to return to LoginScreen
  };

  return (
    <Center height="100vh" bg="#F5F5F5">
      {role === null ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <MainApplication role={role} onLogout={handleLogout} />
      )}
    </Center>
  );
};

export default App;
