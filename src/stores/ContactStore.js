import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import ServerActions from '../actions/ServerActions'

let _contacts = []

//This file register any listteners you want to use 
//So it will register any actions from the dispatcher and
// then emmit them and do whatever is the case

//To create a listenner start the listenner 
//Stop the listenner 
//Register the dispatcher types and emmit them so the action can be perform in the components
class ContactStore extends EventEmitter{
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {

        case 'RECEIVE_CONTACTS':
          _contacts = action.contacts;
          this.emit('CHANGE')
          break;
        case 'RECEIVE_ONE_TODO': 
          let {contact} = action;
          _contacts.push(contact);
          this.emit('CHANGE');
          break;
      }
    });
  }
  startListening(cb) {
    this.on('CHANGE', cb)
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _contacts;
  }
}

export default new ContactStore();
