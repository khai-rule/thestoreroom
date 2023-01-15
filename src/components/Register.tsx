import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStytch } from "@stytch/react";
import { useParams } from "react-router-dom";

const Register: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	console.log(params)

	const stytchClient = useStytch();

	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [values, setValues] = useState(initialValues);
	const [msg, setMsg] = useState("");

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
		if (values.password !== values.confirmPassword) {
			setMsg("Password does not match");
		} else {
			stytchClient.passwords
				.strengthCheck({ email, password })
				.then((res) => {
					console.log("success", res);
					const feedback = res.feedback.suggestions[0];

					feedback === undefined
						? setMsg("Unauthorised credentials")
						: setMsg(feedback);
				})
				.catch((error) => {
					const errorString = JSON.stringify(error.message);
					const errorArray = errorString.split("\\n");
					setMsg(errorArray[1]);
				});

			const response = stytchClient.passwords.create({
				email,
				password,
				session_duration_minutes: 60,
			});
			response
				.then((value) => {
					console.log(value);
					navigate("/account/login");
				})
				.catch((error) => {
					const errorString = JSON.stringify(error.message);
					const errorArray = errorString.split("\\n");
					setMsg(errorArray[1]);
				});
		}
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
						disabled={true}
					/>
					<input
						value={values.password}
						onChange={handleInputChange}
						name="password"
						placeholder="Password"
					/>
					<input
						value={values.confirmPassword}
						onChange={handleInputChange}
						name="confirmPassword"
						placeholder="Confirm Password"
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
