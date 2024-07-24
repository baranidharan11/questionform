import { combineReducers } from "redux";
import formReducer from "./Forms/reducer";

const rootReducer = combineReducers({
  forms: formReducer,
});

export default rootReducer;
