const express = require('express');
const bcrypt = require('bcryptjs');
 
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'sathis000';
const verifyToken = require('../middleware/auth');
const router = express.Router();
 
router.post('/getUsernameByEmail',  async (req, res) => {
    const { email } = req.body; // Get email from the request body
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the username
      res.json({ username: user.username });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

router.post('/register', async (req, res) => {
    const { username, email, password, contactNumber, country } = req.body;
    console.log(username, email, password, contactNumber, country );

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            contactNumber,
            country 
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});



router.post('/userdetails',   async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
 
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
 
