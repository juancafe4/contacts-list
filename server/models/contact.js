// Schema
// first name -> String
// last name -> String 
// phone -> Number
// email -> String

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: {type: String, required: true},
  email: {type: String, required: true}
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;