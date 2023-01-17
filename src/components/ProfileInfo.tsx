import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useStytch } from "@stytch/react";
import { useState } from "react";
import { useEffect } from "react";
import { useStytchSession } from "@stytch/react";
import { useStytchUser } from "@stytch/react";

const ProfileInfo: React.FC = () => {
	const navigate = useNavigate();
	const stytchClient = useStytch();

	const { session } = useStytchSession();
	const { user } = useStytchUser();

	useEffect(() => {
		if (!session) {
			navigate("/");
		}
	}, [session]);

	const initialValues = {
		firstName: user?.name.first_name,
		lastName: user?.name.last_name,
		artistName: user?.name.middle_name,
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

	const firstName = values.firstName;
	const lastName = values.lastName;
	const artistName = values.artistName;

	const name = "hello";

	const handleSubmit = useCallback(
		(e: React.SyntheticEvent<HTMLFormElement>) => {
			e.preventDefault();
			const response = stytchClient.user.update({
				name: {
					first_name: firstName,
					last_name: lastName,
					middle_name: artistName,
				},
				untrusted_metadata: {
					display_theme: "DARK_MODE",
				},
			});
			setMsg("Profile updated successfully");
		},
		[stytchClient, values]
	);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						value={values.firstName}
						onChange={handleInputChange}
						name="firstName"
						placeholder="First Name"
					/>
					<input
						value={values.lastName}
						onChange={handleInputChange}
						name="lastName"
						placeholder="Last Name"
					/>
					<input
						value={values.artistName}
						onChange={handleInputChange}
						name="artistName"
						placeholder="Artist Name"
						defaultValue="asd"
					/>
				</label>

				<input type="submit" value="submit" />
			</form>
			{msg}
		</>
	);
};

export default ProfileInfo;
