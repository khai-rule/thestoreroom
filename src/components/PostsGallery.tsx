import { PostsGalleryProps } from "../utilities/interface";
import { ImageFields } from "../utilities/interface";

const PostsGallery: React.FC<PostsGalleryProps> = ({ matchingPost, code }) => {
	const displayImages = matchingPost?.post?.images.map(
		(image: ImageFields, index: number) => {
			const title = image?.fields.title;
			const url = image?.fields?.file.url;
			return (
				<img
					className={`${
						index % 2 === 0
							? "w-9/12 mr-8 self-center"
							: "w-6/12 mr-8 self-center"
					}`}
					src={url}
					alt={title}
					key={title}
				/>
			);
		}
	);

	return (
		<>
			<div className=" flex overflow-auto">{displayImages}</div>
		</>
	);
};

export default PostsGallery;
