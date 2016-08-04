const fs = require('fs');
const path = require('path')
const uuid = require('uuid')

const dataFilePath = path.join(__dirname, '../data//contacts.json');

exports.getAll = function(cb) {
  // 1. read the json file tp ge the data
  // 2. parse the data, to get the array
  // 3. callback with the array
  //(if there is an error, callback with error)

  fs.readFile(dataFilePath, (err, buffer) => {
    if (err) return cd(err)
    try {
      let contacts = JSON.parse(buffer)
      cb(null, contacts)
      return;
    } catch(err) {
      return cb(err)
    }


  });
}

exports.create = function(contact, cb) {
  exports.getAll(function(err, contacts) {
    if (err) return 
  });
}