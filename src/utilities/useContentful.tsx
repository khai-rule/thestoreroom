import { createClient } from "contentful";

const useContentful = () => {
	const client = createClient({
		space: /* process.env.CONTENTFUL_SPACE_ID as string */ "94snklam6irp",
		accessToken: /* process.env.CONTENTFUL_ACCESS_TOKEN as string */ "dTG2qI-VcavHdE0tOqs6MsVvQR1EV_-WR5huPpawUKA",
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
				const sys = item.sys

				return { creator, sys };
			});

			return sanitisedEntries;
		} catch (error) {
			console.log("Error catching creators: " + error);
		}
	};

	const getPosts = async () => {
		try {
			const entries = await client.getEntries({
				content_type: "posts",
				select: "fields",
			});

			const sanitisedEntries = entries.items.map((item) => {
				const post = item.fields
				const sys = item.sys

				return { post, sys };
			});

			return sanitisedEntries;
		} catch (error) {
			console.log("Error catching creators: " + error);
		}
	};

	return { getCreators, getPosts };
};

export default useContentful;

