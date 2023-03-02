import { Flex, Center, Box, Text, Button, Input, HStack, useNumberInput } from '@chakra-ui/react';

type StatProperties = {
    name: string;
};

const StatTemplate = (props: StatProperties) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: 99,
        });
    const { name } = props;
    const incrementValue = getIncrementButtonProps();
    const decrementValue = getDecrementButtonProps();
    const inputValue = getInputProps();

    return (
        <Box bgColor='white'>
            <Center>
                <Flex flexDirection='column'>
                    <Text color='black' textAlign='center'>{name}</Text>
                    <HStack>
                        <Button size='sm' color='black' {...incrementValue}>+</Button>
                        <Input size='sm' maxWidth='50px' color='black' {...inputValue} />
                        <Button size='sm' color='black' {...decrementValue}>-</Button>
                    </HStack>
                </Flex>
            </Center>
        </Box>
    );
}

export default StatTemplate;