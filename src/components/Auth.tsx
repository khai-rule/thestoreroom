import { useNavigate, useSearchParams } from "react-router-dom";
import { useStytch, useStytchSession } from "@stytch/react";
import { useEffect } from 'react';

const Auth:React.FC = () => {

    const [params] = useSearchParams();
    const token = params.get("token")

    const stytch = useStytch();
    const session = useStytchSession();

    const navigate = useNavigate();

    useEffect(() => {
        if (session) navigate("/account/profile");

        if (token && !session) {
            stytch.magicLinks.authenticate(token, {
                session_duration_minutes: 60
            })
        }
    }, [stytch, session])

    return (
        <>
        <p>Auth user ...</p>
        </>
    );
}
 
export default Auth;