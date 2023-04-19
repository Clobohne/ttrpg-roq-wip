import React, { createContext, useContext, useState } from 'react';

type SubSettings ={
    music: boolean;
}

type Character = {
    name: string;
    stats: Stats;
    // Add more character properties as needed
}

type Stats = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

type Settings = {
    music: boolean;
    soundEffects: boolean;
    difficulty: 'easy' | 'normal' | 'hard';
    sub: SubSettings;
    // Add more settings as needed
};

export type SettingsContextValue = {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
};

const defaultSettings: SettingsContextValue = {
    settings: {
        music: true,
        soundEffects: true,
        difficulty: 'normal',
        // Add more settings as needed
    },
    updateSettings: () => { },
};

export const SettingsContext = createContext<SettingsContextValue>(defaultSettings);

type SettingsProviderProps = {
    children: React.ReactNode;
    // add optional settings prop
    settings?: Partial<Settings>;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children, settings = {} }) => {
    const [currentSettings, setCurrentSettings] = useState<Settings>({
        ...defaultSettings.settings,
        ...settings,
    });

    const updateSettings = (newSettings: Partial<Settings>) => {
        setCurrentSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings: currentSettings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;