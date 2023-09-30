import {
    CREATE_EDITOR, 
    UPDATE_EDITOR_UNDO, 
    UPDATE_EDITOR_REDO
} from './actions'

const INITIAL_STATE = {
    editor: null, 
    undo: 0, 
    redo: 0
}

function textBuilderReducer(state = INITIAL_STATE, action) {
    
    switch(action.type) {
        case CREATE_EDITOR: 
            return {
                ...state, 
                editor: action.payload, 
                undo: 0, 
                redo: 0, 
            }
        case UPDATE_EDITOR_UNDO: 
            return {
                ...state, 
                undo: action.undo,
                redo: 0 
            }
        case UPDATE_EDITOR_REDO: 
            return {
                ...state, 
                redo: action.redo, 
                undo: action.undo
            }
        default: 
            return { ...state };
    }
}

export default textBuilderReducer;