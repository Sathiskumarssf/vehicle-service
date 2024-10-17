const express = require('express');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'sathis000';

// Middleware to check authentication
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message); // Log the error
        res.status(401).json({ message: 'Token is not valid' });
    }
};



// Create a new reservation
router.post('/', async (req, res) => {
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
        const reservations = await Reservation.find({ username: req.user.username });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations' });
    }
});

// Delete a reservation
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reservation' });
    }
});

module.exports = router;
