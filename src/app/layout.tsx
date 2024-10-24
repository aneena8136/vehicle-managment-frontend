"use client";  // Mark this file as a Client Component

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/modules/user/components/navbar/Navbar";
import Footer from "@/modules/user/components/footer/Footer";
import { usePathname } from "next/navigation";  // Import usePathname

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();  // Get the current path

  // Define routes where you don't want the Navbar and Footer
  const hideNavbarFooter = pathname === "/login" || pathname === "/register" || pathname==="/send-otp" || pathname==="/verify-otp";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Conditionally render the Navbar */}
        {!hideNavbarFooter && <Navbar />}
        
        {children}

        {/* Conditionally render the Footer */}
        {!hideNavbarFooter && <Footer />}
      </body>
    </html>
  );
}
