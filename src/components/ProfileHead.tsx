import { ProfileHeadProps } from "../utilities/interface";
import { useNavigate } from "react-router-dom";
import { CreatorsContext } from "../utilities/context";
import { useEffect, useState, useRef, useContext } from "react";

const ProfileHead: React.FC<ProfileHeadProps> = ({ matchingCreator }) => {
	const navigate = useNavigate();
	const { loggedInCreatorContentful } = useContext(CreatorsContext);

	const [isSticky, setIsSticky] = useState(false);
	const h1Ref = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!h1Ref.current) {
				return;
			}
			if (window.pageYOffset >= h1Ref.current.offsetTop) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const loggedInCreatorArtistName =
		loggedInCreatorContentful?.creator?.artistName;

	const firstName =
		matchingCreator?.creator?.firstName !== undefined
			? matchingCreator?.creator?.firstName
			: "";
	const artistName = matchingCreator?.creator?.artistName;
	const lastName =
		matchingCreator?.creator?.lastName !== undefined
			? matchingCreator?.creator?.lastName
			: "";
	const name = `${firstName} "${artistName}" ${lastName}`;
	const title = matchingCreator?.creator?.title;
	const bio = matchingCreator?.creator?.bio;
	const website = matchingCreator?.creator?.website;
	const email = matchingCreator?.creator?.email;

	// const formatWebsite = website
	// 	?.replace(/^https?:\/\//, "")
	// 	?.replace(/^www./, "");

	const instagram = matchingCreator?.creator?.instagram;
	const instagramLink = `https://www.instagram.com/${instagram}/?hl=en`;

	return (
		<div className="text-center flex flex-col items-center mt-16">
			{loggedInCreatorArtistName === artistName ? (
				<button
					className=" text-primary font-semibold py-2 px-4 hover:underline"
					onClick={() => navigate("/account/edit")}
				>
					Edit Profile
				</button>
			) : (
				<></>
			)}

			<h1>{name}</h1>
			<h4>{title}</h4>
			<p className="w-3/6 my-4">{bio}</p>
			<div className="flex" ref={h1Ref}>
				<a
					className="mx-4 text-secondary font-semibold"
					href={website}
					target="_blank"
				>
					{website ? "Website" : ""}
				</a>
				<a
					className="mx-4 text-secondary font-semibold"
					href={instagramLink}
					target="_blank"
				>
					{instagram ? "Instagram" : ""}
				</a>
				<a
					className="mx-4 text-secondary font-semibold"
					href={`mailto:${email}`}
					target="_blank"
				>
					{email ? "Email" : ""}
				</a>
			</div>

			<h3
				className={`fixed top-6 items-center text-secondary z-10 transition-opacity duration-300 ease-in-out opacity-0 hover:cursor-pointer ${
					isSticky ? "opacity-100" : "hover:cursor-default"
				}`}
				onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
			>
				{name}
			</h3>
		</div>
	);
};

export default ProfileHead;
