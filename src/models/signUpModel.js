const mongoose = require('mongoose');

const userSignUpSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
},
  password: {
    type: String,
    required: true, 
    minlenght: 8,
  },
}, { timestamps: true, versionKey: false });

const User = mongoose.model('User', userSignUpSchema);

module.exports = User;
