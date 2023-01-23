import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useContentful from "../utilities/useContentful";
import { useState } from "react";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import ProfileBody from "../components/ProfileBody";
import ProfileHead from "../components/ProfileHead";


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

	console.log(creators)

	if (status === "loading") return <Loading />;

	const matchingCreator = creators.find(
		(creator: any) => creator.sys.id === code
	);


	return (
		<div>
			
			<div>
				<ProfileHead matchingCreator={matchingCreator} />
			</div>
			<ProfileBody matchingCreator={matchingCreator} />
		</div>
	);
};

export default Profile;
