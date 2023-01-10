import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/account/:code" element={<Account />} />
					</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
