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
import { useContext } from "react";
import { CreatorsContext } from "../utilities/context";
import logoIcon2 from "../imgIcons/logoIcon2.svg";

const Navbar: React.FC = () => {
	const [nav, setNav] = useState(false);
	const [create, setCreate] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true);

	const { session } = useStytchSession();
	const location = useLocation();

	const { loggedInCreatorContentful } = useContext(CreatorsContext);

	const loggedInCreatorArtistName =
		loggedInCreatorContentful?.creator?.artistName;

	useEffect(() => {
		if (
			location.pathname.startsWith("/post/") ||
			location.pathname.startsWith("/about/")
		) {
			setShowNavbar(false);
		} else {
			setShowNavbar(true);
		}
	}, [location]);

	const navigate = useNavigate();
	const stytch = new StytchUIClient(
		"public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
	);

	const toggleNav = () => {
		nav ? setNav(false) : setNav(true);
	};

	const handleLogout = () => {
		stytch.session.revoke();
		toast("You have successfully logged out.");
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
						<>
							<NavLink to={`/profile/${loggedInCreatorArtistName}`}>
								<h2 className="hover:underline">Profile</h2>
							</NavLink>
							<h2
								className="hover:underline cursor-pointer"
								onClick={createPostModal}
							>
								Create
							</h2>
							<NavLink to={"/invite"}>
								<h2 className="hover:underline">Invite</h2>
							</NavLink>
						</>
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
					<NavLink to="/about/">
						<h2 className="hover:underline cursor-pointer">About</h2>
					</NavLink>
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
				<nav className="fixed top-4 flex mx-4">
					<img
						src={logoIcon2}
						alt="Logo Icon"
						className="hover:cursor-pointer w-36 fixed -left-5 top-10"
						onClick={() => navigate("/")}
					/>

					<a
						className="fixed right-4 top-4 hover:cursor-pointer hover:underline z-50 mt-2 mx-2 decoration-primary"
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
