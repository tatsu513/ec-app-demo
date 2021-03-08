import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu'
import {
  getProductsInCart,
  getProductsInLike,
  getUserId
} from '../../reducks/users/selectores'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase/index'
import { fetchProductInCart, fetchProductInLike } from '../../reducks/users/operations'
import { push } from 'connected-react-router';


const HeaderMenus = (props) => {
  const selector = useSelector(state => state)
  const dispatch = useDispatch()
  const uid = getUserId(selector)
  let productsInCart = getProductsInCart(selector)
  let productsInLike = getProductsInLike(selector)

  useEffect(() => {
    const unSubscribe = db.collection('users').doc(uid).collection('cart')
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data();
          const changeType = change.type

          switch (changeType) {
            case 'added':
              productsInCart.push(product)
              break
            case 'modified':
              const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
              productsInCart[index] = product
              break
            case 'removed':
              productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
              break
            default:
              break
          }
        })
        dispatch(fetchProductInCart(productsInCart))
      })
    return () => unSubscribe()
  }, [])

  useEffect(() => {
    const unSubscribe = db.collection('users').doc(uid).collection('like')
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data()
          const changeType = change.type

          switch(changeType) {
            case 'added':
              productsInLike.push(product)
              break
            case 'modified':
              const index = productsInLike.findIndex(product => product.likeId === change.doc.id)
              productsInLike[index] = product
              break
            case 'removed':
              productsInLike = productsInLike.filter(product => product.likeId !== change.doc.id)
              break
            default:
              break
          }
        })
        dispatch(fetchProductInLike(productsInLike))
      })
    return () => unSubscribe()
  }, [])

  return (
    <>
      <IconButton onClick={() => dispatch(push('/cart'))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge badgeContent={productsInLike.length} color="secondary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus