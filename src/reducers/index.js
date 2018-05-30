import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
    customerReducer,
    searchReducer
});

export default rootReducer;