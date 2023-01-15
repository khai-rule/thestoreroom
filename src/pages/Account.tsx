import Login from "../components/Login";
import Register from "../components/Register";
import { useParams } from "react-router-dom";
import ForgetPassword from "../components/ForgetPassword";
import ResetPassword from "../components/ResetPassword";
import Profile from "../components/Profile";
import { LoginDataContext } from "../App";
import { useContext } from "react";
interface LoginProps {
	handleUpdateLoginData: (updatedLoginData: object) => void;
}

const Account: React.FC<LoginProps> = ({ handleUpdateLoginData }) => {
	const { code } = useParams();

	const display = () => {
		if (code === "login") {
			return <Login handleUpdateLoginData={handleUpdateLoginData} />;
		} else if (code === "register") {
			return <Register />;
		} else if (code === "forgetpassword") {
			return <ForgetPassword />;
		} else if (code === "resetpassword") {
			return <ResetPassword />;
		} else if (code === "profile") {
			return <Profile />;
		} else {
			return <Login handleUpdateLoginData={handleUpdateLoginData} />;
		}
	};

	return <>{display()}</>;
};

export default Account;
