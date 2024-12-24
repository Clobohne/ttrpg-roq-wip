import React, { useState } from 'react';
import {
    Box,
    Button,
    Center,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack,
    Text,
    Divider,
} from '@chakra-ui/react';

const DiceRoller: React.FC = () => {
    const [diceFaceCount, setDiceFaceCount] = useState<number>(6); // Number of faces on the dice
    const [rollHistory, setRollHistory] = useState<number[]>([]); // Stores the history of dice rolls

    // Function to roll the dice
    const rollDice = () => {
        const rollResult = Math.floor(Math.random() * diceFaceCount) + 1; // Random number between 1 and diceFaceCount
        setRollHistory((prev) => [rollResult, ...prev]); // Add to roll history
    };

    return (
        <Box padding="4" borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
            <Stack spacing={4}>
                <Center>
                    <Text fontSize="lg" fontWeight="bold">
                        Dice Roller
                    </Text>
                </Center>
                <Divider />
                <Center>
                    <Text>Number of Dice Faces:</Text>
                    <NumberInput
                        defaultValue={6}
                        min={2}
                        max={100}
                        width="100px"
                        onChange={(valueString) => setDiceFaceCount(parseInt(valueString))}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Center>
                <Button colorScheme="blue" onClick={rollDice}>
                    Roll Dice
                </Button>
                <Divider />
                <Box>
                    <Text fontSize="md" fontWeight="bold">
                        Roll History:
                    </Text>
                    {rollHistory.length === 0 ? (
                        <Text>No rolls yet!</Text>
                    ) : (
                        rollHistory.map((roll, index) => (
                            <Text key={index}>Roll {index + 1}: {roll}</Text>
                        ))
                    )}
                </Box>
            </Stack>
        </Box>
    );
};

export default DiceRoller;
