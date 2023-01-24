import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StytchUIClient } from "@stytch/vanilla-js";
import { useStytchSession } from "@stytch/react";
import CreatePost from "./CreatePost";
import { ToastContainer, toast } from "react-toastify";
import { Slide } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navbar: React.FC = () => {
	const [nav, setNav] = useState(false);
	const [create, setCreate] = useState(false);
	const { session } = useStytchSession();
	const [showNavbar, setShowNavbar] = useState(true);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.startsWith("/post/")) {
			setShowNavbar(false);
		} else {
			setShowNavbar(true);
		}
	}, [location]);

	console.log(location.pathname);

	const navigate = useNavigate();
	const stytch = new StytchUIClient(
		"public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
	);

	const toggleNav = () => {
		nav ? setNav(false) : setNav(true);
	};

	const handleLogout = () => {
		stytch.session.revoke();
		navigate("/");
	};

	const createPostModal = () => {
		create ? setCreate(false) : setCreate(true);
	};

	const navbar = () => {
		return (
			<div className="fixed inset-0 z-1 bg-primary flex justify-center items-center z-40 text-center text-white">
				<div onClick={toggleNav}>
					<button className="fixed top-6 right-6 hover:underline">Close</button>
					<NavLink to="/">
						<h2 className="hover:underline">Home</h2>
					</NavLink>
					{!session ? (
						<></>
					) : (
						<NavLink to="/profile">
							<h2 className="hover:underline">Profile</h2>
						</NavLink>
					)}
					{!session ? (
						<></>
					) : (
						<h2
							className="hover:underline cursor-pointer"
							onClick={createPostModal}
						>
							Create
						</h2>
					)}
					{!session ? (
						<NavLink to="/account/login">
							<h2 className="hover:underline cursor-pointer">Login</h2>
						</NavLink>
					) : (
						<a onClick={handleLogout}>
							<h2 className="hover:underline cursor-pointer">Logout</h2>
						</a>
					)}
					<h2 className="hover:underline cursor-pointer">About</h2>
				</div>
			</div>
		);
	};

	return (
		<>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				limit={1}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover={false}
				theme="dark"
				transition={Slide}
			/>
			{create ? (
				<CreatePost closeModal={() => setCreate(false)} setCreate={setCreate} />
			) : (
				<></>
			)}
			{showNavbar ? (
				<nav className="sticky top-4 flex justify-between mx-4">
					<h2 className="hover:cursor-pointer" onClick={() => navigate("/")}>
						TheStoreroom
					</h2>
					<a
						className="relative hover:cursor-pointer hover:underline z-50 mt-2 mx-2 decoration-primary"
						onClick={toggleNav}
					>
						{nav ? "Close" : "Menu"}
					</a>
				</nav>
			) : (
				<></>
			)}
			{nav ? navbar() : <></>}
		</>
	);
};

export default Navbar;
