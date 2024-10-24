import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import styles from './CarDashboard.module.css';
import { useRouter } from 'next/navigation';
import CustomCarousel from '../CustomCarousel';
import client from '../../../../lib/typesenseClient';
import { CiSearch } from "react-icons/ci";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdEventSeat } from "react-icons/md";
import { GiGearStick } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";

const GET_ALL_VEHICLES = gql`
  query GetAllVehicles {
    getAllVehicles {
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

const CarDashboard = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_ALL_VEHICLES, {
    onError: (error) => {
      console.error('Apollo error:', error);
    },
  });

  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const searchParameters = {
          q: searchQuery,
          query_by: 'name,manufacturer,model',
        };

        const searchResponse = await client.collections('vehicles').documents().search(searchParameters);
        setSearchResults(searchResponse.hits.map(hit => hit.document));
      } catch (error) {
        console.error('Error searching vehicles:', error);
      }
    };

    const timeoutId = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <p>Error loading vehicles. Please check the console for more details.</p>
        <p>Error message: {error.message}</p>
      </div>
    );
  }

  const vehicles = data?.getAllVehicles || [];
  const displayedVehicles = searchResults.length > 0 ? searchResults : vehicles;

  const filteredVehicles = displayedVehicles.filter(vehicle => {
    const matchesFuelType = filter === 'All' || vehicle.fuelType === filter;
    return matchesFuelType;
  });

  const sortedVehicles = filteredVehicles.sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  if (sortedVehicles.length === 0) {
    return <p className={styles.noVehicle}>No vehicles found. The database might be empty.</p>;
  }

  return (
    <div className={styles.container} id="pick__section">
      <h1 className={styles.title}>Vehicle Dashboard</h1>

      <div className={styles.filterContainer}>
        {/* Search Box with Icon */}
        <div className={styles.searchContainer}>
          <CiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBox}
          />
        </div>

        {/* Fuel Type Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterBox}
        >
          <option value="All">All Fuel Types</option>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
          <option value="EV">Electric</option>
          <option value="CNG">CNG</option>
        </select>

        {/* Price Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.sortBox}
        >
          <option value="none">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className={styles.cardContainer}>
        {sortedVehicles.map((vehicle:any) => (
          <div key={vehicle.id} className={styles.card}>
             <h2 className={styles.cardTitle}>{vehicle.name}</h2>
            <CustomCarousel images={[vehicle.primaryImage, vehicle.secondaryImage,  ...(Array.isArray(vehicle.otherImages) ? vehicle.otherImages : []) ]} />
     
            {/* Model and Fuel Type in the same row */}
            <div className={styles.detailsRow}>
              <div className={styles.detailItem}>
                <GiSteeringWheel /> {vehicle.model}
              </div>
              <div className={styles.detailItem}>
                <BsFillFuelPumpFill /> {vehicle.fuelType}
              </div>
            </div>
            {/* Gear Type and Seats in the same row */}
  <div className={styles.detailsRow}>
    <div className={styles.detailItem}>
      <GiGearStick /> {vehicle.gearType}
    </div>
    <div className={styles.detailItem}>
      <MdEventSeat /> {vehicle.seats} people
    </div>
  </div>
  <div className={styles.price}>
    <FaRupeeSign /> {vehicle.price}/ day
  </div>

            <div className={styles.buttonContainer}>
              <button
                className={styles.bookNowButton}
                onClick={() => router.push(`/book-vehicle/${vehicle.id}`)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDashboard;
