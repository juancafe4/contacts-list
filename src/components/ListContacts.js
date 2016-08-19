import React from 'react';

import ContactStore from '../stores/ContactStore'
import ContactAction from '../actions/ContactAction'
import ListItem from './ListItem';

class ListContacts extends React.Component {
  constructor() {
    super();

    this.state = {
      contacts: ContactStore.getAll()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ContactAction.getAllContacts();
    ContactStore.startListening(this._onChange)
  }
  componentWillUnmount() {
    ContactStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({
      contacts: ContactStore.getAll()    })
  }
  render() {
    // const ListContacts = 

    let ItemLists = this.state.contacts.map(contact =>  <ListItem key={contact._id} {...contact}/>)
    return (
      <table className='highlight centered'>
        <thead>
          <tr>
            <th data-field="first-name">First Name</th>
            <th data-field="last-name">Last Name</th>
            <th data-field="email">Email</th>
            <th data-field="phone">Phone Number</th>
          </tr>
        </thead>

        <tbody>
          {ItemLists}
        </tbody>
      </table>
      )
  }
}

export default ListContacts;
