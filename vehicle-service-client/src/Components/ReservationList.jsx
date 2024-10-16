// src/components/ReservationList.js
import React from 'react';
import axios from 'axios';

const ReservationList = ({ reservations, token, fetchReservations }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`, {
        headers: { Authorization: token }
      });
      fetchReservations();
    } catch (err) {
      console.error('Failed to delete reservation.');
    }
  };

  return (
    <div>
      <h2>Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Vehicle No.</th>
              <th>Mileage</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res._id}>
                <td>{new Date(res.date).toLocaleDateString()}</td>
                <td>{res.time}</td>
                <td>{res.location}</td>
                <td>{res.vehicleNo}</td>
                <td>{res.mileage}</td>
                <td>{res.message}</td>
                <td>
                  <button onClick={() => handleDelete(res._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationList;
