'use client'; // Ensures this component is rendered on the client side in Next.js

import SelectCar from "@/public/icon1.svg" // Assuming the SVGs are placed in the 'public' folder
import Contact from "@/public/icon2.svg"; // Adjust paths accordingly
import Drive from "@/public/icon3.svg"; // Adjust paths accordingly
import Image from "next/image";
import styles from "./PlanTrip.module.css"; // Use CSS Modules for styling

function PlanTrip() {
  return (
    <>
      <section className={styles.planSection} id="about">
        <div className={styles.container}>
          <div className={styles.planContainer}>
            <div className={styles.planContainerTitle}>
              <h3>Plan your trip now</h3>
              <h2>Quick &amp; easy car rental</h2>
            </div>

            <div className={styles.planContainerBoxes}>
              <div className={styles.planBox}>
                <Image src={SelectCar} alt="Select Car Icon" loading="lazy" />
                <h3>Select Car</h3>
                <p>
                  We offer a big range of vehicles for all your driving needs.
                  We have the perfect car to meet your needs.
                </p>
              </div>

              <div className={styles.planBox}>
                <Image src={Contact} alt="Contact Operator Icon" loading="lazy" />
                <h3>Contact Operator</h3>
                <p>
                  Our knowledgeable and friendly operators are always ready to
                  help with any questions or concerns.
                </p>
              </div>

              <div className={styles.planBox}>
                <Image src={Drive} alt="Let's Drive Icon" loading="lazy" />
                <h3>Let's Drive</h3>
                <p>
                  Whether you're hitting the open road, we've got you covered
                  with our wide range of cars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;
