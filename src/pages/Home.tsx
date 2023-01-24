import HomeFeed from "../components/HomeFeed";
import useContentful from "../utilities/useContentful";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading";
import HomeSideNav from "../components/HomeSideNav";
import { CreatorsContext } from "../utilities/context";
import { useContext } from "react";

const Homepage: React.FC = () => {
	const [posts, setPosts] = useState([] as any);
	const [status, setStatus] = useState<string>("idle");
	const [display, setDisplay] = useState<string>("none");

	const { getPosts } = useContentful();

	useEffect(() => {
		getPosts().then((response) => {
			setPosts(response);
			setStatus("done");
		});
		setStatus("loading");
	}, []);

	console.log(posts)

	if (status === "loading") return <Loading />;

	return (
		<>
			<h3 className="fixed left-1/2 transform -translate-x-1/2 top-6">{` Discover ${
				display === "none" ? "" : display
			}`}</h3>
			<HomeSideNav display={display} setDisplay={setDisplay} />
			<HomeFeed posts={posts} display={display} setDisplay={setDisplay} />
		</>
	);
};
export default Homepage;
