import { Products } from '@stytch/vanilla-js';
import { OTPMethods } from '@stytch/vanilla-js';
import { StytchLogin } from '@stytch/react';

const config = {
  products: [
    Products.otp,
  ],
  otpOptions: {
    methods: [OTPMethods.SMS],
    expirationMinutes: 10,
  }
};

const Login = () => {
  return (
    <StytchLogin config={config} />
  );
};

export default Login;