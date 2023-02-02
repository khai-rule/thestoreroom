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
	const [ grid, setGrid ] = useState(false)

	const { getPosts } = useContentful();

	useEffect(() => {
		getPosts().then((response) => {
			setPosts(response);
			setStatus("done");
		});
		setStatus("loading");
	}, []);

	if (status === "loading") return <Loading />;

	return (
		<>
			<h3 className={`fixed left-1/2 transform -translate-x-1/2 top-6 ${display === "none" ? "text-primary" : "text-secondary cursor-pointer"} `} 
			onClick={() => setDisplay("none")}
			>{` Discover ${
				display === "none" ? "" : display
			}`}</h3>
			<HomeSideNav display={display} setDisplay={setDisplay} setGrid={setGrid} grid={grid}/>
			<HomeFeed posts={posts} display={display} setDisplay={setDisplay} grid={grid}/>
		</>
	);
};
export default Homepage;
