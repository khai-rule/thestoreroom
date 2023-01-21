import Login from "../components/Login";
import { useParams } from "react-router-dom";
import ForgetPassword from "../components/ForgetPassword";
import ResetPassword from "../components/ResetPassword";
import ProfileInfo from "../components/ProfileInfo";

const Account: React.FC = () => {
	const { code } = useParams();

	const display = () => {
		if (code === "login") {
			return <Login />;
		} else if (code === "forgetpassword") {
			return <ForgetPassword />;
		} else if (code === "resetpassword") {
			return <ResetPassword />;
		} else if (code === "profileinfo") {
			return <ProfileInfo />;
		} else {
			return <Login />;
		}
	};

	return <>{display()}</>;
};

export default Account;
