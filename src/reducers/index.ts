import loadingStatusReducer from "./loadingStatusReducer";
import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import contentfulReducer from "./contentfulReducer";

const allReducers = combineReducers({
	loadingStatus: loadingStatusReducer,
	modal: modalReducer,
	contentfulData: contentfulReducer

});

export default allReducers;
