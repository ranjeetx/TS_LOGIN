import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Main from './components/Main/index'

render((
  <Provider store={store}>
    <Router>
        <Main/>
    </Router>
  </Provider>
), document.getElementById('app'));
