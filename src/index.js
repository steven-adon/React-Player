import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import AppRouter from './AppRouter'
import reducers from './reducers'

import 'normalize.css'
import 'antd/dist/antd.css'
import './style/style.scss'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(reducers, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
)
