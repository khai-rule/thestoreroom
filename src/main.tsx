import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";


const stytch = new StytchUIClient(
	process.env.STYTCH_PUBLIC_TOKEN as string
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StytchProvider stytch={stytch}>
			<App />
		</StytchProvider>
	</React.StrictMode>
);
