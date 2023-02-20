import HomeFeed from "../components/HomeFeed";
import useContentful from "../utilities/useContentful";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading";
import HomeSideNav from "../components/HomeSideNav";
import { CreatorsContext } from "../utilities/context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentfulData } from "../actions/fetchContentfulData";
import { Action } from "../utilities/interface";

const Homepage: React.FC = () => {
	const [display, setDisplay] = useState<string>("none");
	const [grid, setGrid] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch<Action | any>(fetchContentfulData("posts"));
	}, []);

	const postsAPI = useSelector((state: any) => state.contentfulData);

	if (postsAPI.loading === true) return <Loading />;

	return (
		<>
			<h3
				className={`fixed left-1/2 transform -translate-x-1/2 top-6 ${
					display === "none" ? "text-primary" : "text-secondary cursor-pointer"
				} `}
				onClick={() => setDisplay("none")}
			>{` Discover ${display === "none" ? "" : display}`}</h3>
			<HomeSideNav
				display={display}
				setDisplay={setDisplay}
				setGrid={setGrid}
				grid={grid}
			/>
			<HomeFeed
				posts={postsAPI?.data?.posts}
				display={display}
				setDisplay={setDisplay}
				grid={grid}
			/>
		</>
	);
};
export default Homepage;
