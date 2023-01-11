import { useStytch } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';

const Profile: React.FC = () => {
	const stytchClient = useStytch
    const stytch = new StytchUIClient(
        "public-token-test-736493f4-1ae4-437e-b06b-d7a20bda9083"
    );

    const handleLogout = () => {
        stytch.session.revoke();
    }

    return (
        <>
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
}
 
export default Profile;