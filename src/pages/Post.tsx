import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useContentful from "../utilities/useContentful";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useState } from "react";
import PostsGallery from "../components/PostsGallery";
import PostsDetails from "../components/PostsDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentfulData } from "../actions/fetchContentfulData";
import { Action } from "../utilities/interface";

const Post: React.FC = () => {
	const navigate = useNavigate();
	const { code } = useParams();

	const [update, setUpdate] = useState<number>(1);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch<Action | any>(fetchContentfulData("posts"));
		dispatch<Action | any>(fetchContentfulData("creator"));
	}, [update]);

	const contentfulAPI = useSelector((state: any) => state.contentfulData);

	if (contentfulAPI.loading === true) return <Loading />;

	const matchingPost = contentfulAPI?.data?.posts?.find((post: any) =>
		post.fields.images?.find((image: any) => image.sys.id === code)
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
