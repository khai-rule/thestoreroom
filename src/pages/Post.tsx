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
	const [update, setUpdate] = useState<number>(1);
	

	useEffect(() => {
		getPosts().then((response) => {
			setPosts(response);
			setStatus("done");
		});
		setStatus("loading");
	}, [update]);

	if (status === "loading") return <Loading />;

	const matchingPost = posts.find((post: any) =>
		post.post.images?.find((image: any) => image.sys.id === code)
	);




	return (
		<>
			<button className="fixed right-8 top-6 hover:underline" onClick={() => navigate(-1)}>Back</button>
			<div className="flex my-40 max-h-[48rem] object-contain">
				<PostsDetails matchingPost={matchingPost} code={code}  setUpdate={setUpdate}/>
				<PostsGallery matchingPost={matchingPost} code={code} />
			</div>
		</>
	);
};

export default Post;
