import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";
import { StytchHeadlessClient } from "@stytch/vanilla-js/headless";
import { StytchProvider } from "@stytch/stytch-react";

function App() {

  const STYTCH_PUBLIC_TOKEN = "public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
  const stytch = new StytchHeadlessClient(STYTCH_PUBLIC_TOKEN);

  console.log(stytch)

	return (
		<>
			<BrowserRouter>
				<Navbar />

				<StytchProvider stytch={stytch}>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/account/:code/*" element={<Account />} />
					</Routes>
				</StytchProvider>

			</BrowserRouter>
		</>
	);
}

export default App;
