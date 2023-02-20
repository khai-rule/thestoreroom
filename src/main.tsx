import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";
import { createStore, compose } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const stytch = new StytchUIClient(
	// process.env.STYTCH_PUBLIC_TOKEN as string
	"public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(allReducers, enhancer);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StytchProvider stytch={stytch}>
			<Provider store={store}>
				<App />
			</Provider>
		</StytchProvider>
	</React.StrictMode>
);
