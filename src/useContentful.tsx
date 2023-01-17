import { createClient } from "contentful";

const useContentful = () => {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID as string,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
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
