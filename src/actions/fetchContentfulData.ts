import { createClient } from "contentful";
import { Action } from "../utilities/interface";

const client = createClient({
	space: "94snklam6irp",
	accessToken: "dTG2qI-VcavHdE0tOqs6MsVvQR1EV_-WR5huPpawUKA",
	host: "preview.contentful.com",
});

export const fetchContentfulData = (api: string) => {
	return async (dispatch: React.Dispatch<Action | any>) => {
		dispatch(setContentfulDataLoading());
		try {
			const data = await client.getEntries({
				content_type: api,
				select: "fields",
			});

			dispatch({
				type: "FETCH_CONTENTFUL_DATA",
				payload: { api, data },
			});
		} catch (error: any) {
			console.error(error);
			dispatch(setContentfulDataError(error.message));
		}
	};
};

export const setContentfulDataLoading = () => ({
	type: "SET_CONTENTFUL_DATA_LOADING",
});

export const setContentfulDataError = (error: string) => ({
	type: "SET_CONTENTFUL_DATA_ERROR",
	payload: error,
});
