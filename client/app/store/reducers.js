import { loginReducer} from '../state/login'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({loginReducer})

export default rootReducer