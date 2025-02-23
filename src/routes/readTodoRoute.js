const express = require('express');
const router = express.Router();
const Todo = require('../models/createTodoModel');
const isLoggedIn = require('../middleware/isLoggedIn');

// Route to get todos
router.get('/', isLoggedIn, async (req, res) => {
  try {
    // Use req.user.userId instead of req.user._id for consistency
    console.log('User ID:', req.user.userId);  // Debug log to check if userId is correct
    
    const todos = await Todo.find({ userId: req.user.userId });

    // Check if no todos are found
    if (!todos.length) {
      return res.status(404).json({ message: 'No todos found' });
    }

    // Return todos in response
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
