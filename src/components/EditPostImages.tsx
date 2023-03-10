import { useRef } from "react";
import { useState } from "react";
import EditPostForm from "./EditPostForm";
import Carousel from "./Carousel";
import { useEffect } from "react";
import { EditPostImagesProps } from "../utilities/interface";
import { ImageFields } from "../utilities/interface";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingStatus } from "../actions/setLoadingStatus";
import { UseSelectorState } from "../utilities/interface";

const EditPostImages: React.FC<EditPostImagesProps> = ({
	matchingPost,
	setUpdate,
}) => {
	const dispatch = useDispatch();
	const loadingStatus = useSelector(
		(state: UseSelectorState) => state.loadingStatus
	);

	const formRef: any = useRef(null!);

	const [imagePreview, setImagePreview] = useState<string[]>([]);

	useEffect(() => {
		if (matchingPost !== undefined) {
			const previews = matchingPost?.fields?.images?.map(
				(image: ImageFields) => image.fields.file.url
			);
			if (previews) {
				setImagePreview([...imagePreview, ...previews]);
			}
		}
	}, [matchingPost]);

	const postID = matchingPost?.sys?.id;

	const handleUpdate = async () => {
		dispatch(setLoadingStatus("loading"));
		formRef.current(postID);
	};

	return (
		<div className="fixed h-screen w-screen inset-0 z-50 bg-black bg-opacity-50 md:overflow-auto text-white">
			<div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
				<div className="relative grid-item bg-white w-8/12 left-1/2 -translate-x-1/2 rounded-t-3xl">
					<div className="flex justify-between">
						<h4
							className="py-2 mx-5 text-black cursor-pointer hover:underline"
							onClick={() => dispatch({ type: "HIDE_MODAL" })}
						>
							Cancel
						</h4>
						<h4 className="text-black py-2 mx-5 font-semibold">Edit Post</h4>
						{loadingStatus === "loading" ? (
							<div
								className="spinner-border animate-spin inline-block w-6 h-6 border-3 rounded-full text-black mx-8 mt-2"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</div>
						) : (
							<h4
								onClick={handleUpdate}
								className="py-2 mx-5 text-secondary font-semibold cursor-pointer hover:underline"
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
						setUpdate={setUpdate}
						matchingPost={matchingPost}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditPostImages;
