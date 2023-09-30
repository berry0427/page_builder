import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../reducers/store';
import { UPDATE_EDITOR_UNDO } from '../../../reducers/actions'

import { Box, Button } from '@mui/material'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


import {ReactComponent as ThemeIcon } from '../../../assets/images/svg/theme.svg'
import {ReactComponent as MountainIcon } from '../../../assets/images/svg/mountains-sun.svg'
import {ReactComponent as SectionIcon } from '../../../assets/images/svg/section.svg'
import {ReactComponent as AlignArrowLeft } from '../../../assets/images/svg/align-arrow-left.svg'
import {ReactComponent as AlignArrowRight } from '../../../assets/images/svg/align-arrow-right.svg'
import {ReactComponent as ThreeCircle } from '../../../assets/images/svg/three-circle.svg'
import {ReactComponent as EyeIcon } from '../../../assets/images/svg/eye.svg'
import {ReactComponent as KeyIcon } from '../../../assets/images/svg/key.svg'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import CloseIcon from '@mui/icons-material/Close';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import { MuiColorInput } from 'mui-color-input';

import CircleColorPicker from '../../../components/CircleColorPicker';

import {
    CONTENT_ALIGN,
    TEXT_CONTAINER_WIDTH, 
    ALIGN, 
    INNER_PADDING, 
    SECTION_MARGIN_TOP, 
    SECTION_MARGIN_BOTTOM, 
    HEIGHT, 
    VERTICAL_ALIGN
} from '../consts'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));


function RightBar() {
    const { editor, undo } = useSelector(state => state.textBuilder)

    const setStyleSheet = (style) => {
        const selectedComponent = editor.getSelected();

        if (selectedComponent) {
            // Set padding for the selected component
            selectedComponent.addStyle(style); // Customize padding value

            dispatch({type: UPDATE_EDITOR_UNDO, undo: undo + 1})
        }
    }

    const setStyleSheetOnGivenCompoment = (component, style ) => {
        component.addStyle(style);

        dispatch({type: UPDATE_EDITOR_UNDO, undo: undo + 1})
        console.log(component)
    }


    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


// toggle button

    // first panel
    const [contentAlignment, setContentAlignment] = useState('text_align_left');
    const handleContentAlignment = (event, contentAlignment) => {
        setContentAlignment(contentAlignment);

        setStyleSheet(CONTENT_ALIGN[contentAlignment])
    };

    const [width, setWidth] = useState('w_full');
    const handleWidth = (event, newWidth) => {
        setWidth(newWidth);

        setStyleSheet(TEXT_CONTAINER_WIDTH[newWidth])
    };

    const [alignment, setAlignment] = useState('left');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);

        setStyleSheet(ALIGN[newAlignment])
    };

    const [innerPadding, setInnerPadding] = useState('p_s');
    const handleInnerPadding = (event, innerPadding) => {
        setInnerPadding(innerPadding);

        setStyleSheet(INNER_PADDING[innerPadding])
    };

    const [backgroundColor, setBackgroundColor] = useState('#ffffff')

    const handleBackgroundColor = (event, backgroundColor) => {
        setBackgroundColor(backgroundColor.hex)

        setStyleSheet({'background-color': backgroundColor.hex})
    }

    const [sectionHeader, setSectionHeader] = useState(true)
    const handleOnChangeSectionHeader = (e) => {
        setSectionHeader(e.target.checked)

        const components = editor.Components.componentsById;
        for (const key in components) {
            let component = components[key]

            if(component.attributes.type === 'text' && component.attributes.tagName.startsWith('h')){
                if(e.target.checked)
                    setStyleSheetOnGivenCompoment( component, {display: 'block'})
                else 
                    setStyleSheetOnGivenCompoment( component, {display: 'none'})
            }
        }
    }
    // second panel
    const [headingColor, setHeadingColor] = useState('#f04545');
    const handleHeadingColorChange = (e) => {
        setHeadingColor(e.target.value)

        const components = editor.Components.componentsById;
        for (const key in components) {
            let component = components[key]

            if(component.attributes.type == 'text' && component.attributes.tagName.startsWith('h')){
                setStyleSheetOnGivenCompoment( component, {color: e.target.value})
            }
        }
    }

    const [paragraphColor, setParagraphColor] = useState('#294753');
    const handleParagraphColorChange = (e) => {
        setParagraphColor(e.target.value)

        const components = editor.Components.componentsById;
        for (const key in components) {
            let component = components[key]

            if(component.attributes.type == 'text' && !component.attributes.tagName.startsWith('h')){
                setStyleSheetOnGivenCompoment( component, {color: e.target.value})
            }
        }
    }

    const [accentColor, setAccentColor] = useState('#94a3a9');
    const handleAccentColorChange = (e) => {
        setAccentColor(e.target.value)

        const components = editor.Components.componentsById;
        for (const key in components) {
            let component = components[key]

            if(component.attributes.type == 'text' ){
                setStyleSheetOnGivenCompoment( component, {'accent-color': e.target.value})
            }
        }
    }

    const [primaryButtonColor, setPrimaryButtonColor] = useState('#f9fbfc');
    const handlePrimaryButtonColorChange = (e) => {
        setPrimaryButtonColor(e.target.value)

        const components = editor.Components.componentsById;

        for (const key in components) {
            let component = components[key]

            if(component.attributes.tagName == 'button'){
                setStyleSheetOnGivenCompoment( component, {color: e.target.value})
            }
        }
    }

    const [baseColor, setBaseColor] = useState('#ffffff');
    const handleBaseColorChange = (e) => {
        setBaseColor(e.target.value)
    }

    // third panel
    const [sectionMarginTop, setSectionMarginTop] = useState('mt_s');
    const handleSectionMarginTopChange = (e) => {
        setSectionMarginTop(e.target.value)

        setStyleSheet(SECTION_MARGIN_TOP[e.target.value])
    }

    const [sectionMarginBottom, setSectionMarginBottom] = useState('mb_s');
    const handleSectionMarginBottomChange = (e) => {
        setSectionMarginBottom(e.target.value)

        setStyleSheet(SECTION_MARGIN_BOTTOM[e.target.value])
    }

    const [height, setHeight] = useState('vh_s');
    const handleHeightChange = (e, height) => {
        setHeight(height)

        setStyleSheet(HEIGHT[height])
    }

    const [verticalAlign, setVerticalAlign] = useState('top');
    const handleVerticalAlignChange = (e, verticalAlign) => {
        setVerticalAlign(verticalAlign)

        setStyleSheet(VERTICAL_ALIGN[verticalAlign])
    }


    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
          '& .MuiSwitch-thumb': {
            width: 15,
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: theme.transitions.create(['width'], {
            duration: 200,
          }),
        },
        '& .MuiSwitch-track': {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
          boxSizing: 'border-box',
        },
      }));

    return (    
        <Box sx={{ flexGrow: 1 , borderLeft: '1px solid #f0f2f4'}} className="panel-right ">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="panel-color">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab icon={<ThemeIcon />} {...a11yProps(0)} style={{minWidth: '33%'}} />
                    <Tab icon={<MountainIcon />} {...a11yProps(1)} style={{minWidth: '33%'}} />
                    <Tab icon={<SectionIcon />} {...a11yProps(2)} style={{minWidth: '33%'}} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} style={{padding: '0px'}}>
                <div>
                    <Accordion defaultExpanded style={{margin: '0px'}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography style={{fontWeight: '700', fontSize: '13px'}}>Theme</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <div>
                                <span className='item-text'>Content Alignment</span>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        display: 'flex',
                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                        flexWrap: 'wrap',
                                        marginTop: '5px', 
                                        marginBottom: '10px'
                                    }}
                                >
                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={contentAlignment}
                                        exclusive
                                        onChange={handleContentAlignment}
                                        aria-label="text alignment"
                                        style={{width: '100%'}}
                                    >
                                        <ToggleButton value="text_align_left" sx={{width: '33%'}} className='custom-toggle-btn' aria-label="left aligned">
                                            <FormatAlignLeftIcon sx={{width: '0.6em'}} />
                                        </ToggleButton>
                                        <ToggleButton value="text_align_center" sx={{width: '33%'}} className='custom-toggle-btn' aria-label="centered">
                                            <FormatAlignCenterIcon sx={{width: '0.6em'}} />
                                        </ToggleButton>
                                        <ToggleButton value="text_align_right" sx={{width: '33%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <FormatAlignRightIcon sx={{width: '0.6em'}} />
                                        </ToggleButton>
                                    </StyledToggleButtonGroup>
                                </Paper>
                            </div>

                            <div>
                                <span className='item-text'>Text Container Width</span>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        display: 'flex',
                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                        flexWrap: 'wrap',
                                        marginTop: '5px', 
                                        marginBottom: '10px', 
                                    }}
                                >
                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={width}
                                        exclusive
                                        onChange={handleWidth}
                                        aria-label="content width"
                                        style={{width: '100%'}}
                                    >
                                        <ToggleButton value="w_full" sx={{width: '20%'}} className='custom-toggle-btn' aria-label="left aligned">
                                            <span className='icon-text'>Full</span>
                                        </ToggleButton>
                                        <ToggleButton value="w2_3" sx={{width: '20%'}} className='custom-toggle-btn' aria-label="centered">
                                            <span className='icon-text'>2/3</span>
                                        </ToggleButton>
                                        <ToggleButton value="w1_2" sx={{width: '20%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <span className='icon-text'>1/2</span>
                                        </ToggleButton>
                                        <ToggleButton value="w1_3" sx={{width: '20%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <span className='icon-text'>1/3</span>
                                        </ToggleButton>
                                        <ToggleButton value="w1_4" sx={{width: '20%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <span className='icon-text'>1/4</span>
                                        </ToggleButton>
                                    </StyledToggleButtonGroup>
                                </Paper>
                            </div>

                            <div>
                                <span className='item-text'>Align</span>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                        flexWrap: 'wrap',
                                        marginTop: '5px', 
                                        marginBottom: '10px'
                                    }}
                                >
                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={alignment}
                                        exclusive
                                        onChange={handleAlignment}
                                        aria-label="text alignment"
                                        style={{width: '100%'}}
                                    >
                                        <ToggleButton value="left" style={{width: '33%'}} className='custom-toggle-btn' aria-label="left aligned">
                                            <KeyboardTabIcon style={{width: '0.6em', rotate: '180deg'}} />
                                        </ToggleButton>
                                        <ToggleButton value="center" style={{width: '33%'}} className='custom-toggle-btn' aria-label="centered">
                                            <VerticalAlignCenterIcon style={{width: '0.6em', rotate: '90deg'}} />
                                        </ToggleButton>
                                        <ToggleButton value="right" style={{width: '33%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <KeyboardTabIcon style={{width: '0.6em'}} />
                                        </ToggleButton>
                                    </StyledToggleButtonGroup>
                                </Paper>
                            </div>

                            <div>
                                <span className='item-text item-text-inline'>Text Background Color</span>
                                <Button className='item-icon-button'><CloseIcon style={{width: '16px'}} /></Button>
                                <MuiColorInput value={backgroundColor} onChange={handleBackgroundColor} />
                            </div>

                            <div>
                                <span className='item-text'>Inner Padding</span>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        display: 'flex',
                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                        flexWrap: 'wrap',
                                        marginTop: '5px', 
                                        marginBottom: '10px', 
                                    }}
                                >
                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={innerPadding}
                                        exclusive
                                        onChange={handleInnerPadding}
                                        aria-label="content width"
                                        sx={{width: '100%'}}
                                    >
                                        <ToggleButton value="p_s" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="left aligned">
                                            <span className='icon-text'>S</span>
                                        </ToggleButton>
                                        <ToggleButton value="p_m" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="centered">
                                            <span className='icon-text'>M</span>
                                        </ToggleButton>
                                        <ToggleButton value="p_l" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <span className='icon-text'>L</span>
                                        </ToggleButton>
                                        <ToggleButton value="p_xl" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <span className='icon-text'>XL</span>
                                        </ToggleButton>
                                    </StyledToggleButtonGroup>
                                </Paper>
                            </div>

                        </AccordionDetails>

                    </Accordion>
                    <Accordion defaultExpanded style={{margin: '0px'}}>

                        <AccordionDetails>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AntSwitch checked={sectionHeader} inputProps={{ 'aria-label': 'ant design' }} onChange={handleOnChangeSectionHeader} />
                                <span className='item-text'>Section Header</span>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div>
                    <Accordion defaultExpanded style={{margin: '0px'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel2a-header"
                        >
                        <Typography style={{fontWeight: '700', fontSize: '13px'}}>Selection Color</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <CircleColorPicker color={headingColor} background={headingColor} handleChange={handleHeadingColorChange} text="Heading Color" />
                            <CircleColorPicker color={paragraphColor} background={paragraphColor} handleChange={handleParagraphColorChange} text="Paragraph Color" />
                            <CircleColorPicker color={accentColor} background={accentColor} handleChange={handleAccentColorChange} text="Accent Color" />
                            <CircleColorPicker color={primaryButtonColor} background={primaryButtonColor} handleChange={handlePrimaryButtonColorChange} text="Primary Button Color" />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded style={{margin: '0px'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel2a-header"
                        >
                        <Typography style={{fontWeight: '700', fontSize: '13px'}}>Backgrounds</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <span className='item-text'>Base Color</span>
                            <Box className="panel-color color-panel-box">
                                <div style={{display: 'flex'}}>
                                    <CircleColorPicker 
                                        color={baseColor} 
                                        background={baseColor} 
                                        handleChange={handleBaseColorChange} 
                                        className='color-panel-color-picker'
                                     />
                                    <span className='color-panel-text' >
                                        <ThreeCircle />
                                        100%
                                    </span>
                                </div>

                                <div style={{display: 'flex', padding: '5px'}}>
                                    <Button className='btn-icon-button'><EyeIcon /></Button>
                                    <Button className='btn-icon-button'><KeyIcon /></Button>
                                </div>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div>
                    <Accordion defaultExpanded style={{margin: '0px'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel3a-header"
                            sx={{borderBottom: '1px solid #dcdcdc'}}
                        >
                        <Typography sx={{fontWeight: '700', fontSize: '13px'}}>Section size and paddings</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box className='panel-color size-panel-box'>
                                <span className='size-panel-select' >
                                    <select className='custom-select' value={sectionMarginTop} onChange={handleSectionMarginTopChange}>
                                        <option value='mt_s'>S</option>
                                        <option value='mt_m'>M</option>
                                        <option value='mt_l'>L</option>
                                        <option value='mt_xl'>XL</option>
                                    </select>
                                </span>
                                <Box className='panel-color size-panel-center-box'>
                                    <AlignArrowLeft style={{marginTop: '4px', marginRight: '5px', marginLeft: 'auto'}} />
                                    <span className='size-panel-center-span' >
                                        <select className='custom-select'>
                                            <option>Insert</option>
                                        </select>
                                    </span>
                                    <AlignArrowRight style={{marginTop: '4px', marginLeft: '5px', marginRight: 'auto'}} />
                                </Box>

                                <span className='size-panel-select size-panel-bottom-select' >
                                    <select className='custom-select' value={sectionMarginBottom} onChange={handleSectionMarginBottomChange}>
                                        <option value='mb_s'>S</option>
                                        <option value='mb_m'>M</option>
                                        <option value='mb_l'>L</option>
                                        <option value='mb_xl'>XL</option>
                                    </select>
                                </span>
                                
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded style={{margin: '0px'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel3a-header"
                            sx={{borderBottom: '1px solid #dcdcdc'}}
                        >
                        <Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                <span className='item-text'>Minimum Height</span>
                            </Stack>
                        </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <div>
                                <span className='item-text'>Height</span>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        display: 'flex',
                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                        flexWrap: 'wrap',
                                        marginTop: '5px', 
                                        marginBottom: '10px', 
                                    }}
                                >
                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={height}
                                        exclusive
                                        onChange={handleHeightChange}
                                        aria-label="content width"
                                        style={{width: '100%'}}
                                    >
                                        <ToggleButton value="vh_s" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="left aligned">
                                            <span className='icon-text'>S</span>
                                        </ToggleButton>
                                        <ToggleButton value="vh_m" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="centered">
                                            <span className='icon-text'>M</span>
                                        </ToggleButton>
                                        <ToggleButton value="vh_l" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <span className='icon-text'>L</span>
                                        </ToggleButton>
                                        <ToggleButton value="vh_xl" sx={{width: '25%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <span className='icon-text'>XL</span>
                                        </ToggleButton>
                                    </StyledToggleButtonGroup>
                                </Paper>
                            </div>

                            <div>
                                <span className='item-text'>Vertical Align</span>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                        flexWrap: 'wrap',
                                        marginTop: '5px', 
                                        marginBottom: '10px'
                                    }}
                                >
                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={verticalAlign}
                                        exclusive
                                        onChange={handleVerticalAlignChange}
                                        aria-label="text alignment"
                                        sx={{width: '100%'}}
                                    >
                                        <ToggleButton value="top" sx={{width: '33%'}} className='custom-toggle-btn' aria-label="left aligned">
                                            <KeyboardTabIcon sx={{width: '0.6em', rotate: '270deg'}} />
                                        </ToggleButton>
                                        <ToggleButton value="middle" sx={{width: '33%'}} className='custom-toggle-btn' aria-label="centered">
                                            <VerticalAlignCenterIcon sx={{width: '0.6em'}} />
                                        </ToggleButton>
                                        <ToggleButton value="bottom" sx={{width: '33%'}} className='custom-toggle-btn' aria-label="right aligned">
                                            <KeyboardTabIcon sx={{width: '0.6em', rotate: '90deg'}} />
                                        </ToggleButton>
                                    </StyledToggleButtonGroup>
                                </Paper>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </CustomTabPanel>
        </Box>
    );
}

export default RightBar