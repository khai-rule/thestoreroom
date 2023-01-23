import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostFormSchema } from "../utilities/YUPvalidations";
import { useContext } from "react";
import { IFormInputs } from "../utilities/interface";
import { ImageFilesProps } from "../utilities/interface";
import { createClient } from "contentful-management";
import _ from "lodash";
import { CreatorsContext } from "../utilities/context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CreatePostForm: React.FC<ImageFilesProps> = ({
	imageFiles,
	formRef,
	setStatus,
	setCreate
}) => {
	const navigate = useNavigate();

	const client = createClient({
		space: "94snklam6irp",
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
	});

	const { loggedInCreatorContentful } = useContext(CreatorsContext);

	const name = `${loggedInCreatorContentful?.creator.firstName} "${loggedInCreatorContentful?.creator.artistName}" ${loggedInCreatorContentful?.creator.lastName}`;
	console.log(name);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(createPostFormSchema),
	});

	useEffect(() => {
		formRef.current = handleSubmit(onSubmit);
	}, []);

	const onSubmit = (data: IFormInputs, sanitisedSys: any) => {
		const { title, caption, tags } = data;
		if (!title || !tags) {
			console.log("hi");
			setStatus("idle");
			return;
		}
		console.log("tags", tags);
		const creatorID = loggedInCreatorContentful?.sys.id;
		console.log("creator ID", creatorID);
		console.log("image file", imageFiles);

		//!Create new post
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
							"en-US": sanitisedSys,
						},
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
			//! Publish the new post
			.then((entry) => {
				console.log("entry", entry);
				const entryID = entry?.sys.id;
				console.log("entry id", entryID);
				client
					.getSpace("94snklam6irp")
					.then((space) => space.getEnvironment("master"))
					.then((environment) => environment.getEntry(entryID))
					.then((entry) => entry.publish())
					.then((entry) => {
						//! Update creator to add the new post in
						console.log(`Entry ${entry.sys.id} published.`);
						const newPostID = entry.sys.id;
						client
							.getSpace("94snklam6irp")
							.then((space) => space.getEnvironment("master"))
							.then((environment) => environment.getEntry(creatorID))
							.then((entry) => {
								entry.fields.posts["en-US"].push({
									sys: {
										type: "Link",
										linkType: "Entry",
										id: newPostID,
									},
								});
								return entry.update();
							})
							.then((entry) => {
								console.log(`Entry ${entry.sys.id} updated.`);
								entry.publish();
								navigate(`/profile/${creatorID}`);
								toast("Post successfully created.")
								setCreate(false);
							})
							.catch(console.error);
					})
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
		<>
			<div className="relative grid-item bg-primary w-1/4 aspect-square rounded-br-3xl">
				<form className="m-6" onSubmit={handleSubmit(onSubmit)}>
					<h4>{name}</h4>
					<input
						className="my-2 text-white text-xl bg-primary placeholder-white placeholder-opacity-50 focus:placeholder-opacity-100 focus:outline-none"
						{...register("title")}
						placeholder="Title"
					/>
					{errors.title && errors.title?.message ? (
						<>
							<p className="my-2">{errors.title?.message}</p>
							{setStatus("idle")}
						</>
					) : (
						<></>
					)}

					<textarea
						className="my-2 text-white bg-primary placeholder-white placeholder-opacity-50 focus:placeholder-opacity-100 focus:outline-none resize-none w-full h-40"
						{...register("caption")}
						placeholder="Write a caption..."
					/>
					<p>{errors.caption?.message}</p>

					<label className="my-2" htmlFor="tags">
						Add tags?
					</label>
					<div className="flex my-2">{displayTags()}</div>
					{errors.tags && errors.tags?.message ? (
						<>
							<p className="my-2">{errors.tags?.message}</p>
							{setStatus("idle")}
						</>
					) : (
						<></>
					)}
				</form>
			</div>
		</>
	);
};

export default CreatePostForm;
