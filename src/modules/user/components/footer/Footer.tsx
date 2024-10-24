import React from "react";
import Link from "next/link";
import styles from './Footer.module.css'; // Import CSS Module

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <ul className={styles.footerContent1}>
              <li className={styles.logo}>
                <span>CAR</span> Rental
              </li>
              <li className={styles.description}>
                We offer a big range of vehicles for all your driving needs. We
                have the perfect car to meet your needs.
              </li>
              <li>
                <a href="tel:123456789">
                  &nbsp; (123) -456-789
                </a>
              </li>
              <li>
                <a href="mailto:carrental@gmail.com">
                  &nbsp; carrental@gmail.com
                </a>
              </li>
            </ul>
            <ul className={styles.footerContent2}>
              <li>Company</li>
              <li><Link href="#home">New York</Link></li>
              <li><Link href="#home">Careers</Link></li>
              <li><Link href="#home">Mobile</Link></li>
              <li><Link href="#home">Blog</Link></li>
              <li><Link href="#home">How we work</Link></li>
            </ul>
            <ul className={styles.footerContent2}>
              <li>Working Hours</li>
              <li>Mon - Fri: 9:00AM - 9:00PM</li>
              <li>Sat: 9:00AM - 7:00PM</li>
              <li>Sun: Closed</li>
            </ul>
            <ul className={styles.footerContent2}>
              <li>Review</li>
              <li>
                <p>Please share your thoughts to help us improve our services:</p>
              </li>
              <li>
                <input type="text" placeholder="write here" className={styles.emailInput} />
              </li>
              <li>
                <button className={styles.submitEmail}>Submit</button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
