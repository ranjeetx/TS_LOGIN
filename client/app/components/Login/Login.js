import React, { Component } from 'react';

class Login extends Component {

  state = {
    userName: '',
    password: ''
  }

  handleInputChange = event => {
    let objChange = {}
    objChange[event.target.name] = event.target.value
    this.setState(objChange)
  }

  handleSignIn = () => {
    if (this.state.userName && this.state.password) {
      this.props.userLogin({
        userName: this.state.userName,
        password: this.state.password
      })
    }
  }

  handleRegister = event => {
    event.preventDefault()
    this.props.userRegister({
      open: true
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className={'container'}>
          <form>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="uname">User Name/ Email</label>
              </div>
              <div className={'col-75'}>
                <input type="text" id="uname" name="userName" placeholder="User Name or Email" onChange={this.handleInputChange} value={this.state.userName} />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="pwd">Password</label>
              </div>
              <div className={'col-75'}>
                <input type="password" id="pwd" name="password" placeholder="Your password" onChange={this.handleInputChange} value={this.state.password}/>
              </div>
            </div>
            <div className={'row'}>
              <input type="button" value="Submit" onClick={this.handleSignIn}/>
            </div>
            <div className={'row'}>
                  Already a member ?
									<a className="to_register" onClick={this.handleRegister}> Go and log in </a>
              </div>
          </form>
        </div>
      </React.Fragment >
    )
  }
}

export default Login
