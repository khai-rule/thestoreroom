import { allImage, Post, ProfilePostsProps } from "../utilities/interface";
import { useRef } from "react";
import { UseRef } from "../utilities/interface";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const ProfilePosts: React.FC<ProfilePostsProps> = ({ matchingCreator }) => {
	const navigate = useNavigate();
	const ref: UseRef = useRef(null);

	const scrollToPost = () => {
		ref.current!.scrollIntoView({ behavior: "smooth" });
		console.log(ref.current);
	};

	const postsNav = matchingCreator?.creator.posts.map((post: Post) => {
		return (
			<>
				<h4 className="cursor-pointer my-2" onClick={scrollToPost}>
					{post?.fields?.title}
				</h4>
			</>
		);
	});

	const viewPost = (id: string) => {
		navigate(`/post/${id}`);
	};

	//TODO sort this out - reverse the order of the array - issue is--> the type is object
	const reversedPosts = matchingCreator?.creator.posts;
	console.log(reversedPosts);
	console.log(typeof reversedPosts);

	const posts = matchingCreator?.creator.posts.map((post: Post) => {
		const title = post?.fields?.title;
		const images = post?.fields?.images.map(
			(image: allImage, index: number) => {
				const url = image?.fields?.file.url;
				const id = image?.sys.id;

				return (
					<>
						<img
							className={
								index % 3 !== 0
									? "w-8/12 my-8 cursor-pointer"
									: "w-11/12 my-8 cursor-pointer"
							}
							src={url}
							alt={title}
							key={title}
							onClick={() => viewPost(id)}
						/>
					</>
				);
			}
		);
		return (
			<div className="flex my-24">
				<LazyLoad>
					<div className="grid grid-cols-2 ml-48 place-items-center">
						{images}
					</div>
				</LazyLoad>
			</div>
		);
	});

	return (
		<>
			<div className="fixed top-1/2 transform -translate-y-1/2 left-8">
				{postsNav}
			</div>
			<div className="">{posts}</div>;
		</>
	);
};

export default ProfilePosts;
