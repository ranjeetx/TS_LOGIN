import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { checkStatus, parseJSON } from '../util/util'
import { EMPTY } from 'rxjs'
import 'whatwg-fetch';
// Constants
export const USER_REGISTER_OPEN = 'User.Register.Open'
export const USER_REGISTER = 'User.Register'
export const USER_REGISTER_SUCCESS = 'User.Register.Success'
export const USER_LOGIN = 'User.Login'
export const USER_LOGIN_SUCCESS = 'User.Login.Success'
export const CALL_FAIL = 'User.Login.Fail'
export const FETCH_COUNTRIES = 'Fetch.Countries'
export const FETCH_COUNTRIES_SUCCESS = 'Fetch.Countries.Success'
export const FETCH_SKILLS = 'Fetch.Skills'
export const FETCH_SKILLS_SUCCESS = 'Fetch.Skills.Success'


//Actions
export const userRegisterOpen = user => ({ payload: user, type: USER_REGISTER_OPEN })
export const userRegister = user => ({ payload: user, type: USER_REGISTER })
export const userLogin = user => ({ payload: user, type: USER_LOGIN })
export const userRegisterSuccess = user => ({ payload: user, type: USER_REGISTER_SUCCESS })
export const userLoginSuccess = user => ({ payload: user, type: USER_LOGIN_SUCCESS })
export const callFail = user => ({ payload: user, type: CALL_FAIL })
export const fetchCountries = text => ({ payload: text, type: FETCH_COUNTRIES })
export const fetchCountriesSuccess = data => ({ payload: data, type: FETCH_COUNTRIES_SUCCESS })
export const fetchSkills = text => ({ payload: text, type: FETCH_SKILLS })
export const fetchSkillsSuccess = data => ({ payload: data, type: FETCH_SKILLS_SUCCESS })

let userData = {}
export const userLoginEpic = action$ => action$.pipe(
    ofType(USER_LOGIN),
    switchMap(({ payload }) => {
        fetch('http://localhost:3200/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(checkStatus)
            .then(parseJSON)
            .then(data => userData = data)
        if (userData.ok && userData.token) {
            return of(userLoginSuccess(userData))
        } else {
            return of(callFail(userData))
        }
    })
)

let registerData = {}
export const userRegisterEpic = action$ => action$.pipe(
    ofType(USER_REGISTER),
    switchMap(({ payload }) => {
        fetch('http://localhost:3200/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(checkStatus)
            .then(parseJSON)
            .then(data => registerData = data)
        if (registerData.ok) {
            return of(userRegisterSuccess(registerData))
        } else {
            return of(callFail(registerData))
        }
    })
)

let Countries = {}
export const fetchCountriesEpic = action$ => action$.pipe(
    ofType(FETCH_COUNTRIES),
    switchMap(({ payload }) => {
        const url = `http://localhost:3200/api/account/getCountries?searchText=${payload}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkStatus)
            .then(parseJSON)
            .then(data => Countries = data)
        if (Countries.ok) {
            return of(fetchCountriesSuccess(Countries))
        } else {
            return of(callFail(Countries))
        }
    })
)

let Skills = {}
export const fetchSkillsEpic = action$ => action$.pipe(
    ofType(FETCH_SKILLS),
    switchMap(({ payload }) => {
        const url = `http://localhost:3200/api/account/getSkills?searchText=${payload}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkStatus)
            .then(parseJSON)
            .then(data => Skills = data)
        if (Skills.ok) {
            return of(fetchSkillsSuccess(Skills))
        } else {
            return of(callFail(Skills))
        }
    })
)

const defaultState = {
    token: '',
    registered: false,
    registerOpen: false,
    error: '',
    countries: [],
    skills: []
}

export const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return { ...state, registered: action.payload.ok }
        case USER_LOGIN_SUCCESS:
            return { ...state, token: action.payload.token }
        case CALL_FAIL:
            return { ...state, error: action.payload.error }
        case USER_REGISTER_OPEN:
            return { ...state, registerOpen: action.payload.open }
        case FETCH_COUNTRIES_SUCCESS:
            return { ...state, countries: action.payload.data }
        case FETCH_SKILLS_SUCCESS:
            return { ...state, skills: action.payload.data }
        default:
            return state;
    }
}