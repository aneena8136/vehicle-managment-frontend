"use client"; // Ensures the component is rendered on the client side in Next.js

import { useEffect, useState, memo } from "react";
import HeroCar from './main-car.png';
import Image from "next/image";
import Brands from '@/public/Car Brands Section.svg'
import styles from "./Hero.module.css"; // Change to module CSS for better Next.js convention

function Hero() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <>
      <section id="home" className={styles.heroSection}>
        <div className={styles.container}>
          
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h4>Plan your trip now</h4>
              <h1>
                Save <span>big</span> with our car rental
              </h1>
              <p>
                Rent the car of your dreams. Unbeatable prices, unlimited miles,
                flexible pick-up options and much more.
              </p>
              <div className={styles.heroBtns}>
                <a
                
                  className={styles.bookRideBtn}
                  href="/cars"
                >
                  Book Ride &nbsp; 
                </a>
                <a className={styles.learnMoreBtn} href="/">
                  Learn More &nbsp; 
                </a>
              </div>
              
            </div>

            {/* Car Image */}
            <Image
              src={HeroCar}
              alt="Car Image"
              className={styles.heroCarImg}
              loading="lazy"
            />
          </div>
          <Image src={Brands} alt="brands" className={styles.brands}/>
        </div>

        {/* Scroll Up Button */}
        <div
          onClick={scrollToTop}
          className={`${styles.scrollUp} ${goUp ? styles.showScroll : ""}`}
        >
          
        </div>
      </section>
    </>
  );
}

export default memo(Hero);
