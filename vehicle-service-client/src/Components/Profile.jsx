import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Navbar from '../Elements/Navbar';

const Profile = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [userInfo, setUserInfo] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

    // Handle reservation deletion
    const handleDelete = async (reservationId) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/reservations/${reservationId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Update state to remove the deleted reservation
        setReservations(reservations.filter(reservation => reservation.id !== reservationId));
      } catch (err) {
        setError(err.message || 'Error deleting reservation');
      }
    };
  // Fetch user information and reservations
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await axios.post(
          `http://localhost:5000/api/auth/userdetails`,
          { email }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserInfo(userResponse.data);
  
        const reservationsResponse = await axios.post(
          `http://localhost:5000/api/reservations/reservationinfo`,
          { email }
        );
        setReservations(reservationsResponse.data);
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
  
    if (email) {
      fetchUserInfo();
    }
  }, [email,handleDelete]);

 

  // Display loading or error messages
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display user information and reservations
  return (
    
    <div>
      <Navbar email={email} />
      <div className="flex justify-center min-h-screen p-5 font-sans bg-blue-300">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">User Profile</h1>
        {userInfo && (
          <div className="border border-gray-300 p-6 rounded-lg bg-gray-100">
            <h2 className="text-xl text-gray-700 font-semibold mb-4">{userInfo.username}'s Profile</h2>
            <p className="mb-2"><strong>Email:</strong> {userInfo.email}</p>
            <p className="mb-2"><strong>Contact Number:</strong> {userInfo.contactNumber}</p>
            <p className="mb-2"><strong>Country:</strong> {userInfo.country}</p>
          </div>
        )}
        <h2 className="text-xl font-bold text-gray-800 mt-8">Your Reservations</h2>
        <ul className="list-disc pl-5 mt-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="mb-2">
              <h1>vehicleNo: {reservation.vehicleNo}, date: {reservation.date}, time: {reservation.time}, place: {reservation.location}</h1>
              <button
                onClick={() => handleDelete(reservation._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 mt-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Profile;
