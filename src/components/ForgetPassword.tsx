import { useNavigate } from "react-router-dom";
const ResetPassword: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>Reset your password</h1>
			<p>We will send you an email to reset your password</p>

			<input placeholder="Email" />

			<button>Submit</button>

			<a onClick={() => navigate("/account/login")}>
				Cancel
			</a>
			<p>
				Don't have an account yet?
				<a onClick={() => navigate("/account/register")}>Create Account</a>
			</p>
		</>
	);
};

export default ResetPassword;
