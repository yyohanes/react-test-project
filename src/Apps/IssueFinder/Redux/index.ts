import {
  createStore as createReduxStore,
  applyMiddleware,
  Middleware,
  Store,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import RootReducers, { State } from './Reducers'
import RootSagas from './Sagas'

export function createStore(): Store<State> {
  const middlewares: Middleware[] = []
  if (__DEBUG__) {
    const loggerMiddleware = createLogger({
      level: 'info',
    })

    middlewares.push(loggerMiddleware)
  }

  const sagaMiddleware = createSagaMiddleware()
  middlewares.push(sagaMiddleware)

  const store = createReduxStore(RootReducers, applyMiddleware(...middlewares))

  sagaMiddleware.run(RootSagas)

  return store
}
