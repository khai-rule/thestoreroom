import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostFormSchema } from "../utilities/YUPvalidations";
import { useContext } from "react";
import { CreatePostForms } from "../utilities/interface";
import { ImageFilesProps } from "../utilities/interface";
import { createClient } from "contentful-management";
import _ from "lodash";
import { CreatorsContext } from "../utilities/context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingStatus } from "../actions/setLoadingStatus";


const CreatePostForm: React.FC<ImageFilesProps> = ({ imageFiles, formRef }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();



	const client = createClient({
		space: "94snklam6irp",
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
	});

	const { loggedInCreatorContentful } = useContext(CreatorsContext);

	const firstName =
		loggedInCreatorContentful?.creator?.firstName !== undefined
			? loggedInCreatorContentful?.creator?.firstName
			: "";
	const artistName =
		loggedInCreatorContentful?.creator?.artistName !== undefined
			? loggedInCreatorContentful?.creator?.artistName
			: "";
	const lastName = loggedInCreatorContentful?.creator?.lastName;

	const name = `${firstName} "${artistName}" ${lastName}`;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreatePostForms>({
		resolver: yupResolver(createPostFormSchema),
	});

	useEffect(() => {
		if (
			(errors && errors.tags && errors.tags.message) ||
			(errors && errors.title && errors.title.message)
		) {
			dispatch(setLoadingStatus("idle"));
		}
	}, [errors]);

	useEffect(() => {
		formRef.current = handleSubmit(onSubmit);
	}, []);

	const onSubmit = (data: CreatePostForms, sanitisedSys: any) => {
		const { title, caption, tags } = data;
		if (!title || !tags) {
			dispatch(setLoadingStatus("idle"));
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
						console.log(`Entry ${entry.sys.id} published.`);
						const newPostID = entry.sys.id;
						//! Update creator to add the new post in
						client
							.getSpace("94snklam6irp")
							.then((space) => space.getEnvironment("master"))
							.then((environment) => environment.getEntry(creatorID))
							.then((entry) => {
								if (!entry.fields.posts || !entry.fields.posts["en-US"]) {
									entry.fields.posts = { "en-US": [] };
								}
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
								navigate(`/profile/${artistName}`);
								toast("Post successfully created.");
								dispatch({ type: "HIDE_MODAL" });
								dispatch(setLoadingStatus("done"));
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
				<div className="flex mr-4 items-center">
					<input
						className="form-checkbox h-4 w-4 mr-2"
						value={tag}
						type="checkbox"
						{...register("tags")}
					/>
					<label className="">{_.startCase(_.camelCase(tag))}</label>
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
						className="my-2 text-white text-xl bg-primary placeholder-white placeholder-opacity-50 focus:placeholder-opacity-100 focus:outline-none p-0"
						{...register("title")}
						placeholder="Title"
					/>
					{errors.title && errors.title?.message ? (
						<>
							<p className="my-2 text-red">{errors.title?.message}</p>
						</>
					) : (
						<></>
					)}

					<textarea
						className="my-2 text-white bg-primary placeholder-white placeholder-opacity-50 focus:placeholder-opacity-100 focus:outline-none resize-none w-full h-40"
						{...register("caption")}
						placeholder="Write a caption..."
					/>
					<p className="text-red">{errors.caption?.message}</p>

					<label className="my-2" htmlFor="tags">
						Add tags?
					</label>
					<div className="flex my-2">{displayTags()}</div>
					{errors.tags && errors.tags?.message ? (
						<>
							<p className="my-2 text-red">{errors.tags?.message}</p>
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
