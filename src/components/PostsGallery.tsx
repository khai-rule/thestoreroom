import { PostsGalleryProps } from "../utilities/interface";
import { ImageFields } from "../utilities/interface";
import FullScreenDisplay from "./FullScreenDisplay";
import { useState } from "react";
import Carousel from "./Carousel";
import { useEffect } from "react";

const PostsGallery: React.FC<PostsGalleryProps> = ({ matchingPost }) => {
	const [openDisplay, setOpenDisplay] = useState<boolean>(false);
	const [display, setDisplay] = useState<string>("none");
	const [imagePreview, setImagePreview] = useState<string[]>([]);

	useEffect(() => {
		if (matchingPost !== undefined) {
			const previews = matchingPost?.post?.images?.map(
				(image: ImageFields) => image.fields.file.url
			);

			setImagePreview([...previews]);
		}
	}, [matchingPost]);

	const fullScreenDisplay = (url: string) => {
		setOpenDisplay(true);
		setDisplay(url)
	};

	const displayImages = matchingPost?.post?.images.map(
		(image: ImageFields, index: number) => {
			const title = image?.fields.title;
			const url = image?.fields?.file.url;

			return (
				<img
					className={`${
						index % 2 === 0
							? "w-9/12 mr-8 self-center max-h-[48rem] cursor-pointer"
							: "w-6/12 mr-8 self-center object-cover cursor-pointer"
					}`}
					src={url}
					alt={title}
					key={title}
					onClick={() => fullScreenDisplay(url)}
				/>
			);
		}
	);

	return (
		<>
			<FullScreenDisplay
				openDisplay={openDisplay}
				setOpenDisplay={setOpenDisplay}
				imagePreviews={imagePreview}
				display={display}
			/>

			<div className="flex overflow-auto">{displayImages}</div>
		</>
	);
};

export default PostsGallery;
