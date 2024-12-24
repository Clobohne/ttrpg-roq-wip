import React, { useState } from 'react';
import {
    Box,
    Button,
    Center,
    Divider,
    Heading,
    Stack,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

interface Character {
    name: string;
    class: string;
    level: number;
    attributes: {
        strength: number;
        agility: number;
        intelligence: number;
        endurance: number;
    };
}

const initialCharacter: Character = {
    name: 'Aragorn',
    class: 'Ranger',
    level: 5,
    attributes: {
        strength: 15,
        agility: 12,
        intelligence: 10,
        endurance: 14,
    },
};

const CharacterSheet: React.FC = () => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    // Function to update an attribute
    const updateAttribute = (key: keyof Character['attributes'], value: number) => {
        setCharacter((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                [key]: value,
            },
        }));
    };

    return (
        <Box padding="4" borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
            <Stack spacing={4}>
                <Center>
                    <Heading size="md">Character Sheet</Heading>
                </Center>
                <Divider />
                <Text fontSize="lg" fontWeight="bold">
                    Name: {character.name}
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                    Class: {character.class}
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                    Level: {character.level}
                </Text>
                <Divider />
                <Heading size="sm">Attributes</Heading>
                <Stack spacing={2}>
                    {Object.entries(character.attributes).map(([key, value]) => (
                        <Box key={key}>
                            <Text fontSize="md" fontWeight="bold" textTransform="capitalize">
                                {key}: {value}
                            </Text>
                            <NumberInput
                                defaultValue={value}
                                min={1}
                                max={20}
                                width="120px"
                                onChange={(valueString) => updateAttribute(key as keyof Character['attributes'], parseInt(valueString))}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                    ))}
                </Stack>
                <Button colorScheme="blue" onClick={() => alert('Character updated successfully!')}>
                    Save Changes
                </Button>
            </Stack>
        </Box>
    );
};

export default CharacterSheet;
