import Login from "../components/Login";
import Register from "../components/Register";
import { useParams } from "react-router-dom";
import ForgetPassword from "../components/ForgetPassword";

const Account: React.FC = () => {
	const { code } = useParams();

	const display = () => {
		if (code === "login") {
			return <Login />;
		} else if (code === "register") {
			return <Register />;
		} else if (code === "forgetpassword") {
			return <ForgetPassword />;
		} else {
			return <Login />;
		}
	};

	return <>{display()}</>;
};

export default Account;
