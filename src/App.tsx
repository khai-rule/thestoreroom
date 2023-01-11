import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext<string>(undefined!);

function App() {
	const checkAuth = () => {
		const sessions = JSON.parse(
			localStorage.getItem(
				"stytch_sdk_state_public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
			) || "false"
		);
		if (sessions) {
			const user = sessions?.user;
			console.log("Logged In", user);
			return user;
		} else return "Not Logged In";
	};

	return (
		<>
			<AuthContext.Provider value={checkAuth()}>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/account/:code/*" element={<Account />} />
					</Routes>
				</BrowserRouter>
			</AuthContext.Provider>
		</>
	);
}

export default App;
