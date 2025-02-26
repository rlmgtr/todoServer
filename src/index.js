const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');
const profileRoute = require('./routes/profileRoute'); // Import the new route

dotenv.config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 4000,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error in connection:', err));

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Change to your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(morgan('tiny'));

// Routes
app.use(router);
app.use('/profile', profileRoute); 

// Export for Vercel
module.exports = app;
