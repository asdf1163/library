import { combineReducers } from "redux";
import { searchReducer } from "./search/searchReducer";

const rootReducer = combineReducers({
  searchList: searchReducer,
});

export default rootReducer;