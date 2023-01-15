import { useNavigate } from "react-router-dom";
import { Stytch } from "@stytch/stytch-react";
import { SDKProductTypes } from "@stytch/stytch-react";
import React, { useState } from "react";
import { useStytch } from "@stytch/react";
import { useEffect } from "react";
import { useContext } from "react";
import { LoginDataContext } from "../App";

interface LoginProps {
    handleUpdateLoginData: (updatedLoginData: object) => void;
}
 
const Login: React.FC<LoginProps> = ({ handleUpdateLoginData }) => {
	const navigate = useNavigate();
	const stytchClient = useStytch();

	const { setLoginData } = useContext(LoginDataContext);

	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
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

		const response = stytchClient.passwords.authenticate({
			email,
			password,
			session_duration_minutes: 60,
		});
		response
			.then((value) => {
				setLoginData(value.user)
				handleUpdateLoginData(value.user)
				navigate("/");
				console.log("value", value.user)
			})
			.catch((error) => {
				const errorString = JSON.stringify(error.message);
				const errorArray = errorString.split("\\n");
				setMsg(errorArray[1]);
			});
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

			<p>{msg}</p>

			{msg === "Unauthorized credentials." ? (
				<a onClick={() => navigate("/account/forgetpassword")}>
					Forgot your password?
				</a>
			) : (
				<></>
			)}
			<p>
				Don't have an account yet?
				<a onClick={() => navigate("/register/*")}>Create Account</a>
			</p>
		</>
	);
};

export default Login;
