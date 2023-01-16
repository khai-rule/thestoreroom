import { useEffect } from "react";
import { useCallback } from "react";

import { useStytchSession } from "@stytch/react";

const Homepage: React.FC = () => {
	const { session } = useStytchSession();

	useEffect(() => {
		if (!session) {
		}
	}, [session]);

	const secret = useCallback(() => {
		if (session) {
			return <h2>Show this only if logged in</h2>;
		}
	}, [session]);


	return (
		<>
			<h1>Home</h1>
			{secret()}
		</>
	);
};
export default Homepage;
