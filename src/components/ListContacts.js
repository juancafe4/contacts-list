import React from 'react';

class ListContacts extends React.Component {
  constructor() {
    super();
    this.displayName = 'ListContacts';
  }
  render() {
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

        <tbody id="contacts">
          <tr id="template">
            <td className='firstName-table'></td>
            <td className="lastName-table"></td>
            <td className="email-table"></td>
            <td className="phone-table"></td>
      </tr>
      </tbody>
      </table>
      )
  }
}

export default ListContacts;
