import { HomeFeedProps } from "../utilities/interface";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Image } from "../utilities/interface";
import { allImage } from "../utilities/interface";
import LazyLoad from "react-lazy-load";

const HomeFeed: React.FC<HomeFeedProps> = ({
	posts,
	display,
	setDisplay,
	grid,
}) => {
	const navigate = useNavigate();

	const allImages = posts
		.flatMap((post: any) => post.post.images)
		.sort(() => Math.random() - 0.5);

	const viewPost = (id: string) => {
		navigate(`/post/${id}`);
	};

	const viewProfile = (id: string) => {
		const matchingPost = posts.find((post) =>
			post.post.images?.find((image: Image) => image.sys.id === id)
		);
		const artistName = matchingPost?.post.creator.fields.artistName;
		navigate(`/profile/${artistName}`);
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
				<div
					className={` ${grid ? "my-4" : "my-12"}  ${
						i % 3 === 0 ? "w-11/12" : "w-9/12"
					}`}
				>
					<LazyLoad>
						<>
							<img
								className="cursor-pointer"
								onClick={() => viewPost(id)}
								src={url}
								alt={title}
								key={url}
							/>
							{grid ? (
								<></>
							) : (
								<p
									className="mx-auto my-2 hover:underline cursor-pointer decoration-primary"
									onClick={() => viewProfile(id)}
								>
									{name}
								</p>
							)}
						</>
					</LazyLoad>
				</div>
			);
		}
	});

	return (
		<div
			className={`grid ${
				grid ? "grid-cols-5" : "grid-cols-2"
			}   my-24 ml-48 place-items-center`}
		>
			{displayImages}
		</div>
	);
};

export default HomeFeed;
