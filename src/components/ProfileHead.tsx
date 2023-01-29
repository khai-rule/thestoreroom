import { ProfileHeadProps } from "../utilities/interface";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CreatorsContext } from "../utilities/context";

const ProfileHead: React.FC<ProfileHeadProps> = ({ matchingCreator }) => {
	const userEmail = matchingCreator?.creator.email;
	const navigate = useNavigate();
	const { loggedInCreatorContentful } = useContext(CreatorsContext);

	// const creator = creators.find(
	// 	(creator: Creator) => _.lowerCase(creator?.creator?.email) === userEmail
	// );
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
	const formatWebsite = website
		?.replace(/^https?:\/\//, "")
		?.replace(/^www./, "");
	const instagram = matchingCreator?.creator?.instagram;
	const instagramLink = `https://www.instagram.com/${instagram}/?hl=en`;

	return (
		<>
			<div className="text-center flex flex-col items-center mt-16">
				{loggedInCreatorArtistName === artistName ? (
					<button onClick={() => navigate("/account/edit")}>
						Edit Profile
					</button>
				) : (
					<> </>
				)}
				<h1>{name}</h1>
				<h4>{title}</h4>
				<p className="w-3/6 my-4">{bio}</p>
				<div>
					<a
						className="mx-4 text-primary font-semibold"
						href={website}
						target="_blank"
					>
						{formatWebsite ? formatWebsite : ""}
					</a>
					<a
						className="mx-4 text-primary font-semibold"
						href={instagramLink}
						target="_blank"
					>
						{instagram ? `@${instagram}` : ""}
					</a>
				</div>
			</div>
		</>
	);
};

export default ProfileHead;
