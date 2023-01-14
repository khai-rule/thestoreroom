import { useState } from "react";

interface User {
	name: string;
	email: string;
	password: string;
	profilePicture: any;
}
interface Props {
	handleCreateUser: (user: User) => void;
}

const Profile: React.FC<Props> = ({ handleCreateUser }) => {
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		password: "",
		profilePicture: null,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, profilePicture: event.target.files?.[0] });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleCreateUser(user);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						name="name"
						value={user.name}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						name="email"
						value={user.email}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={user.password}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Profile Picture:
					<input
						type="file"
						name="profilePicture"
						onChange={handleFileChange}
						required
					/>
				</label>
				<button type="submit">Create User</button>
			</form>
		</>
	);
};

export default Profile;
