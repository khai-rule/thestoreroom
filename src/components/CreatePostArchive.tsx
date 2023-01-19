import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePostFormSchema } from "./CreatePostFormSchema";
import { CreatorsContext } from "../App";
import { useContext } from "react";
import { IFormInputs } from "../interface";
import { ImageFilesProps } from "../interface";
import { createClient } from "contentful-management";

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

	//! Request Resource

	const requestResource = () => {
		client
			.getSpace("94snklam6irp")
			.then((space) => space.getEnvironment("master"))
			.then((environment) =>
				environment.createAssetFromFiles({
					fields: {
						title: {
							"en-US": imageFiles[0].name,
						},
						description: {
							"en-US": imageFiles[0].name,
						},
						file: {
							"en-US": {
								contentType: imageFiles[0].type,
								fileName: imageFiles[0].name,
								file: imageFiles[0].name,
							},
						},
					},
				})
			)
			.then((asset) => asset.processForAllLocales())
			.then((asset) => {
				asset.publish();
				return asset.sys.id;
			})
			.catch(console.error);
	};

	//! Upload

	//! On Submit

	const onSubmit = (data: IFormInputs) => {
		const { title, caption, tags } = data;

		const creatorID = loggedInCreator?.user_id;

		console.log(imageFiles);

		requestResource();
		console.log("hi", requestResource());

		const uploadToContentful = () => {
			client
				.getSpace("94snklam6irp")
				.then((space) => space.getEnvironment("master"))
				.then((environment) =>
					environment.createEntryWithId("posts", "5KsDBWseXY6QegucYAoacS", {
						fields: {
							title: {
								"en-US": title,
							},
							caption: {
								"en-US": caption,
							},
							file: {
								"en-US": {
									contentType: imageFiles[0].type,
									fileName: imageFiles[0].name,
									uploadFrom: {
										sys: {
											type: "Link",
											linkType: "Upload",
											id: "sysID",
										},
									},
								},
							},
						},
					})
				)
				.then((entry) => console.log(entry))
				.catch(console.error);

		};
		uploadToContentful();
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
			<div>
				<input value="outdoor" type="checkbox" {...register("tags")} />
				Outdoor
				<input value="indoor" type="checkbox" {...register("tags")} />
				Indoor
				<input value="still life" type="checkbox" {...register("tags")} />
				Still Life
			</div>
			<p>{errors.tags?.message}</p>

			<input type="submit" />
		</form>
	);
};

export default CreatePostForm;
