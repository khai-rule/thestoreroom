

export const setLoadingStatus = (status: string) => {
	return {
		type: "LOADING",
        payload: status
	};
};

