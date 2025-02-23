const express = require('express');
const router = express.Router();
const Todo = require('../models/createTodoModel');
const isLoggedIn = require('../middleware/isLoggedIn');

router.patch ('/:id', isLoggedIn, async (req, res) => {
try { 
    const { id } = req.params;
    const { toDo, isDone, remarks } = req.body;

    const updateTodo = await Todo.findOneAndUpdate(
{ _id: id, user: req.user.id },
{ $set: { toDo, isDone, remarks } }, 
{ new: true, runValidators: true }
);

if (!updateTodo) {
return res.status(400).json({ message: 'Task not found' });
}

res.status(200).json({ message: 'Task successfully updated', todo: updateTodo });

} catch (error) {

res.status(500).json({ message: 'Internal server error', error: error.message });

}

});

module.exports = router;