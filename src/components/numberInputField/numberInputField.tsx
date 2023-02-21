import React, { useState } from 'react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

function NumberInputFieldTab() {
    const format = (val: string) => `$` + val
    const parse = (val: string) => val.replace(/^\$/, '')

    const [value, setValue] = React.useState('1')
    const [max, setMax] = React.useState(50);

    return (
        <div className="input-field">
            <NumberInput onChange={(valueString) => setValue(parse(valueString))} step={1} value={format(value)} max={max}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </div>
    );
}

export default NumberInputFieldTab;
