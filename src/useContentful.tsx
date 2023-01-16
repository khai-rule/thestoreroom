import { createClient } from "contentful";

const useContentful = () => {
	//TODO store token in env
	const client = createClient({
		space: "94snklam6irp",
		accessToken: "dTG2qI-VcavHdE0tOqs6MsVvQR1EV_-WR5huPpawUKA",
		host: "preview.contentful.com",
	});

	const getCreators = async () => {
		try {
			const entries = await client.getEntries({
				content_type: "creator",
				select: "fields",
			});

			const sanitisedEntries = entries.items.map((item) => {
				const creator = item.fields

				return { creator };
			});

			return sanitisedEntries;
		} catch (error) {
			console.log("Error catching creators: " + error);
		}
	};

	return { getCreators };
};

export default useContentful;
