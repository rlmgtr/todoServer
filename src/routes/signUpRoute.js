const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/signUpModel')

router.post('/', async (req, res) => {
    console.log(req.body);
const { firstName, lastName, email, password } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({ firstName, lastName, email, password: hashedPassword });
await newUser.save();
res.status(201).json({ message: 'Successfully Created User Account'});
    
});

module.exports = router;