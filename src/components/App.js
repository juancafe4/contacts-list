import React, { Component } from 'react';

import ListContacts from './ListContacts'
export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <ListContacts />
      </div>
    )
  }
}