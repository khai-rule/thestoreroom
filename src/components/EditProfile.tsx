import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useStytch } from "@stytch/react";
import { useState } from "react";
import { useEffect } from "react";
import { useStytchSession } from "@stytch/react";
import { useContext } from "react";
import { CreatorsContext } from "../utilities/context";
import { useForm } from "react-hook-form";
import { profileSchema } from "../utilities/YUPvalidations";
import { yupResolver } from "@hookform/resolvers/yup";

const ProfileInfo: React.FC = () => {
	const navigate = useNavigate();
	const { loggedInCreatorContentful } = useContext(CreatorsContext);

	const { session } = useStytchSession();

	useEffect(() => {
		if (!session) {
			navigate("/");
		}
	}, [session]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(profileSchema),
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input placeholder="First Name" {...register("firstName")} />
				<p>{errors.firstName?.message}</p>

				<input placeholder="Last Name" {...register("lastName")} />
				<p>{errors.lastName?.message}</p>

				<input placeholder="Artist Name" {...register("artistName")} />
				<p>{errors.artistName?.message}</p>

				<input placeholder="Email" {...register("email")} />
				<p>{errors.email?.message}</p>

				<textarea placeholder="Bio" {...register("bio")} />
				<p>{errors.bio?.message}</p>

				<input placeholder="Title" {...register("title")} />
				<p>{errors.title?.message}</p>

				<input placeholder="Website" {...register("website")} />
				<p>{errors.website?.message}</p>

				<input className="cursor-pointer p-2 " type="submit" value="Update" />
			</form>
		</>
	);
};

export default ProfileInfo;
