'use client';

import React, { useState } from "react";
import styles from "./Faq.module.css"; // Import CSS module for scoped styling
import { AiFillCaretDown } from "react-icons/ai";

function Faq() {
    const [activeQ, setActiveQ] = useState<string | null>(null);

    const toggleQuestion = (id: string) => {
        setActiveQ(activeQ === id ? null : id);
    };

    return (
        <div className={styles.faqSection}>
            <div className={styles.container}>
                <div className={styles.faqContent}>
                    <div className={styles.faqTitle}>
                        <h5>FAQ</h5>
                        <h2>Frequently Asked Questions</h2>
                        <p>
                            Frequently Asked Questions About the Car Rental Booking Process
                            on Our Website: Answers to Common Concerns and Inquiries.
                        </p>

                    </div>

                    <div className={styles.allQuestions}>
                        <div className={styles.faqBox}>
                            <div
                                id="q1"
                                onClick={() => toggleQuestion("q1")}
                                className={`${styles.faqQuestion} ${activeQ === "q1" ? styles.activeQuestion : ""
                                    }`}
                            >
                                <p>1. What is special about comparing rental car deals? </p>
                                <AiFillCaretDown />

                            </div>
                            <div
                                className={`${styles.faqAnswer} ${activeQ === "q1" ? styles.activeAnswer : ""
                                    }`}
                            >
                                <p>
                                    Comparing rental car deals is important as it helps find the
                                    best deal that fits your budget and requirements, ensuring you
                                    get the most value for your money. By comparing various
                                    options, you can find deals that offer lower prices,
                                    additional services, or better car models. You can find car
                                    rental deals by researching online and comparing prices from
                                    different rental companies.
                                </p>
                                
                            </div>
                            
                        </div>

                        <div className={styles.faqBox}>
                            <div
                                id="q2"
                                onClick={() => toggleQuestion("q2")}
                                className={`${styles.faqQuestion} ${activeQ === "q2" ? styles.activeQuestion : ""
                                    }`}
                            >
                                <p>2. How do I find the car rental deals?</p>
                                <AiFillCaretDown />

                            </div>
                            <div
                                className={`${styles.faqAnswer} ${activeQ === "q2" ? styles.activeAnswer : ""
                                    }`}
                            >
                                <p>
                                    You can find car rental deals by researching online and
                                    comparing prices from different rental companies. Websites
                                    such as Expedia, Kayak, and Travelocity allow you to compare
                                    prices and view available rental options. It is also
                                    recommended to sign up for email newsletters and follow rental
                                    car companies on social media to be informed of any special
                                    deals or promotions.
                                </p>
                            </div>
                        </div>

                        <div className={styles.faqBox}>
                            <div
                                id="q3"
                                onClick={() => toggleQuestion("q3")}
                                className={`${styles.faqQuestion} ${activeQ === "q3" ? styles.activeQuestion : ""
                                    }`}
                            >
                                <p>3. How do I find such low rental car prices?</p>
                                <AiFillCaretDown />

                            </div>
                            <div
                                className={`${styles.faqAnswer} ${activeQ === "q3" ? styles.activeAnswer : ""
                                    }`}
                            >
                                <p>
                                    Book in advance: Booking your rental car ahead of time can
                                    often result in lower prices. Compare prices from multiple
                                    companies: Use websites like Kayak, Expedia, or Travelocity to
                                    compare prices from multiple rental car companies. Look for
                                    discount codes and coupons: Search for discount codes and
                                    coupons that you can use to lower the rental price. Renting
                                    from an off-airport location can sometimes result in lower
                                    prices.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;
