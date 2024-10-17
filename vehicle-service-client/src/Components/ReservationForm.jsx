// src/components/ReservationForm.js
import React, { useState, useEffect } from 'react'; // Import useEffect
import { addDays, isSunday } from 'date-fns';
import axios from 'axios';
import Navbar from '../Elements/Navbar';
import { useLocation } from "react-router-dom";
 

const ReservationForm = ({}) => {
  const location = useLocation();
  const email = location.state?.email;
  const token = localStorage.getItem("token");
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '', // Initialize username as an empty string
    date: '',
    time: '',
    location: '',
    vehicleNo: '',
    mileage: '',
    message: ''
  });

  useEffect(() => {
    if (email) {

      axios.post('http://localhost:5000/api/auth/getUsernameByEmail', { email },{ headers: { Authorization: `Bearer ${token}` } }) // Use POST request
        .then(response => {
          console.log(response.data.username);
          setFormData(prevFormData => ({
            
            ...prevFormData,
            username: response.data.username // Update the username
             
          }));
        })
        .catch(error => {
          setError('Failed to fetch username.');
        });
    }
  }, [email]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, date, time, location, vehicleNo, mileage, message } = formData;

    if (!date || !time || !location || !vehicleNo || !mileage) {
      setError('All fields are required.');
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        'http://localhost:5000/api/reservations',
        { username, date, time, location, vehicleNo, mileage, message }, // Include the username in the request
        { headers: { Authorization: `Bearer ${token}` } } // Ensure the "Bearer " prefix is included
      );
      setFormData({ date: '', time: '', location: '', vehicleNo: '', mileage: '', message: '' });
      
    } catch (err) {
      setError('Failed to create reservation.');
    }
  };

  const minDate = addDays(new Date(), 1).toISOString().split('T')[0];

  return (
    <div>
     <Navbar email={email} />
      <div className="flex flex-col items-center bg-blue-300 justify-center min-h-[90vh]">
        <div className="bg-gray-200 p-5 rounded-3xl flex flex-col items-center justify-center w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Reserve Vehicle Service</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Date:</label>
              <input
                type="date"
                name="date"
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                disabled={isSunday(new Date(formData.date))}
                required
                className="p-2 border rounded border-slate-400 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Time:</label>
              <select name="time" value={formData.time} onChange={handleChange} required className="p-2 border rounded border-slate-400 w-full">
                <option value="">Select Time</option>
                <option value="10 AM">10 AM</option>
                <option value="11 AM">11 AM</option>
                <option value="12 PM">12 PM</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Location:</label>
              <select name="location" value={formData.location} onChange={handleChange} required className="p-2 border rounded border-slate-400 w-full">
                <option value="">Select Location</option>
                <option value="District 1">District 1</option>
                <option value="District 2">District 2</option>
                <option value="District 3">District 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Vehicle Registration Number:</label>
              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                required
                className="p-2 border rounded border-slate-400 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Current Mileage:</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
                className="p-2 border rounded border-slate-400 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="p-2 border rounded border-slate-400 w-full"
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
              type="submit"
            >
              Reserve Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;