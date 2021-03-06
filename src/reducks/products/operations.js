import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/'
import { fetchProductsAction, deleteProductAction }  from './actions'

const productRef = db.collection('products')

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productRef.doc(id).delete()
      .then(() => {
        const prevState = getState().products.list
        const nextProducts = prevState.filter(product => product.id !== id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    let query = productRef.orderBy('updated_at', 'desc')
    query = (gender !== '') ? query.where('gender', '==', gender) : query
    query = (category !== '') ? query.where('category', '==', category) : query

    query.get()
      .then(snapshots => {
        const  productList = []
        snapshots.forEach((snapshot) => {
          const product = snapshot.data()
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}

export const orderProduct = (productInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const userRef = db.collection('users').doc(uid)
    const timeStamp = FirebaseTimestamp.now()

    let products = [],
        soldOutProduct = []

    const batch = db.batch()
    for (const product of productInCart) {
      const snapshot = await productRef.doc(product.productId).get()
      const sizes = snapshot.data().sizes

      const updatedSizes = sizes.map(size => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProduct.push(product.name)
            return size
          }
          return {
            size: size.size,
            quantity: size.quantity - 1
          }
        } else {
          return size
        }
      })

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      })

      batch.update(
        productRef.doc(product.productId),
        { sizes: updatedSizes}
      )

      batch.delete(
        userRef.collection('cart').doc(product.cartId)
      )
    }

    if (soldOutProduct.length > 0) {
      const errorMessage = soldOutProduct.length > 1
        ? soldOutProduct.join('と')
        : soldOutProduct[0]
      alert(`ごめんなさい。 ${errorMessage}が在庫切れです。`)
      return false
    } else {
      batch.commit()
        .then(() => {
          const orderRef = userRef.collection('orders').doc()
          const date = timeStamp.toDate()
          const shppingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

          const history = {
            amount: amount,
            created_at: timeStamp,
            id: orderRef.id,
            products: products,
            shopping_date: shppingDate,
            update_at: timeStamp
          }

          orderRef.set(history)
          alert('きてる４')
          dispatch(push('/order/complete'))
        })
      .catch(() => alert('失敗です'))
    }
  }
}

export const saveProducts = (
  id,
  name,
  category,
  description,
  gender,
  price,
  images,
  sizes
) => {
  return async (dispatch) => {
    const timeStamp = FirebaseTimestamp.now()
    let customId = id

    const data = {
      name,
      category,
      description,
      gender,
      images,
      price: parseInt(price, 10),
      sizes,
      updated_at: timeStamp
    }

    if (id === '') {
      const ref = productRef.doc()
      const gotId = ref.id
      data.id = gotId
      customId = gotId
      data.created_at = timeStamp
    }

    return productRef.doc(customId).set(data, { merge: true })
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}