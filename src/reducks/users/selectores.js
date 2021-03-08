import { createSelector } from 'reselect'

const usersSelecter = state => state.users

export const getIsSignedIn = createSelector(
  [usersSelecter],
  state => state.isSignedIn
)

export const getProductsInCart = createSelector(
  [usersSelecter],
  state => state.cart
)

export const getProductsInLike = createSelector(
  [usersSelecter],
  state => state.like
)

export const getOrdersHistory = createSelector(
  [usersSelecter],
  state => state.orders
)

export const getUserId = createSelector(
  [usersSelecter],
  state => state.uid
)

export const getUserName = createSelector(
  [usersSelecter],
  state => state.username
)

export const getCustomerId = createSelector(
  [usersSelecter],
  state => state.customer_id
)

export const getPaymentMethodId = createSelector(
  [usersSelecter],
  state => state.payment_method_id
)