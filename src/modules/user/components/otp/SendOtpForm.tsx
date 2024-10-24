// components/SendOtpForm.js
"use client"
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styles from './SendOtpForm.module.css';
import  { useRouter } from 'next/navigation';
const SEND_OTP_MUTATION = gql`
  mutation SendOTP($phoneNumber: String!) {
    sendOTP(phoneNumber: $phoneNumber)
  }
`;

const SendOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sendOTP] = useMutation(SEND_OTP_MUTATION);
  const router = useRouter();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
        const { data } = await sendOTP({
            variables: { phoneNumber },
      });
      if (data.sendOTP) {
        setMessage('OTP sent successfully!');
        // Store phone number in localStorage
        localStorage.setItem('phoneNumber', phoneNumber);
        router.push('/verify-otp');
 
      } else {
        setMessage('Failed to send OTP');
      }
    } catch (err) {
      setMessage('Error sending OTP');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Send OTP</h2>
      <form onSubmit={handleSendOTP} className={styles.form}>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Send OTP</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default SendOtpForm;
