import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useContentful from "../utilities/useContentful";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useState } from "react";
import PostsGallery from "../components/PostsGallery";
import PostsDetails from "../components/PostsDetails";

const Post: React.FC = () => {
	const navigate = useNavigate();
	const { code } = useParams();
	const { getPosts } = useContentful();

	const [posts, setPosts] = useState([] as any);
	const [status, setStatus] = useState<string>("idle");

	useEffect(() => {
		getPosts().then((response) => {
			setPosts(response);
			setStatus("done");
		});
		setStatus("loading");
	}, []);

	if (status === "loading") return <Loading />;

	const matchingPost = posts.find((post: any) =>
		post.post.images?.find((image: any) => image.sys.id === code)
	);

	return (
		<>
			<button className="fixed right-12" onClick={() => navigate(-1)}>Back</button>
			<div className="flex my-16">
				<PostsDetails matchingPost={matchingPost} code={code} />
				<PostsGallery matchingPost={matchingPost} code={code} />
			</div>
		</>
	);
};

export default Post;
