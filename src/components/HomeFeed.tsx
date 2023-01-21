import { HomeFeedProps } from "../utilities/interface";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Image } from "../utilities/interface";
import { allImage } from "../utilities/interface";

const HomeFeed: React.FC<HomeFeedProps> = ({ posts, display, setDisplay }) => {
	const navigate = useNavigate();

	const allImages = posts
		.flatMap((post: any) => post.post.images)
		.sort(() => Math.random() - 0.5);

	const viewPost = (id: string) => {
		const matchingPost = posts.find((post) =>
			post.post.images?.find((image: any) => image.sys.id === id)
		);
		const title = matchingPost?.post.title;
		navigate(`/post/${id}`);
	};

	const viewProfile = (id: string) => {
		const matchingPost = posts.find((post) =>
			post.post.images?.find((image: Image) => image.sys.id === id)
		);
		const creatorID = matchingPost?.post.creator.sys.id
		navigate(`/profile/${creatorID}`);
	};

	const displayImages = allImages.map((image: allImage, i: number) => {
		const id = image?.sys.id;
		const matchingPost = posts.find((post) =>
			post.post.images?.find((image: Image) => image.sys.id === id)
		);
		if (matchingPost) {
			const {
				firstName,
				artistName,
				lastName,
				title,
			} = matchingPost?.post?.creator?.fields;
			const name = `${firstName} "${artistName}" ${lastName}`;

			const url = image?.fields?.file?.url;
			return (
				<div className={` my-20 ${i % 3 === 0 ? "w-11/12" : "w-9/12"}`}>
					<img
						className="cursor-pointer"
						onClick={() => viewPost(id)}
						src={url}
						alt={title}
						key={url}
					/>
					<p
						className="mx-auto my-2 hover:underline cursor-pointer"
						onClick={() => viewProfile(id)}
					>
						{name}
					</p>
				</div>
			);
		}
	});

	return (
		<div className="grid grid-cols-2  mt-24 ml-48 place-items-center">
			{displayImages}
		</div>
	);
};

export default HomeFeed;
