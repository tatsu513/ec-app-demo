import { CardElement } from '@stripe/react-stripe-js';
import { push } from 'connected-react-router';
import { db } from '../../firebase/index'
import { updateUserStateAction } from "../users/actions";

const headers = new Headers();
headers.set('Content-type', 'application/json');
headers.set('Accept', 'application/json',);
const BASE_URL = 'https://ec-app-39963.web.app'

const createCustomer = async (email, paymentMethodId, uid) => {
  const response = await fetch(`${BASE_URL}/v1/customers`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
    })
  })
  const customerResponse = await response.json();
  return JSON.parse(customerResponse.body);
}

export const retrievePaymentMethod = async (paymentMethodId) => {
  const response = await fetch(`${BASE_URL}/v1/paymentMethod`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      paymentMethodId: paymentMethodId,
    })
  })
  const paymentMethodResponse = await response.json();
  const paymentMethod = JSON.parse(paymentMethodResponse.body);
  return paymentMethod.card
}

const updatePaymentMethod = async (
  customerId,
  prevPaymentMethodId,
  nextPaymentMethodId
) => {
  const response = await fetch(`${BASE_URL}/v1/updatePaymentMethod`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      customerId,
      prevPaymentMethodId,
      nextPaymentMethodId
    })
  })
  const updatePaymentMethodResponse = await response.json();
  const updatePaymentMethod = JSON.parse(updatePaymentMethodResponse.body);
  return updatePaymentMethod.card
}

export const registerCard = (stripe, elements, customerId) => {
  return async (dispatch, getState) => {
    const user = getState().users
    const email = user.email
    const uid = user.uid

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[errorrrrrr]', error);
      return;
    }

    const paymentMethodId = paymentMethod.id

    if (customerId === '') {
      const customerData = await createCustomer(email, paymentMethodId, uid)
      if (customerData.id === '') {
        alert('失敗しました')
        return
      } else {
        const updateUserState = {
          customer_id: customerData.id,
          payment_method_id: paymentMethodId
        }
        db.collection('users').doc(uid)
          .update(updateUserState)
          .then(() => {
            dispatch(updateUserStateAction(updateUserState))
            dispatch(push('/user/mypage'))
          })
          .catch(() => {
            return
          })
      }
    } else {
      const prevPaymentMethodId = getState().users.payment_method_id
      const updatedPaymentMethod =
        await updatePaymentMethod(
          customerId, prevPaymentMethodId, paymentMethodId
        )
      if (!updatedPaymentMethod) {
        alert('失敗しました')
      } else {
        const userState = {
          payment_method_id: paymentMethodId
        }
        db.collection('users').doc(uid)
          .update(userState)
          .then(() => {
            dispatch(updateUserStateAction(userState))
            alert('更新')
            dispatch(push('/user/mypage'))
          })
          .catch(() => alert('失敗しました'))
      }
    }
  }
}