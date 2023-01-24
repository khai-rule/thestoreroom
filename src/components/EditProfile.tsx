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
import { ProfileForm } from "../utilities/interface";
import { toast } from "react-toastify";
import { createClient } from "contentful-management";

const ProfileInfo: React.FC = () => {
	const navigate = useNavigate();
	const { loggedInCreatorContentful } = useContext(CreatorsContext);
	const [status, setStatus] = useState<string>("idle");

	const { session } = useStytchSession();
	const stytchClient = useStytch();

	console.log(stytchClient);
	const client = createClient({
		space: "94snklam6irp",
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
	});

	useEffect(() => {
		if (!session) {
			navigate("/");
		}
	}, [session]);

	const firstName = loggedInCreatorContentful?.creator?.firstName;
	const lastName = loggedInCreatorContentful?.creator?.lastName;
	const artistName = loggedInCreatorContentful?.creator?.artistName;
	const email = loggedInCreatorContentful?.creator?.email;
	const bio = loggedInCreatorContentful?.creator?.bio;
	const title = loggedInCreatorContentful?.creator?.title;
	const website = loggedInCreatorContentful?.creator?.website;
	const instagram = loggedInCreatorContentful?.creator?.instagram;

	const creatorID = loggedInCreatorContentful?.sys?.id;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileForm>({
		resolver: yupResolver(profileSchema),
	});

	const onSubmit = (data: ProfileForm) => {
		setStatus("loading");
		console.log(data);

		const {
			firstName,
			lastName,
			artistName,
			bio,
			title,
			website,
			instagram,
		} = data;

		//! Update Contentful
		client
			.getSpace("94snklam6irp")
			.then((space) => space.getEnvironment("master"))
			.then((environment) => environment.getEntry(creatorID))
			.then((entry) => {
				{
					firstName === "" ? "" : (entry.fields.firstName["en-US"] = firstName);
				}
				{
					lastName === "" ? "" : (entry.fields.lastName["en-US"] = lastName);
				}
				{
					artistName === ""
						? ""
						: (entry.fields.artistName["en-US"] = artistName);
				}

				{
					bio === "" ? "" : (entry.fields.bio["en-US"] = bio);
				}
				{
					title === "" ? "" : (entry.fields.title["en-US"] = title);
				}
				{
					website === "" ? "" : (entry.fields.website["en-US"] = website);
				}
				{
					instagram === "" ? "" : (entry.fields.instagram["en-US"] = instagram);
				}
				return entry.update();
			})
			.then((entry) => {
				entry.publish();
				console.log(`Entry ${entry.sys.id} updated and published.`);
				toast("Profile details successfully updated");
				setStatus("idle");
				navigate(`/profile/${artistName}`)
			})
			.catch(console.error);
	};

	return (
		<div className="flex flex-col items-center m-12">
			<h2 className="m-4">Fill in your details</h2>
			<form className="" onSubmit={handleSubmit(onSubmit)}>
				<label>Artist Name</label>
				<input
					className="m-4"
					placeholder={artistName}
					{...register("artistName")}
				/>
				<p>This will appear in your profile link.</p>
				<p className="text-red">{errors.artistName?.message}</p>

				<label>First Name</label>
				<input
					className="m-4"
					placeholder={firstName}
					{...register("firstName")}
				/>
				<p className="text-red">{errors.firstName?.message}</p>

				<label>Last Name</label>
				<input
					className="m-4"
					placeholder={lastName}
					{...register("lastName")}
				/>
				<p className="text-red">{errors.lastName?.message}</p>

				<label>Bio</label>
				<textarea
					className="m-4  focus:placeholder-opacity-100 focus:outline-none resize-none w-full h-32"
					placeholder={bio}
					{...register("bio")}
				/>
				<p className="text-red">{errors.bio?.message}</p>

				<label>Title</label>
				<input className="m-4" placeholder={title} {...register("title")} />
				<p className="text-red">{errors.title?.message}</p>

				<label>Website</label>
				<input className="m-4" placeholder={website} {...register("website")} />
				<p className="text-red">{errors.website?.message}</p>

				<label>Instagram</label>
				<input
					className="m-4"
					placeholder={instagram}
					{...register("instagram")}
				/>
				<p className="text-red">{errors.instagram?.message}</p>

				{status === "loading" ? (
					<div
						className="spinner-border animate-spin inline-block w-6 h-6 border-3 rounded-full text-black m-4"
						role="status"
					>
						<span className="visually-hidden">Loading...</span>
					</div>
				) : (
					<input className="m-4 cursor-pointer" type="submit" value="Update" />
				)}
			</form>
		</div>
	);
};

export default ProfileInfo;
