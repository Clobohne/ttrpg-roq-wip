import React, { useState } from 'react';
import './CharacterPage.css';
import { Box, Divider, Flex, Heading } from '@chakra-ui/react'

function CharacterPage() {

    return (
        <Box className="page">
            <Heading textAlign={'right'} textColor='black'>I'm a Heading</Heading>
            <Divider />
            <Flex className='split'>
                <div className='split-left'>

                </div>
                <div className='split-right'>

                </div>
            </Flex>
        </Box >
    );
}

export default CharacterPage;