import { useStytch } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const navigate = useNavigate();
	const stytchClient = useStytch
    const stytch = new StytchUIClient(
        "public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
    );

    const handleLogout = () => {
        stytch.session.revoke();
        navigate("/")
    }

    return (
        <>
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
}
 
export default Profile;