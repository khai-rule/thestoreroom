import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";

const Homepage: React.FC = () => {
    const navigate = useNavigate();

    const user = useContext(AuthContext);

    const secret = () => {
        if (user) {
            return (
                <h2>Show this only if logged in</h2>
            )
        } else return
    }


    return (
        <>
            <h1>Home</h1>
            {secret()}
        </>
    );
}
export default Homepage;