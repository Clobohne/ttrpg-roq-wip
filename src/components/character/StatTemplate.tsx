import React, { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

type StatTemplateProps = {
    name: string;
};

const StatTemplate: React.FC<StatTemplateProps> = ({ name }) => {
    const { settings, updateSettings } = useContext(SettingsContext);
    const [inputValue, setInputValue] = useState<boolean | string>("");

    useEffect(() => {
        updateSettings({ [name]: inputValue });
    }, [inputValue, name, updateSettings]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value as boolean | 'easy' | 'normal' | 'hard');
    };

    const handleDecrement = () => {
        setInputValue((prevValue) => {
            if (typeof prevValue === 'boolean') {
                return false;
            } else if (prevValue === 'easy') {
                return false;
            } else if (prevValue === 'normal') {
                return 'easy';
            } else if (prevValue === 'hard') {
                return 'normal';
            } else {
                return prevValue;
            }
        });
    };

    const handleIncrement = () => {
        setInputValue((prevValue) => {
            if (typeof prevValue === 'boolean') {
                return 'easy';
            } else if (prevValue === 'easy') {
                return 'normal';
            } else if (prevValue === 'normal') {
                return 'hard';
            } else {
                return prevValue;
            }
        });
    };

    const getInputProps = () => {
        return {
            type: typeof inputValue === 'boolean' ? 'checkbox' : 'text',
            checked: typeof inputValue === 'boolean' ? inputValue : undefined,
            value: typeof inputValue === 'boolean' ? undefined : inputValue,
            onChange: handleInputChange,
        };
    };

    const getDecrementButtonProps = () => {
        return {
            onClick: handleDecrement,
            disabled: typeof inputValue === 'number' && inputValue === 0,
        };
    };

    const getIncrementButtonProps = () => {
        return {
            onClick: handleIncrement,
            disabled: typeof inputValue === 'number' && inputValue === 10,
        };
    };

    const decrementValue = getDecrementButtonProps();
    const inputValueProps = getInputProps();
    const incrementValue = getIncrementButtonProps();

    return (
        <div>
            <button {...decrementValue}>-</button>
            <input {...inputValueProps} />
            <button {...incrementValue}>+</button>
        </div>
    );
};

export default StatTemplate;