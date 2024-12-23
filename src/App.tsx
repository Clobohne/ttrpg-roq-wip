import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Card,
  CardBody,
  CardFooter,
  Container,
  Input,
  Textarea,
} from '@chakra-ui/react';
import LayoutTemplate from './components/character/LayoutTemplate';
import CharacterSheetTemplate from './components/templates/CharacterSheetTemplate';
import SimplePeer from 'simple-peer';

// Initial Message
const message = {
  color: 'red',
  msg: 'test',
};

// Game Configuration
const config = {
  diceFaceCount: 5,
  diceHistory: ['asd', 'das', 'das'],
  characters: [
    { name: 'lol', class: 'paladin', level: 4 },
    { name: 'lol2', class: 'warrior', level: 1 },
  ],
};

console.log(config);

function App() {
  const [role, setRole] = useState<string | null>(null); // Track user role
  const [hitPoints, setHitPoints] = useState(54);
  const [diceHistory, setDiceHistory] = useState([message]);
  const [diceFaceCount, setDiceFaceCount] = useState(6);

  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const [signalData, setSignalData] = useState<string>(''); // Holds offer/answer data for sharing
  const [inputSignal, setInputSignal] = useState<string>(''); // Holds input data from the other side
  const [connected, setConnected] = useState(false); // Connection status
  const [messages, setMessages] = useState<string[]>([]); // Chat messages
  const [messageToSend, setMessageToSend] = useState<string>(''); // Message to send

  const listItems = diceHistory.map((item, index) => (
    <Text key={index} textAlign="left" textColor={item.color}>
      {item.msg}
    </Text>
  ));

  // Manual signaling for Host
  const startHost = () => {
    const hostPeer = new SimplePeer({ initiator: true, trickle: false });
    setPeer(hostPeer);

    hostPeer.on('signal', (data) => {
      setSignalData(JSON.stringify(data)); // Generate offer
    });

    hostPeer.on('connect', () => {
      setConnected(true);
    });

    hostPeer.on('data', (data) => {
      setMessages((prev) => [...prev, `Player: ${data.toString()}`]);
    });
  };

  // Manual signaling for Player
  const startPlayer = () => {
    const playerPeer = new SimplePeer({ initiator: false, trickle: false });
    setPeer(playerPeer);

    playerPeer.on('signal', (data) => {
      setSignalData(JSON.stringify(data)); // Generate answer
    });

    playerPeer.on('connect', () => {
      setConnected(true);
    });

    playerPeer.on('data', (data) => {
      setMessages((prev) => [...prev, `Host: ${data.toString()}`]);
    });

    // Accept the host's offer
    if (inputSignal) {
      playerPeer.signal(JSON.parse(inputSignal));
    }
  };

  // Accept signal input
  const handleSignalInput = () => {
    if (peer && inputSignal) {
      peer.signal(JSON.parse(inputSignal));
    }
  };

  // Send message
  const sendMessage = () => {
    if (peer && connected && messageToSend) {
      peer.send(messageToSend);
      setMessages((prev) => [...prev, `You: ${messageToSend}`]);
      setMessageToSend('');
    }
  };

  return (
    <Center marginTop="25px">
      <Box borderRadius="10px" bg="#F0CEA0" width="80%">
        {role === null ? (
          <Center>
            <Button onClick={() => setRole('host')} marginX={2}>
              Host
            </Button>
            <Button onClick={() => setRole('player')} marginX={2}>
              Player
            </Button>
          </Center>
        ) : (
          <Tabs>
            <TabList>
              <Tab>Character</Tab>
              <Tab>Skilltree</Tab>
              <Tab>Template</Tab>
              <Tab>Template Layout</Tab>
              <Tab>Template Character Sheet</Tab>
              <Tab>{role === 'host' ? 'Host Panel' : 'Player Panel'}</Tab>
              <Tab>Chat</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>Character Info</Text>
              </TabPanel>

              <TabPanel>
                <Text>Skilltree Info</Text>
              </TabPanel>

              <TabPanel>
                <Stack direction="row" spacing={4}>
                  <Button leftIcon={<Image src="/icons/rpg-pixel-art/book_01a.png" boxSize="32px" />} colorScheme="#F0CEA0" variant="solid">
                    Magic Book
                  </Button>
                  <Button rightIcon={<Image src="/icons/rpg-pixel-art/book_01a.png" boxSize="32px" />} colorScheme="#F0CEA0" variant="outline">
                    Holy Magic
                  </Button>
                  <IconButton aria-label="Search database" colorScheme="#F0CEA0" icon={<Image src="/icons/tabletop/tabletop_105.png" boxSize="32px" />} />
                </Stack>

                <Card maxW="sm">
                  <CardBody>
                    <Image src="/icons/avatar-mage.png" alt="Character Avatar" borderRadius="lg" boxSize="100px" />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">Enemy #10</Heading>
                      <Text>Description</Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button onClick={() => setHitPoints(hitPoints - 10)} variant="solid" colorScheme="blue">
                        Attack
                      </Button>
                      <Button onClick={() => setHitPoints(hitPoints + 5)} variant="ghost" colorScheme="blue">
                        Defend
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </TabPanel>

              <TabPanel>
                <LayoutTemplate />
              </TabPanel>

              <TabPanel>
                <Center>
                  <CharacterSheetTemplate />
                </Center>
              </TabPanel>

              <TabPanel>
                {role === 'host' && !peer && <Button onClick={startHost}>Start Hosting</Button>}
                {role === 'player' && !peer && <Button onClick={startPlayer}>Join as Player</Button>}
                {peer && (
                  <Box>
                    <Text fontWeight="bold">Share this {role === 'host' ? 'offer' : 'answer'}:</Text>
                    <Textarea value={signalData} readOnly />
                    <Divider my={4} />
                    <Text fontWeight="bold">Paste the other side's signal here:</Text>
                    <Input value={inputSignal} onChange={(e) => setInputSignal(e.target.value)} placeholder="Paste signal data here" />
                    <Button onClick={handleSignalInput} marginTop={2}>
                      Submit Signal
                    </Button>
                  </Box>
                )}
              </TabPanel>

              <TabPanel>
                {connected ? (
                  <Box>
                    <Text fontWeight="bold">Chat:</Text>
                    <Box borderWidth="1px" padding="10px" borderRadius="md" height="200px" overflowY="scroll">
                      {messages.map((msg, index) => (
                        <Text key={index}>{msg}</Text>
                      ))}
                    </Box>
                    <Divider my={4} />
                    <Input value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} placeholder="Type a message" />
                    <Button onClick={sendMessage} marginTop={2}>
                      Send
                    </Button>
                  </Box>
                ) : (
                  <Text>Waiting for connection...</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </Center>
  );
}

export default App;
