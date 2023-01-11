import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<nav>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/account/login">Login</NavLink>
			<NavLink to="/account/profile">Profile</NavLink>
		</nav>
	);
};

export default Navbar;
