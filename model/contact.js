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
    if (err) return cb(err)
      else {
        contact.id = uuid.v4()
        contacts.push(contact)
        fs.writeFile(dataFilePath, JSON.stringify(contacts), (err) => {
          cb(err)
        })
      }
    });
}

exports.update = function(id, contact, cb) {
  exports.getAll(function(err, contacts) {
    if (err) return cb(err)
      else {
        contacts.map((val, index) => {
          if (val.id === id.id) {
            contact.id = id.id
            contacts.splice(index , 1)
            contacts.push(contact);
          }
        });
        fs.writeFile(dataFilePath, JSON.stringify(contacts), (err) => {
          cb(err)
        })
      }
    });
}

exports.deleteContact = function(id, cb) {
  exports.getAll(function(err, contacts) {

    if (err) return cb(err)
      else {
        let actualContact
        contacts.map((val, index) => {
          if (val.id === id.id) 
            contacts.splice(index , 1)
        });
       
        fs.writeFile(dataFilePath, JSON.stringify(contacts), (err) => {  
          cb(err)
        })
      }
    });

}

exports.getContact = function(id, cb) {
  exports.getAll(function(err, contacts) {
    if (err) return cb(err)
    else {
      
      contacts.map((val, index) => {

        if (val.id === id.id) 
          return cb(err , contacts[index])
      });
      return cb(err)
    }
  });
}