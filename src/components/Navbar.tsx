import { NavLink } from "react-router-dom";
// import { AuthContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StytchUIClient } from "@stytch/vanilla-js";
import { useStytchSession } from "@stytch/react";
import { useEffect } from "react";

const Navbar: React.FC = () => {
	// const user = useContext(AuthContext);
	const [nav, setNav] = useState(false);

	const navigate = useNavigate();
	const stytch = new StytchUIClient(
		"public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
	);

	const handleClick = () => {
		nav ? setNav(false) : setNav(true);
	};

	const handleLogout = () => {
		stytch.session.revoke();
		navigate("/");
	};

	const { session } = useStytchSession();

	useEffect(() => {
		if (!session) {
			// navigate("/");
		}
	}, [session]);

	const navbar = () => {
		return (
			<div className="fixed inset-0 z-1 bg-main bg-opacity-75 flex justify-center items-center z-40">
				<div onClick={handleClick}>
					<NavLink to="/">
						<h2 className="hover:underline">Home</h2>
					</NavLink>
					{!session ? (
						<></>
					) : (
						<NavLink to="/account/profile">
							<h2 className="hover:underline">Profile</h2>
						</NavLink>
					)}
					{!session ? (
						<NavLink to="/account/login">
							<h2 className="hover:underline">Login</h2>
						</NavLink>
					) : (
						<a onClick={handleLogout}>
							<h2 className="hover:underline">Logout</h2>
						</a>
					)}
				</div>
			</div>
		);
	};

	return (
		<>
			<nav className="sticky top-4 flex justify-between mx-4">
				<h3 className="hover:cursor-pointer" onClick={() => navigate("/")}>Logo</h3>
				<a
					className="relative hover:cursor-pointer hover:underline z-50"
					onClick={handleClick}
				>
					{nav ? "Close" : "Menu"}
				</a>
			</nav>
			{nav ? navbar() : <></>}
		</>
	);
};

export default Navbar;
