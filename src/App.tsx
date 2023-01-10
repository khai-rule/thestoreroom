import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from './pages/Home';


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/account/:code" element={<Account />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
