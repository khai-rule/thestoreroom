import _ from "lodash";
import { useParams } from "react-router-dom";
import ProfileBody from "../components/ProfileBody";
import ProfileHead from "../components/ProfileHead";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { Action } from "../utilities/interface";
import { fetchContentfulData } from "../actions/fetchContentfulData";
import { useDispatch } from "react-redux";

const Profile: React.FC = () => {
	const { code } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch<Action | any>(fetchContentfulData("creator"));
	}, [dispatch]);

	const creatorsAPI = useSelector((state: any) => state.contentfulData);

	if (creatorsAPI.loading === true) return <Loading />;

	const matchingCreator = creatorsAPI?.data?.creator?.find(
		(creator: any) => 
		
		creator.fields.artistName === code
	);

	if (matchingCreator === undefined) {
		return <></>;
	}

	return (
		<div>
			<ProfileHead matchingCreator={matchingCreator} />
			<ProfileBody matchingCreator={matchingCreator} />
		</div>
	);
};

export default Profile;
