import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

const Invite: React.FC = () => {
	const { register, handleSubmit } = useForm();
	const [inviteSent, setInviteSent] = useState(false);

	const onSubmit = (data: { email: string }) => {
		const { email } = data;
		const removeDotCom = email.replace(".com", "");

		navigator.clipboard.writeText(
			`https://thestoreroom.vercel.app/register/${removeDotCom}`
		);
		email ? toast("Link copied to clipboard") : "";
	};

	return (
		<div className="flex flex-col items-center my-24">
			<h1>Invite Creators to The Storeroom</h1>
			<p className="w-3/6 max-w-3xl items-center my-4">
				Welcome to The Storeroom, where creativity flourishes. We are a
				community of artists, photographers and designers sharing and inspiring
				each other. As a member, you have the ability to invite other creators
				to join our community. Simply type in the email address of the person
				you'd like to invite in the input field below, and click the "Get Invite
				Link" button. Simply send them the unique link to join The Storeroom.
				Together, we can push the boundaries of creativity.
			</p>
			{inviteSent ? (
				<p>Invite sent!</p>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<input className="m-4" type="email" {...register("email")} />

					<button className="font-semibold">Get Invite Link</button>
				</form>
			)}
		</div>
	);
};

export default Invite;
