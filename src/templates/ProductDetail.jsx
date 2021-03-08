import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db, FirebaseTimestamp } from '../firebase/index'
import { makeStyles } from '@material-ui/core/styles';
import { ImageSwiper, SizeTable } from '../components/Products/index'
import { addProductToCart, addProductToLike } from '../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400
    }
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400
    }
  },
  price: {
    fontSize: 36
  },
  description: {
    border: 'none',
    background: 'none'
  }
}))

const ProductDetail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const path = selector.router.location.pathname
  const id = path.split('/product/')[1]

  const [product, setProduct] = useState(null)

  const addProduct = useCallback((selectedSize, addType) => {
    const timeStamp = FirebaseTimestamp.now()
    const addItems = {
      added_time: timeStamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: selectedSize
    }
    if (addType === 'cart') {
      dispatch(addProductToCart(addItems))
    } else {
      dispatch(addProductToLike(addItems))
    }
  }, [dispatch, product])

  useEffect(() => {
    db.collection('products').doc(id).get().then((snapshot) => {
      const data = snapshot.data()
      setProduct(data)
    })
  }, [id])

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images}/>
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">
              {product.name}
            </h2>
            <p className={classes.price}>
              {product.price.toLocaleString()}
            </p>
            <div className="module-spacer--small" />
            <SizeTable addProduct={addProduct} sizes={product.sizes}/>
            <div className="module-spacer--small" />
            <pre className={classes.description}>{product.description}</pre>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail