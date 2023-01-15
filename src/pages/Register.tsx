import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStytch } from "@stytch/react";
import { useParams } from "react-router-dom";

const Register: React.FC = () => {
	const navigate = useNavigate();
	const { code } = useParams();

	let emailParams = code + ".com";

	if (code === "*") {
		emailParams = "";
	}

	const stytchClient = useStytch();

	const initialValues = {
		email: emailParams,
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

			<p>
				Welcome to The Storeroom! We're dedicated to showcasing the best creative
				talent out there, and to do that, we carefully curate our community. If
				you're a visual artist or photographer looking to share your work with a
				discerning audience, we'd love to have you on board. To join, you have
				several options: Submit your portfolio through our application form. One
				of our team members will review your work and get back to you within a
				week. If your application is approved, you'll be able to create your
				account and start uploading your work right away. Join by referral from
				one of our existing members. If you know an existing member on our
				platform, ask them to refer you and we'll fast track your application.
			</p>

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
