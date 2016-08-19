//This file is responsable of taking the data from the server to the dispatcher 
//So the dispatcher can store in store 
import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveContacts(contacts) {

    AppDispatcher.dispatch({
      type: 'RECEIVE_CONTACTS',
      contacts
    })
  },
  receiveOneContact(contact) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ONE_TODO',
      contact
    })
  }
}

export default ServerActions