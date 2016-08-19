import axios from 'axios'
import ServerActions from './actions/ServerActions'

//This file is responsable of getting the endpoint calls
//Then is going to trigger action -> dispatcher -> store
const API = {
  getAllContacts() {
    axios.get('api/contacts')
      .then(res => res.data)
      .then(ServerActions.receiveContacts)
      .catch(console.error)
  },

  createContact(contact) {
    axios.post('api/contacts', contact)
      .then(res => res.data)
      .then(ServerActions.receiveOneContact)
      .catch(console.error)
  }
}

export default API