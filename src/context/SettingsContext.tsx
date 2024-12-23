import React, { createContext, useContext, useState } from 'react';

type SubSettings = {
    music: boolean;
};

type Character = {
    name: string;
    stats: Stats;
    // Add more character properties as needed
};

type Stats = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
};

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

// Define the default settings
const defaultSettings: SettingsContextValue = {
    settings: {
      music: true,
      soundEffects: true,
      difficulty: 'normal',
      sub: {
        music: true,
      },
      // Add more settings as needed
    },
    updateSettings: () => {},
  };
  
  // Create a context with the default settings
  export const SettingsContext = createContext<SettingsContextValue>(defaultSettings);
  
  // Define the props for the SettingsProvider component
  type SettingsProviderProps = {
    children: React.ReactNode;
    // Add an optional settings prop
    settings?: Partial<Settings>;
  };
  
  // Create the SettingsProvider component
  export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children, settings = {} }) => {
    // Set the initial state to the default settings merged with any passed-in settings
    const [currentSettings, setCurrentSettings] = useState<Settings>({
      ...defaultSettings.settings,
      ...settings,
    });
  
    // Update the current settings state with new settings
    const updateSettings = (newSettings: Partial<Settings>) => {
      setCurrentSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
      // Log when the settings are updated
      console.log('Settings updated:', currentSettings);
    };
  
    // Log when the SettingsProvider is rendered
    console.log('SettingsProvider rendered with settings:', currentSettings);
  
    // Return the SettingsContext provider with the current settings and updateSettings function
    return (
      <SettingsContext.Provider value={{ settings: currentSettings, updateSettings }}>
        {children}
      </SettingsContext.Provider>
    );
  };
  
  export default SettingsProvider;