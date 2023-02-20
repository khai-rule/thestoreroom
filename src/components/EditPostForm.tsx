import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { toast } from "react-toastify";
import { createClient } from "contentful-management";
import { useEffect } from "react";
import { EditPostProps } from "../utilities/interface";
import { createPostFormSchema } from "../utilities/YUPvalidations";
import { CreatePostForms } from "../utilities/interface";
import { useDispatch } from "react-redux";
import { setLoadingStatus } from "../actions/setLoadingStatus";

const EditPost: React.FC<EditPostProps> = ({
	formRef,
	setUpdate,
	matchingPost,
}) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreatePostForms>({
		resolver: yupResolver(createPostFormSchema),
	});

	const { title, caption, tags } = matchingPost.fields;
	const { firstName, artistName, lastName } = matchingPost.fields.creator.fields;

	const client = createClient({
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
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

	const onSubmit = (data: any, postID: any) => {
		const { title, caption, tags } = data;
		client
			.getSpace("94snklam6irp")
			.then((space) => space.getEnvironment("master"))
			.then((environment) => environment.getEntry(postID))
			.then((entry) => {
				{
					title === "" ? "" : (entry.fields.title["en-US"] = title);
				}
				{
					caption === "" ? "" : (entry.fields.caption["en-US"] = caption);
				}
				{
					if (Array.isArray(tags) && tags.length > 0) {
						entry.fields.tags["en-US"] = tags;
					}
				}

				return entry.update();
			})
			.then((entry) => {
				entry.publish();
				console.log(`Entry ${entry.sys.id} updated and published.`);
				toast("Post details successfully updated");
				dispatch(setLoadingStatus("idle"));
				dispatch({ type: "HIDE_MODAL" });
				setUpdate(_.random(0, 500));
			})
			.catch(console.error);
	};

	const allTags = ["outdoor", "indoor", "still life"];

	const displayTags = () => {
		const getTags = allTags.map((tag: string) => {
			return (
				<div className="flex mr-4 items-center">
					<input
						className="form-checkbox h-4 w-4 mr-2"
						value={tag}
						type="checkbox"
						checked={tags.includes(tag)}
						//TODO change tags
						{...register("tags")}
					/>
					<p>{_.startCase(_.camelCase(tag))}</p>
				</div>
			);
		});
		return getTags;
	};
	return (
		<div className="relative grid-item bg-primary w-1/4 aspect-square rounded-br-3xl">
			<form className="m-6" onSubmit={handleSubmit(onSubmit)}>
				<h4>{`${firstName !== undefined ? firstName : ""} "${artistName}" ${
					lastName !== undefined ? lastName : ""
				}`}</h4>
				<input
					className="my-2 p-0 text-white text-xl bg-primary placeholder-white placeholder-opacity-50 focus:placeholder-opacity-100 focus:outline-none"
					{...register("title")}
					placeholder="Title"
					defaultValue={title}
				/>
				<>
					{errors.title && errors.title?.message ? (
						<>
							<p  className="my-2 text-red">{errors.title?.message}</p>
						</>
					) : (
						<></>
					)}
				</>

				<textarea
					className="my-2 text-white bg-primary placeholder-white placeholder-opacity-50 focus:placeholder-opacity-100 focus:outline-none resize-none w-full h-40"
					{...register("caption")}
					placeholder="Write a caption..."
					defaultValue={caption}
				/>
				{errors.caption && errors.caption?.message ? (
					<p className="text-red">{errors.caption?.message}</p>
				) : (
					<></>
				)}

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
	);
};

export default EditPost;
