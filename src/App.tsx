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

export const LoginDataContext = createContext<any>(undefined);

function App() {
	const [creators, setCreators] = useState([] as any);

	const { getCreators } = useContentful();

	useEffect(() => {
		getCreators().then((response) => {
			setCreators(response);
		});
	}, []);

	return (
		<>
			<LoginDataContext.Provider value={{ creators }}>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/account/:code/*" element={<Account />} />
						<Route path="/register/:code" element={<Register />} />
					</Routes>
				</BrowserRouter>
			</LoginDataContext.Provider>
		</>
	);
}

export default App;
