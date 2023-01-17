import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";
import * as dotenv from 'dotenv' 
// dotenv.config()


const stytch = new StytchUIClient(
	// process.env.STYTCH_PUBLIC_TOKEN as string 
	"public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StytchProvider stytch={stytch}>
			<App />
		</StytchProvider>
	</React.StrictMode>
);
