import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { createContext } from "react";
import Register from "./pages/Register";
import useContentful from "./useContentful";
import { useEffect } from "react";
import { useStytchUser } from "@stytch/react";
import Loading from "./components/Loading";
import Post from "./pages/Post";

export const CreatorsContext = createContext<any>(undefined);

function App() {
	const { user } = useStytchUser();

	const [creators, setCreators] = useState([] as any);
	const [loggedInCreator, setLoggedInCreator] = useState({} as any);
	const [status, setStatus] = useState("idle");
	const [post, setPost] = useState()

	const { getCreators, getPosts } = useContentful();

	useEffect(() => {
		getCreators().then((response) => {
			setCreators(response);
			setLoggedInCreator(user);
			setStatus("done");
		});
		setStatus("loading");
	}, [loggedInCreator]);



	if (status === "loading") return <Loading />;

	return (
		<>
			<CreatorsContext.Provider value={{ creators, loggedInCreator }}>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/account/:code/*" element={<Account />} />
						<Route path="/register/:code" element={<Register />} />
						<Route path="/post/:code" element={<Post />} />
					</Routes>
				</BrowserRouter>
			</CreatorsContext.Provider>
		</>
	);
}

export default App;
