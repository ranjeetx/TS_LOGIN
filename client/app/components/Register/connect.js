import { connect } from 'react-redux'
import Register from './Register'
import { userRegister, fetchCountries, fetchSkills } from '../../state/login'

const mapStateToProps = state => {
    return { isRegistered: state.loginReducer.registered,
    countries: state.loginReducer.countries,
    skills: state.loginReducer.skills }
}

const mapDispatchToProps = dispatch => {
    return { userRegister: (user) => dispatch(userRegister(user)), 
        fetchCountries: (searchText) => dispatch(fetchCountries(searchText)),
        fetchSkills: (searchText) => dispatch(fetchSkills(searchText))  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)