import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ButtonGroup, Stack } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import NumberInputFieldTab from './components/numberInputField/numberInputField';

function App() {
  const [hitPoints, sethitPoints] = useState(54);
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const damage = 1 * 4;
  const armour = 2;

  const calculateHit = () => {
    let dmg = hitPoints - (damage - armour);
    sethitPoints(dmg);
    console.log(checkedItems);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {hitPoints}
        <Tabs>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Button size='large' colorScheme='blue' onClick={calculateHit}>Button</Button>
            </TabPanel>
            <TabPanel>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
              >
                Parent Checkbox
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                >
                  Child Checkbox 1
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[1]}
                  onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                >
                  Child Checkbox 2
                </Checkbox>
              </Stack>
            </TabPanel>
            <TabPanel>
              <NumberInputFieldTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
