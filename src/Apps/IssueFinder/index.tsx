import React from 'react'
import { Provider } from 'react-redux'

import App from './UI/App'
import { createStore } from './Redux'

const store = createStore()

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
