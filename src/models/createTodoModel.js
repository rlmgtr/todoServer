const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},

  toDo: {
    type: String, 
    required: true,
  },

  isDone: {
    type: Boolean,
    default: false,
  },

  remarks: {
    type: String, 
  }, 
}, 
{ timestamps: true, 
  versionKey: false} );

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
