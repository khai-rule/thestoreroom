import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

interface LoginDataContext {
    loginData: object;
    setLoginData: (updatedLoginData: object) => void;
}

export const LoginDataContext = createContext<LoginDataContext | any>(undefined);

function App() {
	const [loginData, setLoginData] = useState<object>({});


	return (
		<>
			<LoginDataContext.Provider value={{ loginData, setLoginData }}>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/account/:code/*" element={<Account handleUpdateLoginData={setLoginData} />} />
					</Routes>
				</BrowserRouter>
			</LoginDataContext.Provider>
		</>
	);
}

export default App;
