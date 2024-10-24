"use client";

import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styles from './VehicleDetails.module.css';

const GET_VEHICLE_BY_ID = gql`
  query GetVehicleById($id: ID!) {
    getVehicleById(id: $id) {
      id
      name
      description
      price
      primaryImage
      secondaryImage
      availableQty
    }
  }
`;

const VehicleDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;  // Ensure you're passing params correctly

  console.log("Vehicle ID:", id);  // Debugging to check if ID is being passed

  const { loading, error, data } = useQuery(GET_VEHICLE_BY_ID, {
    variables: { id },
    skip: !id,  // Skip the query if no ID is provided
  });

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <p>Error loading vehicle details. Please check the console for more details.</p>
        <p>Error message: {error.message}</p>
      </div>
    );
  }

  const vehicle = data?.getVehicleById;

  if (!vehicle) {
    return <p>Vehicle not found.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {vehicle.primaryImage && (
            <img
              src={vehicle.primaryImage}
              alt={`Primary image of ${vehicle.name}`}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.imageWrapper}>
          {vehicle.secondaryImage && (
            <img
              src={vehicle.secondaryImage}
              alt={`Secondary image of ${vehicle.name}`}
              className={styles.image}
            />
          )}
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <h1>{vehicle.name}</h1>
        <p>{vehicle.description}</p>
        <p>Available Quantity: {vehicle.availableQty}</p>
        <button className={styles.payButton}>Pay Rs {vehicle.price}</button>
      </div>
    </div>
  );
};

export default VehicleDetails;
