import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Elements/Navbar';
import { useLocation } from "react-router-dom";

const ReservationsList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        // Fetch reservations from the backend
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                console.log(token);
                const response = await axios.get('http://localhost:5000/api/reservations', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
                setReservations(response.data);
            } catch (err) {
                setError('Error fetching reservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
        <Navbar email={email} />
          <div className="reservations-container p-5 bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Reservations</h2>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
              <tr className="bg-blue-500 text-white text-center">
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">Place</th>
                <th className="py-3 px-4 border-b text-left">Date</th>
                <th className="py-3 px-4 border-b text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id} className="hover:bg-blue-100">
                  <td className="py-2 px-4 border-b">{reservation.username}</td>
                  <td className="py-2 px-4 border-b">{reservation.location}</td>
                  <td className="py-2 px-4 border-b">{reservation.date}</td>
                  <td className="py-2 px-4 border-b">{reservation.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

    );
};

export default ReservationsList;
