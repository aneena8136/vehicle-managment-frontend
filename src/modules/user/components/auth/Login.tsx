"use client";

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from "./login.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";
import Swal from 'sweetalert2';

const LOGIN_CUSTOMER = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
      token
      customer {
        id
        name
        email
        phone
        city
        state
        country
        pincode
        profilePicture
      }
    }
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginCustomer, { loading, error }] = useMutation(LOGIN_CUSTOMER);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginCustomer({ variables: { email, password } });
      
      if (data && data.loginCustomer && data.loginCustomer.token) {
        localStorage.setItem('user', JSON.stringify(data.loginCustomer.customer));
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('loginStateChanged'));
        router.push('/dashboard');
      } else {
        console.error('Login successful but no token received');
      }
    } catch (err) {
      console.error('Error logging in', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Logo Image */}
        <div className={styles.logoContainer}>
        <Image src={logo} alt='logo' width={150} height={50} className={styles.logo}/>
        </div>

        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && (
            <p className={styles.error}>
              Error logging in: {error.message}
            </p>
          )}
        </form>
        <p className={styles.registerPrompt}>
          If you're a new user, <Link href="/register" className={styles.registerLink}>register here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
