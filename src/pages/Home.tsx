import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const Homepage: React.FC = () => {
	const navigate = useNavigate();

	const user = useContext(AuthContext);

    useEffect(() => {
        if (user === null) {
          console.log("home logged out")
        } else {
            console.log("home logged in")
        }
      }, [user]);

	  console.log("alabama", user === null)

	const secret = useCallback(() => {
		if (user !== null) {
			return <h2>Show this only if logged in</h2>;
		}
	}, [user]);

	return (
		<>
			<h1>Home</h1>
			{secret()}
		</>
	);
};
export default Homepage;
