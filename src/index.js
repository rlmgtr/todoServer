const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');
const profileRoute = require('./routes/profileRoute'); // <-- Import the new route

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 4000,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error in connection:', err));

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(router);
app.use('/profile', profileRoute); // <-- Add the new route here

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
