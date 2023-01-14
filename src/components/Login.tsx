import { useNavigate } from "react-router-dom";
import { Stytch } from "@stytch/stytch-react";
import { SDKProductTypes } from "@stytch/stytch-react";
import { useState } from "react";
import { useStytch } from "@stytch/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const stytchClient = useStytch();

	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

	const [values, setValues] = useState(initialValues);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const email = values.email;
	const password = values.password;

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		stytchClient.passwords.authenticate({
			email,
			password,
			session_duration_minutes: 60,
		});
		navigate("/");
	};

	return (
		<>
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<label>
					<input
						value={values.email}
						onChange={handleInputChange}
						name="email"
						placeholder="Email"
					/>
					<input
						value={values.password}
						onChange={handleInputChange}
						name="password"
						placeholder="Password"
					/>
				</label>

				<input type="submit" value="Login" />
			</form>

			<a onClick={() => navigate("/account/forgetpassword")}>
				Forgot your password?
			</a>
			<p>
				Don't have an account yet?
				<a onClick={() => navigate("/account/register")}>Create Account</a>
			</p>
		</>
	);
};

export default Login;
