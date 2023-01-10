import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>Create Account</h1>

			<input placeholder="First Name" />
            <input placeholder="Last Name" />
            <input placeholder="Email" />
            <input placeholder="Password" />
            
			<button>Create</button>

			<p>
				Have an account?
				<a onClick={() => navigate("/account/login")}>Sign In</a>
			</p>
		</>
	);
};

export default Register;
