import React, { useContext } from 'react';
import { SettingsContext, SettingsContextValue } from '../../context/SettingsContext';

const DisplaySettings: React.FC = () => {
    const { settings, updateSettings } = useContext(SettingsContext) as SettingsContextValue;

    const renderSetting = (label: string, value: boolean) => (
        <li>
            {label}: {value ? 'On' : 'Off'}
        </li>
    );

    const toggleMusic = () => {
        updateSettings({ music: !settings.music });
    };

    return (
        <section>
            <h2>Settings:</h2>
            <ul>
                {renderSetting('Music', settings.music)}
                {renderSetting('Sound Effects', settings.soundEffects)}
                <li>Difficulty: {settings.difficulty}</li>
                {renderSetting('Sub-settings Music', settings.sub.music)}
            </ul>
            <button onClick={toggleMusic}>Toggle Music</button>
        </section>
    );
};

export default DisplaySettings;

// import React, { useContext } from 'react';
// import { SettingsContext } from '../../context/SettingsContext';

// const DisplaySettings = () => {
//     const { settings } = useContext(SettingsContext);

//     return (
//         <div>
//             <h2>Settings:</h2>
//             <ul>
//                 <li>Music: {settings.music ? 'On' : 'Off'}</li>
//                 <li>Sound Effects: {settings.soundEffects ? 'On' : 'Off'}</li>
//                 <li>Difficulty: {settings.difficulty}</li>
//                 <li>Sub-settings: {settings.sub.music ? 'Music On' : 'Music Off'}</li>
//             </ul>
//         </div>
//     );
// };

// export default DisplaySettings;