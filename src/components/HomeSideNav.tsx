import { useStytchSession } from "@stytch/react";
import { HomeDisplayProps } from "../utilities/interface";

const HomeSideNav: React.FC<HomeDisplayProps> = ({
	display,
	setDisplay,
	setGrid,
	grid,
}) => {
	const { session } = useStytchSession();

	const tags = [
		"Food",
		"Lifestyle",
		"Beauty",
		"Outdoor",
		"Portrait",
		"Fashion",
	];
	const displayTags = () => {
		const getTags = tags.map((tag: string) => {
			return (
				<h4
					className={
						display === tag
							? "text-orange py-1 cursor-pointer"
							: "py-1 cursor-pointer hover:underline"
					}
					onClick={() =>
						display === tag ? setDisplay("none") : setDisplay(tag)
					}
				>
					{tag}
				</h4>
			);
		});
		return getTags;
	};

	return (
		<div className="fixed top-1/2 transform -translate-y-1/2 left-8">
			<button onClick={() => (grid ? setGrid(false) : setGrid(true))}>
				Grid
			</button>
			<div className="py-4">
				{session ? <h4 className="py-1 ">Following</h4> : <></>}
				<h4 onClick={() => setDisplay("none")} className={display === "none" ? "py-1 text-orange cursor-pointer" : "py-1 hover:underline cursor-pointer"}>Discover</h4>
			</div>
			<div className="py-4">{displayTags()}</div>
		</div>
	);
};

export default HomeSideNav;
