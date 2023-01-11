import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStytch } from "@stytch/react";

const Register: React.FC = () => {
	const navigate = useNavigate();
	const stytchClient = useStytch();

	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [values, setValues] = useState(initialValues);
	const [msg, setMsg] = useState("messages");

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
		console.log(values);
		stytchClient.passwords
			.strengthCheck({ email, password })
			.then((res) => {
				console.log("success", res);
			})
			.catch((err) => {
				console.log("error: ", err);
			});

		stytchClient.passwords.create({
			email,
			password,
			session_duration_minutes: 60,
		});
		navigate("/account/profileinfo")
	};

	return (
		<>
			<h1>Create Account</h1>

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

				<input type="submit" value="submit" />
			</form>
				{msg}
			<p>
				Have an account?
				<a onClick={() => navigate("/account/login")}>Sign In</a>
			</p>
		</>
	);
};

export default Register;
