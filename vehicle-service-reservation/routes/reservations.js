const express = require('express');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');
const router = express.Router();
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'sathis000';
const verifyToken = require('../middleware/auth');


// Create a new reservation
router.post('/', verifyToken, async (req, res) => {
    const { username,date, time, location, vehicleNo, mileage, message } = req.body;
    const reservation = new Reservation({ username, date, time, location, vehicleNo, mileage, message });

    try {
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating reservation' });
    }
});

// Get all reservations for the authenticated user
router.get('/', verifyToken, async (req, res) => {
    try {
        const reservations = await Reservation.find(); // Fetch all reservations
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations' });
    }
});

// Delete a reservation
router.delete('/:id', verifyToken, async (req, res) => {
  try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
          return res.status(404).json({ message: 'Reservation not found' });
      }
      res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting reservation', error: error.message });
  }
});

router.post('/reservationinfo', async (req, res) => {
    const { email } = req.body; // Use req.query for GET requests
    
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const username = user.username;
      
      // Fetch reservations by username
      const reservations = await Reservation.find({ username });
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
  });

module.exports = router;