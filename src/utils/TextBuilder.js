import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

function CustomIconButton({icon, text, onClickListener, disable}) {
    return <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        style={{ margin: '0px'}}
        sx={{ mr: 2}}
        onClick={onClickListener}
        disabled={disable}
    >
        {!icon ? '' : icon}
        {!text ? '': <span style={{marginLeft:"5px", fontSize:"14px", fontWeight:"300"}}>{text}</span>}
    </IconButton>
}

function CustomDefaultButton ({icon, text}) {
    return <Button className='cbtn-default' sx={{marginRight: '20px'}}>
                {!icon ? '' : icon}
                {!text ? '' : <span style={{textTransform: 'none', fontWeight:'700', margin:'0px 10px'}} >{text}</span>}
            </Button>
}

function CustomOrangeButton ({icon, text, onClickListener}) {
    return <Button className='cbtn-orange' onClick={onClickListener}>
                {!icon ? '' : icon}
                {!text ? '' : <span style={{textTransform: 'none', fontWeight:'300', margin:'0px 10px'}} >{text}</span>}
            </Button>
}




export {
    CustomIconButton, 
    CustomDefaultButton, 
    CustomOrangeButton, 
}