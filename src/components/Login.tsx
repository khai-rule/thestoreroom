import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useStytch } from "@stytch/react";
import hideIcon from "../imgIcons/hideIcon";
import showIcon from "../imgIcons/showIcon";
import { toast } from "react-toastify";

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
	const [msg, setMsg] = useState("");
	const [showPassword, setShowPassword] = useState<boolean>(false);

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
				toast("Welcome back to The Storeroom")
				navigate("/");
			})
			.catch((error) => {
				console.log("error", error)
				const errorString = JSON.stringify(error.message);
				const errorArray = errorString.split("\\n");
				setMsg(errorArray[1]);
			});
	};

	return (
		<>
			<div className="flex flex-col items-center my-24">
				<h1>Welcome to The Storeroom</h1>
				<p className="w-3/6 max-w-3xl items-center my-4">
					Welcome to The Storeroom! Please sign in with your registered email
					and password to access your account and start creating, managing and
					delivering your content. Don't have an account yet? Register now to
					join our community of creative minds.
				</p>
				<form onSubmit={handleSubmit}>
					<label className="flex flex-col">
						<input
							className="m-4"
							value={values.email}
							onChange={handleInputChange}
							name="email"
							placeholder="Email"
						/>
						<div className="flex items-center">
							<input
								className="m-4"
								type={showPassword ? "text" : "password"}
								value={values.password}
								onChange={handleInputChange}
								name="password"
								placeholder="Password"
							/>
							<div
								className="cursor-pointer"
								onClick={() => {
									showPassword ? setShowPassword(false) : setShowPassword(true);
								}}
							>
								{showPassword ? showIcon : hideIcon}
							</div>
						</div>

						<input className="cursor-pointer font-semibold hover:underline" type="submit" value="Login" />
					</label>
				</form>

				<p className="text-red">{msg}</p>

				{msg === "Unauthorized credentials." ? (
					<a onClick={() => navigate("/account/forgetpassword")}>
						Forgot your password?
					</a>
				) : (
					<></>
				)}
				<p className="my-4">
					Don't have an account yet?
					<a
						className="mx-2 font-semibold"
						onClick={() => navigate("/register/*")}
					>
						Create Account
					</a>
				</p>
			</div>
		</>
	);
};

export default Login;
