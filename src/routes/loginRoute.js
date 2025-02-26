// src/routes/loginRoute.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/signUpModel');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ 
            userId: user._id, 
            firstName: user.firstName 
        }, process.env.SECRET, { 
            expiresIn: '8h',
        });

        // Send token in response
        return res.json({ token });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
