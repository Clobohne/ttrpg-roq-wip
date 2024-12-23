import { Flex, Center, Box, Text, Spacer, Heading } from '@chakra-ui/react';
import StatTemplate from '../../components/templates/StatTemplate';


function CharacterSheetTemplate() {

    return (
        <Box bgColor='white' width='1200px' height='800px' justifyContent='center'>
            <Flex color='white'>
                <Center w='200px' h='800px' bg='green.500'>
                    <Flex flexDirection='column' gap='4'>
                        <Heading textAlign='center'>STATS</Heading>
                        <StatTemplate {...{ name: "STR" }} />
                        <Spacer />
                        <StatTemplate {...{ name: "CON" }} />
                        <Spacer />
                        <StatTemplate {...{ name: "DEX" }} />
                        <Spacer />
                        <StatTemplate {...{ name: "INT" }} />
                        <Spacer />
                        <StatTemplate {...{ name: "SPI" }} />
                        <Spacer />
                        <StatTemplate {...{ name: "CHAR" }} />
                        <Spacer />
                        <StatTemplate {...{ name: "LUCK" }} />
                    </Flex>
                </Center>
                <Box flex='1' bg='tomato'>
                    <Text>Box 3</Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default CharacterSheetTemplate;