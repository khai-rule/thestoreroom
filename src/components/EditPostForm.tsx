import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { toast } from "react-toastify";
import { createClient } from "contentful-management";
import { useEffect } from "react";

const EditPost = ({ formRef, setStatus, setEdit, setUpdate, matchingPost }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// resolver: yupResolver(createPostFormSchema),
	});

	const { title, caption, tags } = matchingPost.post;
	const {firstName, artistName, lastName } = matchingPost.post.creator.fields


	const client = createClient({
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
	});

	useEffect(() => {
		formRef.current = handleSubmit(onSubmit);
	}, []);

	const onSubmit = (data: any, postID: number) => {
		const { title, caption, tags } = data;
		console.log(postID);
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
				setStatus("idle");

				setUpdate(_.random(0, 500));
			})
			.catch(console.error);
	};

	const allTags = ["outdoor", "indoor", "still life"];

	const displayTags = () => {
		const getTags = allTags.map((tag: string) => {
			return (
				<div className="flex">
					<input
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
				<h4>{`${firstName} "${artistName}" ${lastName}`}</h4>
				<input
					className="my-2 text-white text-xl bg-primary placeholder-white placeholder-opacity-50 focus:placeholder-opacity-100 focus:outline-none"
					{...register("title")}
					placeholder="Title"
					defaultValue={title}
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
					defaultValue={caption}
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
	);
};

export default EditPost;
