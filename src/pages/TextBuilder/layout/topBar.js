import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../reducers/store';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';

import {ReactComponent as ScreenFullIcon } from '../../../assets/images/svg/screen-full.svg'
import {ReactComponent as HistoryBackIcon } from '../../../assets/images/svg/history-back.svg'
import {ReactComponent as HistoryForwardIcon } from '../../../assets/images/svg/history-forward.svg'
import {ReactComponent as HistoryAllIcon } from '../../../assets/images/svg/history-all.svg'

import { CustomIconButton } from '../../../utils/TextBuilder'

import CustomButtonGroup from '../../../components/CustomButtonGroup';

import { 
    DISABLE_ICON_STROKE, 
    ENABLE_ICON_STROKE
 } from '../consts';

import {
    UPDATE_EDITOR_REDO, 
    UPDATE_EDITOR_UNDO
} from '../../../reducers/actions'


function CustomDivider () {
    return <Divider
        sx={{ backgroundColor: "white", marginTop: '6px', marginBottom: '6px', width: '1px' }}
        orientation="vertical"
        flexItem
    />
}


function TopBar() {
    //Get Editor from todoReducer
    const { editor, undo, redo } = useSelector(state => state.textBuilder)

    const [undoStroke, setUndoStroke] = useState(DISABLE_ICON_STROKE)
    const [redoStroke, setRedoStroke] = useState(DISABLE_ICON_STROKE)

    useEffect(() => {
        if(!editor) return;

        const um = editor.UndoManager;
        if(um.hasUndo()) {
            setUndoStroke(ENABLE_ICON_STROKE)
        } else {
            setUndoStroke(DISABLE_ICON_STROKE)
        }

        if(um.hasRedo()) {
            setRedoStroke(ENABLE_ICON_STROKE)
        } else {
            setRedoStroke(DISABLE_ICON_STROKE)
        }
    }, [undo, redo])

    // viewport manager
    const handleOnClickComputerView = (event) => {
        const deviceManager = editor.Devices;

        deviceManager.select(deviceManager.get('desktop'));
    }

    const handleOnClickPhoneView = (event) => {
        const deviceManager = editor.Devices;

        deviceManager.select(deviceManager.get('Mobile portrait'));
    }

    // history manager
    const handleOnClickUndo = ( event ) => {
        const um = editor.UndoManager
        if(um.hasUndo()) {
            um.undo()

            dispatch({type: UPDATE_EDITOR_REDO, redo: redo + 1, undo: undo - 1 })
        }
    }

    const handleOnClockRedo = (event) => {
        const um = editor.UndoManager
        if(um.hasRedo()){
            um.redo()

            dispatch({type: UPDATE_EDITOR_REDO, redo: redo - 1, undo: undo + 1 })
        }
    }

    const handleOnClickUndoAll = (event) => {
        const um = editor.UndoManager

        if(um.hasUndo()) {
            um.undoAll()

            dispatch({type: UPDATE_EDITOR_REDO, redo: redo + undo, undo: 0 })
        }
    }

    return (<Box sx={{ flexGrow: 1 }} >
                <AppBar position="static" className="header-color">
                    <Toolbar
                        className='modal-header-button-pos'
                    >
                        <Box
                            sx={{ '& > :not(style)': { m: 1,},}}
                            display="flex"
                            >
                            <CustomIconButton icon={<CloseIcon />} />
                            <CustomDivider />
                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': {
                                m: 1,
                                },
                            }}
                            display="flex"
                            >
                            
                            <CustomIconButton icon={<SettingsOutlinedIcon />} />
                            <CustomIconButton icon={<HelpOutlineOutlinedIcon />} text="Help" />
                            <CustomDivider />
                            
                            <CustomIconButton icon={<ComputerOutlinedIcon />} onClickListener={handleOnClickComputerView} />
                            <CustomIconButton icon={<SmartphoneOutlinedIcon />} onClickListener={handleOnClickPhoneView} />
                            <CustomIconButton icon={<ZoomOutMapOutlinedIcon />} />
                            <CustomIconButton icon={<ScreenFullIcon />} />
                            <CustomDivider />

                            <CustomIconButton icon={<HistoryBackIcon stroke={undoStroke} />} onClickListener={handleOnClickUndo} />
                            <CustomIconButton icon={<HistoryForwardIcon stroke={redoStroke} />} onClickListener={handleOnClockRedo} />
                            <CustomIconButton icon={<HistoryAllIcon stroke={undoStroke} />} onClickListener={handleOnClickUndoAll} />
                            <CustomDivider />
                            
                            <CustomIconButton text="Save" />
                            <CustomButtonGroup text="Publish" options={['Publish']} />


                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>)
}

export default TopBar;