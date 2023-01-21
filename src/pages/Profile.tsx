import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useContentful from "../utilities/useContentful";
import { useState } from "react";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
	const { code } = useParams();
	const [status, setStatus] = useState<string>("idle");
	const [creators, setCreators] = useState([] as any);

	const { getCreators } = useContentful();

	useEffect(() => {
		getCreators().then((response) => {
			setCreators(response);
			setStatus("done");
		});
		setStatus("loading");
	}, []);

	if (status === "loading") return <Loading />;

	const matchingCreator = creators.find((creator: any) =>
		creator.sys.id === code
	);

	const userEmail = (matchingCreator?.creator.email);

	console.log(userEmail)
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


	//TODO change "any"
	const posts = matchingCreator?.creator.posts.map((post: any) => {
		const title = post.fields.title;
		const caption = post.fields.caption;
		const images = post.fields.images.map((image: any, index: number) => {
			const url = image?.fields.file.url;

			return (
				<>
					<img
						className={index % 2 !== 0 ? "w-3/6 mx-4" : "w-5/6 mx-4"}
						src={url}
						alt={title}
						key={title}
					/>
				</>
			);
		});
		return (
			<div className="mt-40">
				<h3>{title}</h3>
				<p>{caption}</p>
				<div className="grid grid-cols-2 place-items-center">{images}</div>
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
					{formatWebsite ? formatWebsite : ""}
				</a>
				<a className="mx-4" href={instagramLink} target="_blank">
					{ instagram ? `@${instagram}` : ""}
				</a>
			</div>
			{posts}
		</div>
	);
};

export default Profile;
