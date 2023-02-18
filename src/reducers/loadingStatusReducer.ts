import { Action } from "../utilities/interface";

const loadingStatusReducer = (state = "idle", action: Action) => {
	switch (action.type) {
		case "LOADING":
			return action.payload;
		default:
			return state;
	}
};

export default loadingStatusReducer;
