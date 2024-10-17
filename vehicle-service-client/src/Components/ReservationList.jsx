import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationsList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <h2>Reservations</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Status</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation._id}>
                            <td>{reservation._id}</td>
                            <td>{reservation.username}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.status}</td>
                            {/* Add more fields as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsList;
