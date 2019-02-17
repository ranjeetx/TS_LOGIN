import React, { Component } from 'react'
import { SelectSkillsField } from '../../formFields/selectSkills'
import { SelectCountryField} from '../../formFields/selectCountries'

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      city: '',
      skills: '',
      country:'',
      userName: '',
      password: '',
      countryList:[],
      skillsList:[]
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { ...state, countryList: props.countries, skillsList: props.skills }
  }
  

  handleInputChange = event => {
    let objChange = {}
    objChange[event.target.name] = event.target.value
    this.setState(objChange)
  }

  handleCountrySearch = event => {
    const value = event.target.value
    this.setState({country: value})
    this.props.fetchCountries(value)
  }

  handleSkillsSearch = event => {
    const value = event.target.value
    this.setState({skills: value})
    this.props.fetchSkills(value)
  }

  handleRegister = () => {
    if (this.state.userName && this.state.password) {
      this.props.userRegister({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        dob: this.state.dob,
        userName: this.state.userName,
        password: this.state.password,
        skills: this.state.skills,
        country: this.state.country
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={'container'}>
          <form>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="fname">First Name</label>
              </div>
              <div className={'col-75'}>
                <input type="text" id="fname" name="firstName" placeholder="First Name" onChange={this.handleInputChange} value={this.state.firstName} />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="lname">Last Name</label>
              </div>
              <div className={'col-75'}>
                <input type="text" id="lname" name="lastName" placeholder="Last Name" onChange={this.handleInputChange} value={this.state.lastName} />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="mail">Email</label>
              </div>
              <div className={'col-75'}>
                <input type="text" id="mail" name="email" placeholder="Email" onChange={this.handleInputChange} value={this.state.email} />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="db">Date of Birth</label>
              </div>
              <div className={'col-75'}>
                <input type="date" id="db" name="dob" placeholder="Date of Birth" onChange={this.handleInputChange} value={this.state.dob} />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="uname">User Name</label>
              </div>
              <div className={'col-75'}>
                <input type="text" id="uname" name="userName" placeholder="User Name" onChange={this.handleInputChange} value={this.state.userName} />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="pwd">Password</label>
              </div>
              <div className={'col-75'}>
                <input type="password" id="pwd" name="password" placeholder="Password" onChange={this.handleInputChange} value={this.state.password} />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="ctr">Country</label>
              </div>
              <div className={'col-75'}>
                <SelectCountryField itemList={this.state.countryList} id="ctr" onChange={this.handleCountrySearch} value={this.state.country} placeholder="Country" />
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-25'}>
                <label htmlFor="skl">Skill</label>
              </div>
              <div className={'col-75'}>
                <SelectSkillsField itemList={this.state.skillsList} id="skl" onChange={this.handleSkillsSearch} value={this.state.skills} placeholder="Skill" />
              </div>
            </div>
            <div className={'row'}>
              <input type="button" value="Submit" onClick={this.handleRegister} />
            </div>
          </form>
        </div>
      </React.Fragment >
    )
  }
}

export default Register;
