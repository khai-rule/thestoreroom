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
							? "underline py-1 cursor-pointer decoration-primary"
							: "py-1 cursor-pointer hover:underline decoration-primary"
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
				<h4 className=" underline decoration-primary py-1">Discover</h4>
			</div>
			<div className="py-4">{displayTags()}</div>
		</div>
	);
};

export default HomeSideNav;
