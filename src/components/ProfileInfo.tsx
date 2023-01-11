import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";
import React, { useCallback } from "react";
import { useStytch } from "@stytch/react";
import { useState } from "react";
import { useEffect } from "react";

const ProfileInfo: React.FC = () => {
	const navigate = useNavigate();
	const stytchClient = useStytch();
	const user = useContext(AuthContext);

    useEffect(() => {
        if (user === null) {
          navigate("/");
        }
      }, [user]);

	const initialValues = {
		firstName: "",
		lastName: "",
		artistName: "",
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

	const firstName = values.firstName;
	const lastName = values.lastName;
	const artistName = values.artistName;
    console.log("asd", firstName)

    const name = "hello"

    const handleSubmit = useCallback((e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        stytchClient.user.update({
          name: {
            first_name: firstName,
            last_name: lastName,
            middle_name: artistName
          },
          untrusted_metadata: {
            display_theme: 'DARK_MODE',
          }
        });
      }, [stytchClient, values]);

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
