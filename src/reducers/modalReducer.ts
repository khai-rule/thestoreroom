export const initialState = {
	showModal: false,
	modalType: null,
};

const modalReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case "SHOW_MODAL":
			return {
				showModal: true,
				modalType: action.payload,
			};
		case "HIDE_MODAL":
			return {
				showModal: false,
				modalType: null,
			};
		default:
			return state;
	}
};

export default modalReducer;
