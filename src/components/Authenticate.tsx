import React, { MouseEventHandler, useCallback, useState } from 'react';
import { useStytch } from '@stytch/react';

export const Authenticate: React.FC = () => {
  const stytchClient = useStytch();
  const [code, setCode] = useState('');
  
  const method_id = "phone-number-test-d5a3b680-e8a3-40c0-b815-ab79986666d0"
  // returned from calling loginOrCreate for OTPs on SMS, WhatsApp or Email

  const authenticate = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    stytchClient.otps.authenticate(code, method_id, {
      session_duration_minutes: 60,
    });
  }, [stytchClient, code]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }, []);

  return (
    <form>
      <label htmlFor="otp-input">Enter code</label>
      <input
        id="otp-input"
        autoComplete="one-time-code"
        type="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
      />
      <button onClick={authenticate} type="submit">
        Submit
      </button>
    </form>
  );
};