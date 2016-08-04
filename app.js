let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let path = require('path')
let app = express();
let Contact = require('./model/contact')
const port = 8000
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


//Static routing
app.use(express.static('public'));

//ROUTES
app.route('/contacts')
  //Get all the contacts
  .get((req, res) => {
    Contact.getAll((err, data) => {
      if (err) res.status(400).send(err);
      else res.send(data);
    });

  })
  //Post stuff to data
  .post((req, res) => {
    Contact.create(req.body, err => {
      if(err) res.status(400).send(err);
      else res.send();
    });

  });

app.listen(port, err => {
  console.log(err || `Listenning to port 8000`)
});