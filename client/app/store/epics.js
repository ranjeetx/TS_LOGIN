import { userLoginEpic, userRegisterEpic, fetchCountriesEpic, fetchSkillsEpic } from '../state/login'
import { combineEpics } from 'redux-observable';

const rootEpic = combineEpics(userLoginEpic, userRegisterEpic, fetchCountriesEpic, fetchSkillsEpic);

export default rootEpic
