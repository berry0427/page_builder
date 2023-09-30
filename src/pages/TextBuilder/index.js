import React from 'react'
import { Box } from '@mui/material';

import TopBar from './layout/topBar';
import RightBar from './layout/rightBar';
import Builder from './builder';


function TextBuilder() {
    return <>
            <TopBar />
            <Box style={{display: 'flex'}}>
                <Builder />
                <RightBar />
            </Box>
        </>
}

export default TextBuilder;