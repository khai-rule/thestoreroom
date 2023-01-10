import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>Login</h1>
			<p>
				Don't have an account yet?
				<a onClick={() => navigate("/account/register")}>Create Account</a>
			</p>
		</>
	);
};

export default Login;
