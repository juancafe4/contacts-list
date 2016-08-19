import React, { Component } from 'react';

import ListContacts from './ListContacts'
import SubmitContact from './SubmitContact'

export default class App extends Component {
  render() {
    console.log('I am at the App component')
    return (
      <div className='container'>
        <SubmitContact />
        <ListContacts />
      </div>
    )
  }
}