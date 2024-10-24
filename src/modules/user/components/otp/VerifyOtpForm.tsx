// components/VerifyOtpForm.js
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import styles from './VerifyOtpForm.module.css'

const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($phoneNumber: String!, $otp: String!) {
    verifyOTP(phoneNumber: $phoneNumber, otp: $otp)
  }
`;

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [verifyOTP] = useMutation(VERIFY_OTP_MUTATION);


  const phoneNumber = typeof window !== 'undefined' ? localStorage.getItem('phoneNumber') : null;

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyOTP({
        variables: { phoneNumber, otp },
      });

      if (data.verifyOTP) {
        setMessage('OTP verified successfully!');
        router.push('/login');
      } else {
        setMessage('Invalid OTP or OTP expired');
      }
    } catch (err) {
      setMessage('Error verifying OTP');
    }
  };

  useEffect(() => {
    if (!phoneNumber) {
      setMessage('No phone number found. Please request an OTP first.');
    }
  }, [phoneNumber]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verify OTP</h2>
      {phoneNumber ? (
        <form onSubmit={handleVerifyOTP} className={styles.form}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Verify OTP</button>
        </form>
      ) : (
        <p className={styles.message}>{message}</p>
      )}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default VerifyOtpForm;
