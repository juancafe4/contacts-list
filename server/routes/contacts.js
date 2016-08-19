const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

router.route('/')
  .get((req, res) => {
    Contact.find({}, (err, contacts) => {
      res.status(err ? 400 : 200).send(err || contacts);
    });
  })
  .post((req, res) => {
    Contact.create(req.body, (err, newContact) => {
      res.status(err ? 400 : 200).send(err || newContact);
    });
  });

router.route('/:id')
  .get((req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
      res.status(err ? 400 : 200).send(err || contact);
    });
  })
  .delete((req, res) => {
    Contact.findByIdAndRemove(req.params.id, err => {
      res.status(err ? 400 : 200).send(err);
    })
  })
  .put((req, res) => {
    Contact.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, contact) => {
      if(err) {
        return res.status(400).send(err);
      }

      Contact.find({}, (err, contacts) => {
        res.status(err ? 400 : 200).send(err || contacts);
      });
    });
  })

module.exports = router;