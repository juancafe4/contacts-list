import API from '../API'


//So the way the action works in this app
//First we have have an API whenre it comunicates with end points using axon 
//Then it communicates with the server action so it can dispatch them and the store contact can register
//So the store contact can get the info and do the modifications and send them  to the compoent that we need 

let ContactAction = {
  getAllContacts : API.getAllContacts,
  createContact(contact) {
    API.createContact(contact)
  }
}

export default ContactAction