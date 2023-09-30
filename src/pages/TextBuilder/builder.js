import React, { useEffect, useState } from 'react';

// import redux and relation
import { useSelector, useDispatch } from 'react-redux';
import {
    CREATE_EDITOR
} from '../../reducers/actions'

// import grapesjs
import grapesjs from 'grapesjs';
import 'grapesjs-blocks-basic'

// import components
import { Box, Card, CardActions, CardContent } from '@mui/material';

// import icons
import TranslateIcon from '@mui/icons-material/Translate';
import {ReactComponent as CheckIcon } from '../../assets/images/svg/check.svg'
import {ReactComponent as TextLineIcon } from '../../assets/images/svg/text-line.svg'

// import css
import 'grapesjs/dist/css/grapes.min.css'; // Import GrapeJS CSS

import { 
    CustomDefaultButton, 
    CustomOrangeButton 
} from '../../utils/TextBuilder';




function Builder() {

    //Get Editor from todoReducer
    const {editor} = useSelector(state => state.textBuilder)
    //Use for all the dispatch actions
    const dispatch = useDispatch();

    const [initial, setInitial] = useState(false)

    var isInitial = false;
    useEffect(() => {
        if(isInitial) return;

        isInitial = true;
        setInitial(true)

        const newEditor  = grapesjs.init({
            container  : '#gjs2',
            height: '100%',
            fromElement: true,
            storageManager: { type: 0 },
            plugins: ['gjs-blocks-basic'],
      
            blockManager: {
              appendTo: '#blocks'
            },
            panels: {
              defaults: []
            }, 
          });

          dispatch({ type: CREATE_EDITOR, payload: newEditor })

    }, [])

    const handleDone = (event) => {

        
    }


    return (
        <Box className='panel-left panel-color' style={{ padding: '16px' }}>
            <Card style={{padding: '10px', minHeight: '400px'}}>
                <CardActions className='modal-header-button-pos'>

                    <Box >
                        <CustomDefaultButton icon={<TextLineIcon />} text="Text"  />
                        <CustomDefaultButton icon={<TranslateIcon  style={{fontSize: '18px'}} />} text="Localization"  />

                    </Box>

                    <CustomOrangeButton icon={<CheckIcon />} text="Done" onClickListener={handleDone} />

                </CardActions>
                <CardContent>

                <div className="row" style={{minHeight: '400px'}}>

                    <div className="column editor-clm">
                        <div id="gjs2" style={{overflow: 'hidden'}}>
                            <div style={{display: 'block'}}>
                                <h1 style={{width: '75%', display: 'block'}}>We will make you win across a couple of major digital design fields. </h1>
                                <div style={{padding: '25px 50px', margin: '0', width: '50%', display: 'inline-block'}} data-gjs2-name="Text1">
                                    Werk is a strategic design and engineering agency with an uncompromised commitment to quality and the generation of true value. For the last 10 years, we have partnered with some of the world’s leading organizations to help them strategize, design, develop, launch and grow their
                                </div>
                                <div style={{padding: '25px 50px', margin: '0', width: '50%', display: 'inline-block'}} data-gjs2-name="Text2">
                                    digitally-enabled brands and products. And even though we have offices in Madrid and Barcelona, our distributed team works from various different locations, gaining you access to the best possible talent, wherever you are.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                </CardContent>

            </Card>
        </Box>
    )
}

export default Builder;