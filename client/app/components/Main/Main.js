import React, { Component } from 'react';
import Login from '../Login/index'
import Register from '../Register/index'
import './Main.css'

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      token: '',
      isRegistereOpen: false,
      registered: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { ...state, token: props.selectToken, isRegistereOpen: props.openRegister, registered: props.registered }
  }

  Welcome = () => {
    return <div>
      I am in
    </div>
  }

  render() {
    let Render = !this.state.token || this.state.registered? Login : this.Welcome
    Render = !this.state.isRegistereOpen ? Render : Register
    return (
      <React.Fragment>
        <div className={"container-register"}>
          <Render />
        </div>
      </React.Fragment >
    )
  }
}

export default Main;
