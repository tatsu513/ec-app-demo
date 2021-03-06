import * as Action from './actions'
import initialState from '../store/initialState'

export const UsersReducers = (state = initialState.users, action) => {
  switch (action.type) {
    case Action.SIGN_IN:
      return {
        ...state,
        ...action.payload
      }
      case Action.SIGN_OUT:
        return {
          ...action.payload
        }
      case Action.UPDATE_USER_STATE:
        return {
          ...state,
          ...action.payload
        }
      case Action.FETCH_PRODUCTS_IN_CART:
        return {
          ...state,
          cart: [...action.payload]
        }
      case Action.FETCH_ORDERS_HISTORY:
        return {
          ...state,
          orders: [...action.payload]
        }
    default:
      return state
  }
}