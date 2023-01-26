import { useRef } from "react";
import { useState } from "react";
import EditPostForm from "./EditPostForm";
import Carousel from "./Carousel";
import { useEffect } from "react";


const EditPostImages = ({ closeModal, setEdit, matchingPost, setUpdate }) => {
	
	const formRef: any = useRef(null!);
	

	const [status, setStatus] = useState<string>("idle");

	const [imagePreview, setImagePreview] = useState<string[]>([]);

	useEffect(() => {
		if (matchingPost !== undefined) {
			const previews = matchingPost?.post?.images?.map(
				(image) => image.fields.file.url
			);
			if (previews) {
				const finalPreview = previews.reduce((acc, cur) => acc.concat(cur), []);
				setImagePreview([...imagePreview, ...previews]);
			}
		}
	}, [matchingPost]);

	const postID = matchingPost?.sys?.id;
	console.log(postID);

	const handleUpdate = async () => {
		setStatus("loading");
		formRef.current(postID);
	};

	return (
		<div className="fixed h-screen w-screen inset-0 z-50 bg-black bg-opacity-50 md:overflow-auto text-white">
			<button
				className="absolute right-6 top-6 hover:underline"
				onClick={closeModal}
			>
				Close
			</button>

			<div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
				<div className="relative grid-item bg-white w-8/12 left-1/2 -translate-x-1/2 rounded-t-3xl">
					<div className="flex justify-between">
						<h4 className="text-black py-2 mx-5 font-semibold">Edit Post</h4>
						{status === "loading" ? (
							<div
								className="spinner-border animate-spin inline-block w-6 h-6 border-3 rounded-full text-black mx-8 mt-2"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</div>
						) : (
							<h4
								onClick={handleUpdate}
								className="py-2 mx-5 text-primary font-semibold cursor-pointer"
							>
								Update
							</h4>
						)}
					</div>
				</div>
				<div className="flex align-middle justify-center">
					<div className="relative grid-item bg-white w-5/12 aspect-square rounded-bl-3xl object-contain">
						<Carousel imagePreviews={imagePreview} />
					</div>

					<EditPostForm
						formRef={formRef}
						setStatus={setStatus}
						setEdit={setEdit}
						setUpdate={setUpdate}
						matchingPost={matchingPost}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditPostImages;
