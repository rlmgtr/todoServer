const express = require('express');
const router = express.Router();
const User = require('../models/signUpModel');
const auth = require('../middleware/isLoggedIn');

// Get User Profile
router.get('/', auth, async (req, res) => {
    try {
        console.log('User ID from Token:', req.user.userId); // Debugging line
        
        // Fetching the user by ID and selecting 'firstName'
        const user = await User.findById(req.user.userId).select('firstName');
        
        console.log('Fetched User:', user); // Debugging line
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Sending the firstName as JSON
        res.json({ firstName: user.firstName });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
