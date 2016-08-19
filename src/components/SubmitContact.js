import React from 'react';

class SubmitContact extends React.Component {
  constructor(props) {
        super(props);
        
        this.state = {
          firstName: "",
          lastName: "",
          phoneNumber: 0,
          email: ""
        }

        this.onChangeFirst = this.onChangeFirst.bind(this);
        this.onChangeLast = this.onChangeLast.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.submit = this.submit.bind(this)
    }

    onChangeFirst(e) {
      this.setState({firstName: e.target.value})
    }

    onChangeLast(e) {
      this.setState({lastName: e.target.value})
    }
    onChangePhone(e) {
      this.setState({phoneNumber: e.target.value})
    }
    onChangeEmail(e) {
      this.setState({email: e.target.value})
    }
    submit(e) {
      e.preventDefault()

      console.log()
    }
    render() {
        return (
          <div>
            <h1 className="center-align">Contact List</h1>

          <div className="row">
            <form onSubmit={this.submit} className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input
                  onChange={this.onChangeFirst} 
                  value={this.state.firstName}
                  type="text" className="validate" required/>
                  <label>First Name</label>
                </div>
                <div className="input-field col s6">
                 <input 
                 onChange={this.onChangeLast}
                  value={this.state.lastName}
                  type="text" 
                  className="validate" required/>
                <label>Last Name</label>
                </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input  
                onChange={this.onChangeEmail}
                value={this.state.email}
                type="email" className="validate" required/>
                <label>Email</label>
              </div>
            <div className="input-field col s6">
              <input 
              onChange={this.onChangePhone}
              value={this.state.phoneNumber}
              type="number" className="validate" required/>
              <label>Phone Number</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <button type="submit" className="waves-effect waves-light btn" >Add Contact</button>
            </div>
          </div>
        </form>
      </div>
  </div>
        )
    }
}

export default SubmitContact;
