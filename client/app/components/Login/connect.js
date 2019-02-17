import { connect } from 'react-redux'
import Login from './Login'
import { userLogin, userRegisterOpen } from '../../state/login'

const mapStateToProps = state => {
    return { token: state.loginReducer.token }
}

const mapDispatchToProps = dispatch => {
    return { userLogin: (user) => dispatch(userLogin(user)),
        userRegister: (user) => dispatch(userRegisterOpen(user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)