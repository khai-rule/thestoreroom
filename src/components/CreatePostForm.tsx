import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostFormSchema } from "../utilities/YUPvalidations";
import { CreatorsContext } from "../App";
import { useContext } from "react";
import { IFormInputs } from "../utilities/interface";
import { ImageFilesProps } from "../utilities/interface";
import { createClient } from "contentful-management";
import _ from "lodash";

const CreatePostForm: React.FC<ImageFilesProps> = ({ imageFiles }) => {
	const client = createClient({
		space: "94snklam6irp",
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
	});

	const { loggedInCreator } = useContext(CreatorsContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(createPostFormSchema),
	});

	//! On Submit

	const onSubmit = (data: IFormInputs) => {
		const { title, caption, tags } = data;
		console.log("tags", tags);
		const creatorID = loggedInCreator;
		console.log("creator ID", creatorID);
		console.log("image file", imageFiles);


		client
			.getSpace("94snklam6irp")
			.then((space) => space.getEnvironment("master"))
			.then((environment) =>
				environment.createEntry("posts", {
					fields: {
						title: {
							"en-US": title,
						},
						caption: {
							"en-US": caption,
						},
						images: {
							"en-US": [
								{
									sys: {
										type: "Link",
										linkType: "Asset",
										id: "3Ow6CqCBvm5hhm37iGPP9P",
									},
								},
							],
						},
						tags: {
							"en-US": tags,
						},
						creator: {
							"en-US": {
								sys: {
									type: "Link",
									linkType: "Entry",
									id: "5eJyt09O0Mn1KAdnjLZvIu",
								},
							},
						},
					},
				})
			)
			//! Publish
			.then((entry) => {
				console.log("entry", entry);
				const entryID = entry?.sys.id;
				console.log("entry id", entryID);
				client
					.getSpace("94snklam6irp")
					.then((space) => space.getEnvironment("master"))
					.then((environment) => environment.getEntry(entryID))
					.then((entry) => entry.publish())
					.then((entry) => console.log(`Entry ${entry.sys.id} published.`))
					.catch(console.error);
			})

			.catch(console.error);
	};

	const tags = ["outdoor", "indoor", "still life"];

	const displayTags = () => {
		const getTags = tags.map((tag: string) => {
			return (
				<div className="flex">
					<input value={tag} type="checkbox" {...register("tags")} />
					<p>{_.startCase(_.camelCase(tag))}</p>
				</div>
			);
		});
		return getTags;
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="title">Title</label>
			<input className="text-black" {...register("title")} />
			<p>{errors.title?.message}</p>

			<label htmlFor="caption">Caption</label>
			<input className="text-black" {...register("caption")} />
			<p>{errors.caption?.message}</p>

			<label htmlFor="tags">Tags</label>
			<div className="flex">{displayTags()}</div>
			<p>{errors.tags?.message}</p>

			<input className="cursor-pointer" type="submit" value="Upload" />
		</form>
	);
};

export default CreatePostForm;
