const express = require('express');
const router = express.Router();
const Todo = require('../models/createTodoModel');
const isLoggedIn = require('../middleware/isLoggedIn');

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const { toDo, isDone, remarks } = req.body;

    // Validate input
    if (!toDo) {
      return res.status(400).json({ message: 'toDo is required' });
    }

    // Create a new Todo object
    const newTodo = new Todo({
      userId: req.user.userId,  // Use userId from token, not _id
      toDo,
      isDone,
      remarks,
    });

    // Save the new todo to the database
    await newTodo.save();

    // Return a success response
    res.status(201).json({ message: 'Successfully added a task' });

  } catch (error) {
    console.error('Error in adding task', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
