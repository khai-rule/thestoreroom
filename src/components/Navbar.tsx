import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStytch } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";

const Navbar: React.FC = () => {
	const user = useContext(AuthContext);
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

	const navbar = () => {
		return (
			<nav>
				<NavLink to="/">Home</NavLink>
				{user === null ? (
					<></>
				) : (
					<NavLink to="/account/profile">Profile</NavLink>
				)}
				{user === null ? (
					<NavLink to="/account/login">Login</NavLink>
				) : (
					<a onClick={handleLogout}>Log Out</a>
				)}
			</nav>
		);
	};

	return (
		<>
			<a onClick={handleClick}>{nav ? "Close" : "Menu"}</a>
			{nav ? navbar() : <></>}
		</>
	);
};

export default Navbar;
