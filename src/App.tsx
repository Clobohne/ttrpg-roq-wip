import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, CardBody, CardFooter, Container, Divider, Flex, Heading, IconButton, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { Box, Button, ButtonGroup, Center, Stack, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import LayoutTemplate from './components/templates/LayoutTemplate';
import CharacterSheetTemplate from './components/templates/CharacterSheetTemplate';

const message = {
  "color": 'red',
  "msg": "test"
};

const config = {
  "diceFaceCount": 5,
  "diceHistory": ['asd', 'das', 'das'],
  "characters": [
    {
      "name": "lol",
      "class": "paladin",
      "level": 4,
    },
    {
      "name": "lol2",
      "class": "warrior",
      "level": 1,
    }
  ]
}
console.log(config)


function App() {
  const [hitPoints, sethitPoints] = useState(54);
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  // Related to dice mechanics
  const [diceHistory, setDiceHistory] = useState([message]);
  const [diceFaceCount, setDiceFaceCount] = useState(6);

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const damage = 1 * 4;
  const armour = 2;

  const history: never[] = [];
  console.log(history);
  console.log(isIndeterminate);
  console.log(setCheckedItems);
  const listItems = diceHistory.map((item) =>
    <Text textAlign='left' textColor={item.color}>{item.msg}</Text>
  );


  useEffect(() => {
    const calculateHit = () => {
      let dmg = hitPoints - (damage - armour);
      sethitPoints(dmg);
      console.log(checkedItems);
    }

    if (checked) {
      const result = Math.floor(Math.random() * diceFaceCount);
      const message = 'Dice result: ' + result.toString() + '\n';
      let color = "white";
      if (result === diceFaceCount - 2) {
        color = "red";
      }
      const tempHistory = diceHistory;
      tempHistory.push({ "color": color, "msg": message });
      setDiceHistory(tempHistory);
      setChecked(false);
      calculateHit();
    }


  }, [checked, checkedItems, damage, diceFaceCount, diceHistory, hitPoints]);

  const rollDice = () => {
    const result = Math.floor(Math.random() * diceFaceCount);
    const message = 'Dice result: ' + result.toString() + '\n';
    let color = "white";
    if (result === diceFaceCount - 2) {
      color = "red";
    }
    const tempHistory = diceHistory;
    tempHistory.push({ "color": color, "msg": message });
    setDiceHistory(tempHistory);
    return message;
  }
  rollDice();

  return (
    <Center marginTop='25px'>
      <Box borderRadius='10px' bg='#F0CEA0' width='80%'>
        <Tabs>
          <TabList>
            <Tab>Character</Tab>
            <Tab>Skilltree</Tab>
            <Tab>Template</Tab>
            <Tab>Template Layout</Tab>
            <Tab>Template Character Sheet</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>

            <TabPanel>
              <p>two!</p>
            </TabPanel>

            <TabPanel>
              <Stack direction='row' spacing={4}>
                <Button leftIcon={<Image src='/icons/rpg-pixel-art/book_01a.png' boxSize='32px' />} colorScheme='#F0CEA0' variant='solid'>
                  Magic Book
                </Button>
                <Button rightIcon={<Image src='/icons/rpg-pixel-art/book_01a.png' boxSize='32px' />} colorScheme='#F0CEA0' variant='outline'>
                  Holy Magic
                </Button>
                <IconButton aria-label='Search database' colorScheme='#F0CEA0' icon={<Image src='/icons/tabletop/tabletop_105.png' boxSize='32px' />} />
              </Stack>

              <Card maxW='sm'>
                <CardBody>
                  <Image
                    src='/icons/avatar-mage.png'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    boxSize='100px'
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>Enemy #10</Heading>
                    <Text>
                      Description
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing='2'>
                    <Button onClick={() => setChecked(true)} variant='solid' colorScheme='blue'>
                      Attack
                    </Button>
                    <Button onClick={() => setChecked(true)} variant='ghost' colorScheme='blue'>
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
          </TabPanels>
        </Tabs>


        <Divider />


        <Box borderRadius='10px' bg='#534D41'>
          <Flex color='white'>
            <Button onClick={() => setChecked(true)} rightIcon={<Image src='/icons/tabletop/tabletop_39.png' boxSize='32px' />} colorScheme='#F0CEA0' variant='outline'>
              Roll Dice
            </Button>
            <IconButton aria-label='Search database' colorScheme='#F0CEA0' icon={<Image src='/icons/tabletop/tabletop_105.png' boxSize='32px' />} />
            <Center>
              Dice Face Count
              <NumberInput defaultValue={6} onChange={(valueString) => setDiceFaceCount(parseInt(valueString))} >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Center>
            <Center>

            </Center>
          </Flex>
          <Box borderRadius='10px' bg='##534D41'>
            <Container alignItems='left' width='800px'>
              {listItems}
            </Container>
          </Box>
        </Box>
      </Box >
    </Center>
  );
}

export default App;
