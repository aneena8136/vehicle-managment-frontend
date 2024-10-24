import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import styles from './BillPage.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// GraphQL query to fetch booking details by ID
const GET_BOOKING = gql`
  query GetBooking($id: ID!) {
    getBookingById(id: $id) {
      vehicle {
        name
        manufacturer
        model
        fuelType
        gearType
        price
      }
      pickupLocation
      dropoffLocation
      pickupTime
      dropoffTime
      totalPrice
      status
    }
  }
`;

const BillPage = () => {
  const router = useRouter();
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    const storedBookingId = localStorage.getItem('bookingId');
    if (storedBookingId) {
      setBookingId(storedBookingId);
    } else {
      alert('No booking ID found. Redirecting to home page.');
      router.push('/');
    }
  }, [router]);

  const { loading, error, data } = useQuery(GET_BOOKING, {
    variables: { id: bookingId ? parseInt(bookingId, 10) : null },
    skip: !bookingId,
  });

  const downloadPDF = async () => {
    const input = document.getElementById('bill-details'); // Get the element to be converted
    if (input) {
      const canvas = await html2canvas(input); // Create a canvas from the element
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to image data
      const pdf = new jsPDF();
      const imgWidth = 190; // Set desired width for the image
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image to PDF, handling page breaks if needed
      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight; // Move down for the next page
        if (heightLeft >= 0) {
          pdf.addPage(); // Add a new page if content overflows
        }
      }

      pdf.save('booking-confirmation.pdf'); // Save the PDF
    }
  };

  if (loading) return <p>Loading booking details...</p>;
  if (error) return <p>Error loading booking details: {error.message}</p>;

  const booking = data?.getBookingById;

  if (!booking) {
    return <p>No booking found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking Confirmation</h1>

      <div id="bill-details" className={styles.details}>
        <p><strong>Vehicle Name:</strong> {booking.vehicle.name}</p>
        <p><strong>Manufacturer:</strong> {booking.vehicle.manufacturer}</p>
        <p><strong>Model:</strong> {booking.vehicle.model}</p>
        <p><strong>Fuel Type:</strong> {booking.vehicle.fuelType}</p>
        <p><strong>Gear Type:</strong> {booking.vehicle.gearType}</p>
        <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
        <p><strong>Dropoff Location:</strong> {booking.dropoffLocation}</p>
        <p><strong>Pickup Time:</strong> {new Date(booking.pickupTime).toLocaleString()}</p>
        <p><strong>Dropoff Time:</strong> {new Date(booking.dropoffTime).toLocaleString()}</p>
        <p><strong>Total Price (Rs):</strong> {booking.totalPrice}</p>
       
      </div>

      <button className={styles.button} onClick={() => router.push('/')}>Go Back to Home</button>
      <button className={styles.button} onClick={downloadPDF}>Download Bill as PDF</button> {/* Add download button */}
    </div>
  );
};

export default BillPage;
