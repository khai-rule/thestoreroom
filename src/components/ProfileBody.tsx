import { allImage, Post, ProfilePostsProps } from "../utilities/interface";
import { useRef } from "react";
import { UseRef } from "../utilities/interface";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { useState } from "react";
import { useEffect } from "react";

const ProfilePosts: React.FC<ProfilePostsProps> = ({ matchingCreator }) => {
	const navigate = useNavigate();
	const postsRef = useRef<{ [key: string]: React.RefObject<any> }>({});

	const reversePosts = Array.isArray(matchingCreator?.creator?.posts)
		? [...matchingCreator.creator.posts].reverse()
		: [];

	const [activePost, setActivePost] = useState<string>("");

	const scrollToPost = (postId: string) => {
		const postElement = postsRef.current[postId].current;

		window.scrollTo({
			top: postElement.offsetTop,
			behavior: "smooth",
		});
		setActivePost(postId);
	};

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActivePost(entry.target.id);
				}
			});
		});

		const getDivs = Object.values(postsRef.current).map(
			(ref: { current: HTMLDivElement }) => ref.current
		);

		getDivs.reverse().forEach((ele) => observer.observe(ele));

		return () => {
			getDivs.forEach((ele) => observer.unobserve(ele));
		};
	}, []);

	const postsNav = reversePosts?.map((post: Post) => {
		return (
			<>
				<h4
					className={`cursor-pointer my-2 ${
						activePost === post.sys.id
							? "text-secondary hover:underline"
							: "hover:underline"
					}`}
					onClick={() => scrollToPost(post.sys.id)}
				>
					{post?.fields?.title}
				</h4>
			</>
		);
	});

	const viewPost = (id: string) => {
		navigate(`/post/${id}`);
	};

	const posts = reversePosts?.map((post: Post) => {
		const postId = post?.sys.id as string;
		postsRef.current[postId] = useRef(null);
		const ref = postsRef.current[postId];
		const title = post?.fields?.title;
		const images = post?.fields?.images
			.reverse()
			.map((image: allImage, index: number) => {
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
							onClick={() => viewPost(id)}
						/>
					</>
				);
			});
		return (
			<div className="flex my-24" ref={ref} id={postId}>
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
			<div>{posts}</div>
		</>
	);
};

export default ProfilePosts;
