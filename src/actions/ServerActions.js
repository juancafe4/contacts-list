//This file is responsable of taking the data from the server to the dispatcher 
//So the dispatcher can store in store 
import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveContacts(contacts) {

    AppDispatcher.dispatch({
      type: 'RECEIVE_CONTACTS',
      contacts
    })
  }
}

export default ServerActions