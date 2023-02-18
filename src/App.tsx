import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Register from "./pages/Register";
import useContentful from "./utilities/useContentful";
import { useEffect } from "react";
import { useStytchUser } from "@stytch/react";
import Loading from "./components/Loading";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import _ from "lodash";
import { CreatorsContext } from "./utilities/context";
import { useStytchSession } from "@stytch/react";
import About from "./pages/About";
import Invite from "./pages/Invite";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingStatus } from "./actions/setLoadingStatus";
import { UseSelectorState } from "./utilities/interface";

function App() {
	const { user } = useStytchUser();
	const { session } = useStytchSession();

	const [creators, setCreators] = useState([] as any);
	const [loggedInCreator, setLoggedInCreator] = useState({} as any);
	const [loggedInCreatorContentful, setLoggedInCreatorContentful] = useState(
		{} as any
	);

	const { getCreators } = useContentful();


	const loadingStatus = useSelector((state: UseSelectorState) => state.loadingStatus);

	const dispatch = useDispatch();


	useEffect(() => {
		getCreators().then((response) => {
			setCreators(response);
			setLoggedInCreator(user);
			const loggedInEmailFromStytch = loggedInCreator?.emails?.[0].email;

			const matchingCreator = creators.find(
				(creator: any) =>
					_.lowerCase(creator.creator.email) ===
					_.lowerCase(loggedInEmailFromStytch)
			);

			setLoggedInCreatorContentful(matchingCreator);
			dispatch(setLoadingStatus("done"))
		});
		dispatch(setLoadingStatus("loading"))
	}, [session, loggedInCreator]);

	if (loadingStatus === "loading") return <Loading />;



	return (
		<>
			<CreatorsContext.Provider
				value={{ creators, loggedInCreator, loggedInCreatorContentful }}
			>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/account/:code/*" element={<Account />} />
						<Route path="/register/:code" element={<Register />} />
						<Route path="/post/:code" element={<Post />} />
						<Route path="/profile/:code" element={<Profile />} />
						<Route path="/about/" element={<About />} />
						<Route path="/invite/" element={<Invite />} />
					</Routes>

					<Footer />
				</BrowserRouter>
			</CreatorsContext.Provider>
		</>
	);
}

export default App;
