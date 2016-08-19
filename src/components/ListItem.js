import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { _id, firstName, lastName, phoneNumber, email} = this.props;
        return (
          <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phoneNumber}</td>
          </tr>
        )
    }
}

export default ListItem;
