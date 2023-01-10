import Login from "../components/Login";
import Register from "../components/Register";
import { useParams } from "react-router-dom";

const Account: React.FC = () => {
	const { code } = useParams();

	const display = () => {
		if (code === "login") {
			return <Login />;
		} else if (code === "register") {
			return <Register />;
			//TODO add a forget password
		} else {
			return <Login />;
		}
	};

	return <>{display()}</>;
};

export default Account;
