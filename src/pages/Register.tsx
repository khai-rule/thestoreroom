import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStytch } from "@stytch/react";
import { useParams } from "react-router-dom";
import { createClient } from "contentful-management";
import { useEffect } from "react";
import { useStytchSession } from "@stytch/react";
import { toast } from "react-toastify";

const Register: React.FC = () => {
	const navigate = useNavigate();
	const { code } = useParams();
	const { session } = useStytchSession();
	
	const [status, setStatus] = useState<string>("idle");

	const client = createClient({
		space: "94snklam6irp",
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
	});

	useEffect(() => {
		if (session) {
			navigate("/");
		}
	}, [session]);

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
		console.log(values);
		setStatus("loading");
		//! Confirm Password
		if (values.password !== values.confirmPassword) {
			setMsg("Password does not match");
			setStatus("idle");
		} else {
			//! Create Account in Stytch
			stytchClient.passwords
				.strengthCheck({ email, password })
				.then((res) => {
					console.log("Password is good", res);
					const feedback = res.feedback.suggestions;

					feedback === undefined
						? setMsg("Unauthorised credentials")
						: setMsg(feedback?.[0] + feedback?.[1]);
				})
				.catch((error) => {
					const errorString = JSON.stringify(error.message);
					const errorArray = errorString.split("\\n");
					setMsg(errorArray[1]);
					setStatus("idle");
				});

			const response = stytchClient.passwords.create({
				email,
				password,
				session_duration_minutes: 60,
			});
			response
				.then((value) => {
					console.log(value + "Account successfully created in Stytch");

					//!Create Creator in Contentful
					client
						.getSpace("94snklam6irp")
						.then((space) => space.getEnvironment("master"))
						.then((environment) =>
							environment.createEntry("creator", {
								fields: {
									email: {
										"en-US": email,
									},
									artistName: {
										"en-US": email,
									},
								},
							})
						)
						//! Publish the new post
						.then((entry) => {
							const entryID = entry?.sys.id;
							console.log(
								"Account " + entryID + " successfully created in Contentful"
							);
							client
								.getSpace("94snklam6irp")
								.then((space) => space.getEnvironment("master"))
								.then((environment) => environment.getEntry(entryID))
								.then((entry) => entry.publish());
						});

					navigate("/account/edit");
					toast("Account successfully created")
				})
				.catch((error) => {
					const errorString = JSON.stringify(error.message);
					const errorArray = errorString.split("\\n");
					setMsg(errorArray[1]);
					setStatus("idle");
				});
		}
	};

	// Icons
	const hide = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
			/>
		</svg>
	);

	const show = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
			/>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	);

	return (
		<div className="flex flex-col items-center my-24">
			{email ? (
				<>
					<h1>Welcome to The Storeroom</h1>

					<p className="w-3/6 max-w-3xl items-center my-4">
						Welcome to The Storeroom, where creativity thrives! We're excited to
						have you join our community of talented visual artists and
						photographers. With your help, we're building a platform that
						celebrates and amplifies the voices of creators like you.
						<br /> <br />
						To get started, simply create your account by entering your password
						and providing a few details to personalise your profile. Once you're
						registered, you'll have access to all the features of our platform,
						including the ability to upload your work, connect with other
						creators, and promote your art to a wider audience.
						<br /> <br />
						We can't wait to see what you'll create and share with us. So let's
						get started and join the creative community of The Storeroom!
					</p>
				</>
			) : (
				<>
					<h1>Join us at The Storeroom</h1>

					<p className="w-3/6 max-w-3xl items-center my-4">
						Welcome to The Storeroom! We're dedicated to showcasing the best
						creative talent out there, and to do that, we carefully curate our
						community. If you're a visual artist or photographer looking to
						share your work with a discerning audience, we'd love to have you on
						board.
						<br /> <br />
						To join, you have two options:
						<br />
						1. Submit your portfolio through our application form. One of our
						team members will review your work and get back to you within a
						week. If your application is approved, you'll be able to create your
						account and start uploading your work right away.
						<br />
						2. Join by referral from one of our existing members. If you know an
						existing member on our platform, ask them to refer you and we'll
						fast track your application.
					</p>
				</>
			)}

			{email ? (
				<form className="my-4 flex flex-col" onSubmit={handleSubmit}>
					<label className="flex flex-col">
						<input
							className="m-4"
							value={values.email}
							onChange={handleInputChange}
							name="email"
							placeholder="Email"
							disabled={true}
						/>
						<div className="flex items-center">
							<input
								type={showPassword ? "text" : "password"}
								className="m-4"
								value={values.password}
								onChange={handleInputChange}
								name="password"
								placeholder="Password"
							/>
							<input
								type={showPassword ? "text" : "password"}
								className="m-4"
								value={values.confirmPassword}
								onChange={handleInputChange}
								name="confirmPassword"
								placeholder="Confirm Password"
							/>
							<div className="cursor-pointer"
								onClick={() => {
									showPassword ? setShowPassword(false) : setShowPassword(true);
								}}
							>
								{showPassword ? hide : show}
							</div>
						</div>
						<p className="text-red w-96">{msg}</p>
						
					</label>
					{status === "loading" ? (
						<div
							className="spinner-border animate-spin inline-block w-6 h-6 border-3 rounded-full text-black m-4"
							role="status"
						>
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						<input className="cursor-pointer" type="submit" value="Submit" />
					)}
				</form>
			) : (
				<></>
			)}

			<h4 className="my-4">
				Already a member?
				<a className="mx-4" onClick={() => navigate("/account/login")}>
					Sign In
				</a>
			</h4>
		</div>
	);
};

export default Register;
