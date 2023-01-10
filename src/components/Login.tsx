import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>Login</h1>

            <input placeholder="Email" />
            <input placeholder="Password" />

            <button>Login</button>

            <a onClick={() => navigate("/account/forgetpassword")}>Forgot your password?</a>
			<p>
				Don't have an account yet?
				<a onClick={() => navigate("/account/register")}>Create Account</a>
			</p>
		</>
	);
};

export default Login;
