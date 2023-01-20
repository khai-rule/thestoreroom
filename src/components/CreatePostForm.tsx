import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePostFormSchema } from "./CreatePostFormSchema";
import { CreatorsContext } from "../App";
import { useContext } from "react";
import { IFormInputs } from "../interface";
import { ImageFilesProps } from "../interface";
import { createClient } from "contentful-management";
import _ from "lodash"

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
		resolver: yupResolver(CreatePostFormSchema),
	});

	//! On Submit

	const onSubmit = (data: IFormInputs) => {
		const { title, caption, tags } = data;

		const creatorID = loggedInCreator?.user_id;

		console.log(imageFiles);

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
						// file: {
						// 	"en-US": {
						// 		contentType: "image/png",
						// 		fileName: "cute_cat.png",
						// 		uploadFrom: {
						// 			sys: {
						// 				type: "Link",
						// 				linkType: "Upload",
						// 				id: "<use sys.id of an upload resource response here>",
						// 			},
						// 		},
						// 	},
						// },
						tags: {
							"en-US": tags,
						},
						creator: {
							"en-US": {
								sys: {
									type: "Link",
									linkType: "Entry",
									id: creatorID,
								},
							},
						},
					},
				})
			)
			//! Publish
			.then((entry) => {
				console.log(entry)
				const entryID = entry?.sys.id;
				console.log(entryID);
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
