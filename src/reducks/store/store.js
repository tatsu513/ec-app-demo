import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { UsersReducers } from '../users/reducers'
import { ProductsReducer } from '../products/reducers'

export default function createStores(history) {
  const middlewares = [routerMiddleware(history), thunk]
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
      diff: true
    })
    middlewares.push(logger)
  }
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducers,
      products: ProductsReducer
    }),
    applyMiddleware(...middlewares)
  )
}