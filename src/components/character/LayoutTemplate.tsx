import { Flex, Center, Square, Box, Text, Grid, GridItem, Spacer, Button, ButtonGroup, Heading, Checkbox, Input } from '@chakra-ui/react';

function LayoutTemplate() {

    return (
        <Box>
            <Flex color='white'>
                <Center w='100px' bg='green.500'>
                    <Text>Box 1</Text>
                </Center>
                <Square bg='blue.500' size='150px'>
                    <Text>Box 2</Text>
                </Square>
                <Box flex='1' bg='tomato'>
                    <Text>Box 3</Text>
                </Box>
            </Flex>

            <Flex>
                <Box p='4' bg='red.400'>
                    Box 1
                </Box>
                <Spacer />
                <Box p='4' bg='green.400'>
                    Box 2
                </Box>
            </Flex>


            <Grid
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}>
                <GridItem rowSpan={2} colSpan={1} bg='white' color='black'>
                    <Flex minWidth='max-content' alignItems='center' gap='2'>
                        <Box p='2'>
                            <Heading size='md'>Chakra App</Heading>
                        </Box>
                        <Spacer />
                        <ButtonGroup gap='2'>
                            <Button colorScheme='teal'>Sign Up</Button>
                            <Button colorScheme='teal'>Log in</Button>
                        </ButtonGroup>
                    </Flex>
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip'> Hallo Ich bin nicht im Zentrum weil mir die property fehlt</GridItem>
                <GridItem colSpan={2} bg='papayawhip'>
                    <Center h='100px' color='black'>
                        Ziemlich gemütlich hier
                    </Center>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                    <Checkbox defaultChecked>Check mich hart</Checkbox>
                </GridItem >
            </Grid>

            <Center bg='beige' h='100px' color='black'>
                This is the Center
            </Center>
            <Center h='100px' color='black'>
                <Input width='200px' borderColor='black' color='black' placeholder='Hier was eingeben' />
            </Center>
        </Box>
    );
}

export default LayoutTemplate;