import { useStytchUser } from "@stytch/react";
import { LoginDataContext } from "../App";
import { useContext } from "react";
import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStytchSession } from "@stytch/react";
import { Creator } from "../interface";

const Profile: React.FC = () => {
	const navigate = useNavigate();
	const { session } = useStytchSession();
	const { user } = useStytchUser();
	const { creators } = useContext(LoginDataContext);

	useEffect(() => {
		if (!session) {
			navigate("/");
		}
	}, [session]);

	const userEmail = _.lowerCase(user?.emails[0].email);

	const creator = creators.find(
		(creator: Creator) => _.lowerCase(creator.creator.email) === userEmail
	);

	const name = `${creator?.creator.firstName} "${creator?.creator.artistName}" ${creator?.creator.lastName}`;
	const title = creator?.creator.title;
	const bio = creator?.creator.bio;
	const website = creator?.creator.website;
	const formatWebsite = website
		?.replace(/^https?:\/\//, "")
		?.replace(/^www./, "");
	const instagram = creator?.creator.instagram;
	const instagramLink = `https://www.instagram.com/${instagram}/?hl=en`;

	//TODO change "any"
	const posts = creator?.creator.posts.map((post: any) => {
		const title = post.fields.title;
		const caption = post.fields.caption;
		const images = post.fields.images.map((image: any, index: number) => {
			const url = image?.fields.file.url;
			if (index % 2 !== 0) {
				return (
					<>
						<img className="w-3/6 mx-4" src={url} alt={title} key={title} />
					</>
				);
			} else {
				return (
					<>
						<img className="w-3/6 mx-4" src={url} alt={title} key={title} />
					</>
				);
			}
		});
		return (
			<div>
				<h3>{title}</h3>
				<p>{caption}</p>
				<div className="flex overflow-x-scroll">{images}</div>
			</div>
		);
	});

	return (
		<div className="text-center">
			<h1>{name}</h1>
			<h3>{title}</h3>
			<p>{bio}</p>
			<div>
				<a className="mx-4" href={website} target="_blank">
					{formatWebsite}
				</a>
				<a className="mx-4" href={instagramLink} target="_blank">
					@{instagram}
				</a>
			</div>
			{posts}
		</div>
	);
};

export default Profile;
