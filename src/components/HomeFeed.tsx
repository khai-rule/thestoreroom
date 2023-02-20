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
		.flatMap((post: any) => post.fields.images)
		.sort(() => Math.random() - 0.5);

	const viewPost = (id: string) => {
		navigate(`/post/${id}`);
	};

	const viewProfile = (id: string) => {
		const matchingPost = posts.find((post) =>
			post.fields.images?.find((image: Image) => image.sys.id === id)
		);
		const artistName = matchingPost?.fields.creator.fields.artistName;
		navigate(`/profile/${artistName}`);
	};

	const displayImages = allImages.map((image: allImage, i: number) => {
		const id = image?.sys.id;
		const matchingPost = posts.find((post) =>
		post.fields.images?.find((image: Image) => image.sys.id === id)
		);

		
		const firstName = matchingPost?.fields?.creator?.fields?.firstName !== undefined ? matchingPost?.fields?.creator?.fields?.firstName : ""
		const artistName = matchingPost?.fields?.creator?.fields?.artistName !== undefined ? matchingPost?.fields?.creator?.fields?.artistName : ""
		const lastName = matchingPost?.fields?.creator?.fields?.lastName !== undefined ? matchingPost?.fields?.creator?.fields?.lastName : ""
		const name = `${firstName} "${artistName}" ${lastName}`;
		
			const url = image?.fields?.file?.url;
			return (
				<div
				key={url}
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
								alt={"image"}
								
							/>
							{grid ? (
								<></>
							) : (
								<p
									className="mx-auto my-2 hover:underline cursor-pointer"
									onClick={() => viewProfile(id)}
								>
									{name}
								</p>
							)}
						</>
					</LazyLoad>
				</div>
			);
		
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
