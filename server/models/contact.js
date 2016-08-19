// Schema
// first name -> String
// last name -> String 
// phone -> Number
// email -> String

const mongoose = require('mongoose');

const contactschema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: {type: String, required: true},
  email: {type: String, required: true}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;