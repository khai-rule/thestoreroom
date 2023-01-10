import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/account/login")
    }

    return (
        <>
            <button onClick={handleClick}>Login</button>
            <h2>Show this only if logged in</h2>
        </>
    );
}
export default Homepage;