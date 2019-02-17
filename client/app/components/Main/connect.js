import { connect } from 'react-redux'
import Main from './Main'

const mapStateToProps = state => {
    return { registered: state.loginReducer.registered,
        openRegister: state.loginReducer.registerOpen,
        selectToken: state.loginReducer.token
     }
}

export default connect(mapStateToProps, null)(Main)