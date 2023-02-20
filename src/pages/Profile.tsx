import _ from "lodash";
import { useParams } from "react-router-dom";
import ProfileBody from "../components/ProfileBody";
import ProfileHead from "../components/ProfileHead";
import { CreatorsContext } from "../utilities/context";
import { useContext } from "react";
import { UseSelectorState } from "../utilities/interface";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const Profile: React.FC = () => {
	const { code } = useParams();

	const creators = useContext(CreatorsContext);
	const loadingStatus = useSelector(
		(state: UseSelectorState) => state.loadingStatus
	);

	const matchingCreator = creators?.creators?.find(
		(creator: any) => creator.creator.artistName === code
	);

	if (matchingCreator === undefined) {
		return <></>;
	}

	if (loadingStatus === "loading") return <Loading />;

	return (
		<div>
			<ProfileHead matchingCreator={matchingCreator} />
			<ProfileBody matchingCreator={matchingCreator} />
		</div>
	);
};

export default Profile;
