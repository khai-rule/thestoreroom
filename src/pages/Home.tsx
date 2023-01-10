import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
    const navigate = useNavigate();


    return (
        <>
            <h1>Home</h1>
            <h2>Show this only if logged in</h2>
        </>
    );
}
export default Homepage;