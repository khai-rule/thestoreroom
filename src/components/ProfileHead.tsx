import { ProfileHeadProps } from "../utilities/interface";

const ProfileHead: React.FC<ProfileHeadProps> = ({ matchingCreator }) => {
	const userEmail = matchingCreator?.creator.email;

	// const creator = creators.find(
	// 	(creator: Creator) => _.lowerCase(creator?.creator?.email) === userEmail
	// );

	const name = `${matchingCreator?.creator.firstName} "${matchingCreator?.creator.artistName}" ${matchingCreator?.creator.lastName}`;
	const title = matchingCreator?.creator.title;
	const bio = matchingCreator?.creator.bio;
	const website = matchingCreator?.creator.website;
	const formatWebsite = website
		?.replace(/^https?:\/\//, "")
		?.replace(/^www./, "");
	const instagram = matchingCreator?.creator.instagram;
	const instagramLink = `https://www.instagram.com/${instagram}/?hl=en`;

	return (
		<div className="text-center flex flex-col items-center mt-16">
			<h1>{name}</h1>
			<h4>{title}</h4>
			<p className="w-3/6 my-4">{bio}</p>
			<div>
				<a className="mx-4 text-primary font-semibold" href={website} target="_blank">
					{formatWebsite ? formatWebsite : ""}
				</a>
				<a className="mx-4 text-primary font-semibold" href={instagramLink} target="_blank">
					{instagram ? `@${instagram}` : ""}
				</a>
			</div>
		</div>
	);
};

export default ProfileHead;
