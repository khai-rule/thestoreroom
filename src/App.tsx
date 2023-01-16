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

interface LoginDataContext {
	loginData: object;
	setLoginData: (updatedLoginData: object) => void;
}

export const LoginDataContext = createContext<LoginDataContext | any>(
	undefined
);

// interface ICreator{

// }

function App() {
	const [loginData, setLoginData] = useState<object>({});
	const [creators, setCreators] = useState([] as any);

	const { getCreators } = useContentful();

	useEffect(() => {
		getCreators().then((response) => {
			setCreators(response);
		});
	}, []);

	return (
		<>
			<LoginDataContext.Provider value={{ loginData, setLoginData, creators }}>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route
							path="/account/:code/*"
							element={<Account handleUpdateLoginData={setLoginData} />}
						/>
						<Route path="/register/:code" element={<Register />} />
					</Routes>
				</BrowserRouter>
			</LoginDataContext.Provider>
		</>
	);
}

export default App;
