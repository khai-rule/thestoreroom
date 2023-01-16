import Login from "../components/Login";
import Register from "./Register";
import { useParams } from "react-router-dom";
import ForgetPassword from "../components/ForgetPassword";
import ResetPassword from "../components/ResetPassword";
import ProfileInfo from "../components/ProfileInfo";
import Profile from "../components/Profile";
interface LoginProps {
	handleUpdateLoginData: (updatedLoginData: object) => void;
}

const Account: React.FC<LoginProps> = ({ handleUpdateLoginData }) => {
	const { code } = useParams();

	const display = () => {
		if (code === "login") {
			return <Login handleUpdateLoginData={handleUpdateLoginData} />;
		} else if (code === "forgetpassword") {
			return <ForgetPassword />;
		} else if (code === "resetpassword") {
			return <ResetPassword />;
		} else if (code === "profileinfo") {
			return <ProfileInfo />;
		} else if (code === "profile") {
			return <Profile />;
		} else {
			return <Login handleUpdateLoginData={handleUpdateLoginData} />;
		}
	};

	return <>{display()}</>;
};

export default Account;
