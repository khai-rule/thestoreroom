import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>Register</h1>
			<p>
            Have an account?
				<a onClick={() => navigate("/account/login")}>Sign In</a>
			</p>
		</>
	);
};

export default Register;
