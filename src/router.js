const express = require('express');
const router = express.Router();
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const isLoggedIn = require('./middleware/isLoggedIn');
const createTodoRoute = require('./routes/createTodoRoute');
const readTodoRoute = require('./routes/readTodoRoute');
const updateTodoRoute = require('./routes/updateTodoRoute');
const deleteTodoRoute = require('./routes/deleteTodoRoute');

router.use('/signup', signUpRoute);

router.post('/login', loginRoute);

router.use('/todos',isLoggedIn, createTodoRoute);

router.use('/todos',isLoggedIn, readTodoRoute);

router.use('/todos', isLoggedIn, updateTodoRoute);

router.use('/todos', isLoggedIn, deleteTodoRoute);




module.exports = router;
