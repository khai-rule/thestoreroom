import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<h1>Set a new password</h1>
			<p>Enter a new password</p>

			<input placeholder="New Password" />

			<button>Submit</button>
		</>
	);
};

export default ResetPassword;
