import Login from "../components/Login";
import Register from "../components/Register";
import { useParams } from "react-router-dom";
import ForgetPassword from "../components/ForgetPassword";
import ResetPassword from "../components/ResetPassword";
import Profile from "../components/Profile";
import ProfileInfo from "../components/ProfileInfo";

const Account: React.FC = () => {
	const { code } = useParams();

	const display = () => {
		if (code === "login") {
			return <Login />;
		} else if (code === "register") {
			return <Register />;
		} else if (code === "forgetpassword") {
			return <ForgetPassword />;
		} else if (code === "resetpassword") {
			return <ResetPassword />;
		} else if (code === "profile") {
			return <Profile />;
		} else if (code === "profileinfo") {
			return <ProfileInfo />;
		} else {
			return <Login />;
		}
	};

     console.log(code)

	return <>{display()}</>;
};

export default Account;
