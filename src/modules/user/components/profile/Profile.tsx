"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import styles from "./ProfilePage.module.css";
import Swal from "sweetalert2";

const UPDATE_PROFILE = gql`
  mutation updateCustomer($id: ID!, $input: UpdateCustomerInput!, $profileImageFile: Upload) {
    updateCustomer(id: $id, input: $input, profileImageFile: $profileImageFile) {
      id
      name
      email
      phone
      city
      state
      country
      pincode
      profilePicture
    }
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  profilePicture?: string;
}

interface UpdateCustomerInput {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [updateProfile] = useMutation<{ updateCustomer: User }>(UPDATE_PROFILE);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  
  // State variables for input fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phone);
      setCity(userData.city);
      setState(userData.state);
      setCountry(userData.country);
      setPincode(userData.pincode);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const input: UpdateCustomerInput = {
      name,
      email,
      phone,
      city,
      state,
      country,
      pincode,
    };

    try {
      const { data } = await updateProfile({
        variables: { 
          id: user.id, 
          input, 
          profileImageFile: profileImage
        }
      });

      if (data && data.updateCustomer) {
        setUser(data.updateCustomer);
        localStorage.setItem("user", JSON.stringify(data.updateCustomer));
        Swal.fire("Profile Updated Succesfully");

      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error Updating Profile! Please try again ");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.imagePreview}>
        {user?.profilePicture && (
          <img src={user.profilePicture} alt="Profile" />
        )}
      </div>
      <div className={styles.profileDetails}>
        <h1>Profile Page</h1>
        {user && (
          <form onSubmit={handleSubmit} className={styles.profileForm}>
            <div className={styles.field}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className={styles.submitButton}>Update Profile</button>
          </form>
        )}
      </div>
    </div>
  );
  
};

export default ProfilePage;
