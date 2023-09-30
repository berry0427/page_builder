import { combineReducers } from "redux";

import textBuilderReducer from "./textBuilderReducer";

const rootReducer = combineReducers({
    textBuilder: textBuilderReducer
})

export default rootReducer;