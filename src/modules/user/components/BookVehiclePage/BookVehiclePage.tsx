import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import styles from './BookVehiclePage.module.css';
import CustomCarousel from './../CustomCarousel';
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdEventSeat } from "react-icons/md";
import { GiGearStick } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";


// GraphQL query to fetch vehicle details by ID
const GET_VEHICLE = gql`
  query GetVehicle($id: ID!) {
    getVehicleById(id: $id) {
      id
      name
      manufacturer
      model
      fuelType
      gearType
      seats
      price
      primaryImage
      secondaryImage
      otherImages
      availableQty
    }
  }
`;

// GraphQL mutation to book the vehicle
const BOOK_VEHICLE = gql`
  mutation CreateBooking(
    $vehicleId: Int!
    $pickupLocation: PickupLocation!
    $dropoffLocation: DropoffLocation!
    $pickupTime: DateTime!
    $dropoffTime: DateTime!
    $status: BookingStatus!
  ) {
    createBooking(
      vehicleId: $vehicleId
      pickupLocation: $pickupLocation
      dropoffLocation: $dropoffLocation
      pickupTime: $pickupTime
      dropoffTime: $dropoffTime
      status: $status
    ) {
      id
      vehicleId
      pickupLocation
      dropoffLocation
      pickupTime
      dropoffTime
      status
      totalPrice
    }
  }
`;

// GraphQL mutation to create Razorpay order
const CREATE_RAZORPAY_ORDER = gql`
  mutation CreateRazorpayOrder($bookingId: ID!) {
    createRazorpayOrder(bookingId: $bookingId) {
      id
      amount
      currency
      receipt
    }
  }
`;

const locationOptions = [
  { value: 'KOCHI', label: 'Kochi' },
  { value: 'THRISSUR', label: 'Thrissur' },
  { value: 'ANGAMALY', label: 'Angamaly' },
];

const BookVehiclePage = ({ id }) => {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [bookingId,setBookingId]=useState(null)

  const { loading, error, data } = useQuery(GET_VEHICLE, {
    variables: { id },
  });

  const [createBooking, { loading: bookingLoading, error: bookingError }] = useMutation(BOOK_VEHICLE, {
    onCompleted: (data) => {
      console.log('Booking completed:', data);
      setTotalPrice(data.createBooking.totalPrice);
      setBookingId(data.createBooking.id);
      localStorage.setItem('bookingId', data.createBooking.id); // Set bookingId in localStorage here
      console.log('booking id is ',data.createBooking.id);
    setIsBookingConfirmed(true);
      alert("Vehicle available for booking. Proceed to payment.");
    },
    onError: (error) => {
      console.error('Booking error:', error);
      alert(`Failed to book vehicle: ${error.message}`);
    },
  });
 
  const [createOrder, { loading: orderLoading, error: orderError }] = useMutation(CREATE_RAZORPAY_ORDER, {
    onCompleted: (data) => {
      const { id, amount, currency } = data.createRazorpayOrder;

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Vehicle Booking',
        description: `Booking for vehicle ${id}`,
        order_id: id,
        handler: function (response:any) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          router.push('/billpage')
          // Optionally: Redirect to a success page or update booking status in your backend
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "1234567890",
        },
        theme: {
          color: '#FF4D30',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    },
    onError: (error) => {
      console.error('Error creating Razorpay order:', error);
      alert(`Failed to create Razorpay order: ${error.message}`);
    },
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) return <p>Loading vehicle details...</p>;
  if (error) return <p>Error loading vehicle details: {error.message}</p>;

  const vehicle = data?.getVehicleById;

  if (!vehicle) {
    return <p>No vehicle found with the given ID.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const customerId = user ? parseInt(user.id, 10) : null;

    if (!customerId) {
      alert("You need to log in to book a vehicle.");
      return;
    }

    const bookingVariables = {
      vehicleId: parseInt(vehicle.id, 10),
      pickupLocation,
      dropoffLocation,
      pickupTime: new Date(pickupTime).toISOString(),
      dropoffTime: new Date(dropoffTime).toISOString(),
      status: 'PENDING',
    };

    try {
      await createBooking({ variables: bookingVariables });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  const handleCreateOrder = () => {
    if (!bookingId) {
      alert("Booking ID is missing. Please try booking again.");
      return;
    }

    createOrder({
      variables: {
        bookingId: bookingId,
      },
    });
  };

  return (
    <div className={styles.centerWrapper}>
    <div className={styles.contentContainer}>
      {/* Left side: Vehicle card with image and details */}
      <div className={styles.vehicleCard}>
        <p className={styles.title}><strong>{vehicle.name}</strong></p>
        <CustomCarousel images={[vehicle.primaryImage, vehicle.secondaryImage,...vehicle.otherImages]} />
        <div className={styles.details}>
          <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
          <p><strong><GiSteeringWheel /> Model:</strong> {vehicle.model}</p>
          <p><strong><BsFillFuelPumpFill /> Fuel Type:</strong> {vehicle.fuelType}</p>
          <p><strong><GiGearStick /> Gear Type:</strong> {vehicle.gearType}</p>
          <p><strong><MdEventSeat /> Seats:</strong> {vehicle.seats}</p>
          <p className={styles.price}><strong><FaRupeeSign /></strong> {vehicle.price}</p>
        </div>
      </div>
  
      {/* Right side: Booking section */}
      <div className={styles.bookingSection}>
        <h2>Book This Car</h2>
        <form onSubmit={handleSubmit} className={styles.bookingForm}>
          <div className={styles.formGroup}>
            <label htmlFor="pickupLocation">Pickup Location:</label>
            <select
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            >
              <option value="">Select Pickup Location</option>
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="dropoffLocation">Dropoff Location:</label>
            <select
              id="dropoffLocation"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              required
            >
              <option value="">Select Dropoff Location</option>
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="pickupTime">Pickup Time:</label>
            <input
              type="datetime-local"
              id="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
            />
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="dropoffTime">Dropoff Time:</label>
            <input
              type="datetime-local"
              id="dropoffTime"
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
              required
            />
          </div>
  
          <button type="submit" className={styles.submitButton}>
            {bookingLoading ? 'Booking...' : 'Book Vehicle'}
          </button>
        </form>
  
        {isBookingConfirmed && (
          <button onClick={handleCreateOrder} className={styles.paymentButton}>
            {orderLoading ? 'Processing Payment...' : `Proceed to Payment ${totalPrice}`}
          </button>
        )}
  
        {bookingError && <p className={styles.error}>Error: {bookingError.message}</p>}
        {orderError && <p className={styles.error}>Error: {orderError.message}</p>}
      </div>
    </div>
    </div>
  );
  
};

export default BookVehiclePage;
