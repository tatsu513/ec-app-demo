import { createSelector } from 'reselect'

const productsSelecter = state => state.products

export const getProducts = createSelector(
  [productsSelecter],
  state => state.list
)