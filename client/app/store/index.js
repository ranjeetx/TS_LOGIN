import { compose } from 'redux';
import rootReducer from './reducers'
import rootEpic from './epics'
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

// const store = createStore(rootReducer, applyMiddleware(epicMiddleware))

epicMiddleware.run(rootEpic)

export default store