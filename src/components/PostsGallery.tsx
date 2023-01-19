import { PostsGalleryProps } from "../interface";
import { ImageFields } from "../interface";

const PostsGallery: React.FC<PostsGalleryProps> = ({ matchingPost, code }) => {
	const displayImages = matchingPost?.post?.images.map(
		(image: ImageFields, index: number) => {
			const title = image?.fields.title;
			const url = image?.fields?.file.url;
			return <img className={`${index % 2 === 0 ? "w-4/6 " : "w-2/6 mx-8"}`} src={url} alt={title} key={title} />;
		}
	);

	return (
		<>
			<div>PostsGallery</div>
			<div className=" ml-80 flex overflow-auto ">{displayImages}</div>
		</>
	);
};

export default PostsGallery;
