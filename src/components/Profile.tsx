import { useStytchUser } from "@stytch/react";
import { LoginDataContext } from "../App";
import { useContext } from "react";

const Profile: React.FC = () => {
	const { user } = useStytchUser();
	const { creators } = useContext(LoginDataContext);

	const creator = creators.find(
		(creator: string) => console.log("dasd", creator)
	);

	console.log("creator", creators);
	const userEmail = user?.emails[0].email;
	console.log("user", userEmail);

	return <></>;
};

export default Profile;
