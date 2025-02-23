const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Todo = require('../models/createTodoModel');

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure req.user.userId is available
    console.log("User ID from req.user:", req.user);  // Debug log

    // Find and delete the todo by ID and userId (ensure the todo belongs to the user)
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!todo) {
      return res.status(404).json({ message: 'Task not found or you do not have permission to delete this task' });
    }

    res.status(200).json({ message: 'Task successfully deleted', todo });
  } catch (error) {
    console.error('Error deleting todo:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
