"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import styles from './Navbar.module.css';
import logo from './logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };

    checkLoginStatus();
    window.addEventListener('loginStateChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, []);

  const handleSignInClick = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    router.push('/register');
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStateChanged'));
    router.push('/');
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    router.push('/profile');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className={`${styles.navbar} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.navbar__img}>
          <Link href="/" passHref>
            <Image
              src={logo}
              alt='logo-img'
              loading='lazy'
              className='logo-navbar'
            />
          </Link>
        </div>

        <div className={styles.toggle} onClick={toggleMenu}>
          {isMenuOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>

        <ul className={`${styles.navbar__links} ${isMenuOpen ? styles.active : ''}`}>
          <li><Link href="/" className={styles.home_link}>Home</Link></li>
          <li><Link href="#about" className={styles.about_link}>About</Link></li>
          <li><Link href="/cars" className={styles.models_link}>Vehicle Models</Link></li>
          
          {/* Move buttons inside the toggle menu */}
          {isLoggedIn ? (
            <>
              <li>
                <a className={styles.navbar__buttons__sign_in} href="" onClick={handleProfileClick}>
                  <CgProfile size={30} />
                  
                </a>
              </li>
              <li>
                <a className={styles.navbar__buttons__register} href="/" onClick={handleLogoutClick}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a className={styles.navbar__buttons__sign_in} href="" onClick={handleSignInClick}>
                  Sign In
                </a>
              </li>
              <li>
                <a className={styles.navbar__buttons__register} href="/" onClick={handleRegisterClick}>
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
        
        <div className={styles.navbar__buttons}>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
