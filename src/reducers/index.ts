import loadingStatusReducer from "./loadingStatusReducer";
import { combineReducers } from "redux";
import modalReducer from "./modalReducer";

const allReducers = combineReducers({
	loadingStatus: loadingStatusReducer,
	modal: modalReducer
});

export default allReducers;
