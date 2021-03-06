import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PrimaryButton } from '../UIkit/index'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { registerCard, retrievePaymentMethod } from '../../reducks/payments/operations'
import { TextDetail } from  '../Products/index'
import { getCustomerId, getPaymentMethodId } from '../../reducks/users/selectores'

const PaymentEdit = () => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const selector = useSelector(state => state)
  const customerId = getCustomerId(selector)
  const paymentMethodId = getPaymentMethodId(selector)

  const [card, setCard] = useState({})

  const goBackToMyPage = useCallback((path) => {
    dispatch(push(path))
  }, [dispatch])

  const register = useCallback(() => {
    dispatch(registerCard(stripe, elements, customerId))
  }, [dispatch, stripe, elements, customerId])

  useEffect(() => {
    (async() => {
      const cardData = await retrievePaymentMethod(paymentMethodId)
      if (cardData) setCard(cardData)
      return
    })()
  }, [paymentMethodId])

  const cardNumber = useMemo(() => {
    if (card.last4) {
      return `**** **** **** ${card.last4}`
    } else {
      return '未登録'
    }
  }, [card])

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">クレジットカード登録・編集</h2>
      <div className="module-spacer--medium"/>
      <h3>現在のカード情報</h3>
      <div className="module-spacer--medium"/>
      <TextDetail label={card.brand} value={cardNumber} />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="module-spacer--medium"/>
      <div className="center">
      <PrimaryButton
          label={"保存"}
          onClick={register}
        />
        <PrimaryButton
          label={"マイページに戻る"}
          onClick={() => goBackToMyPage('/user/mypage')}
        />
      </div>
    </section>
  )
}

export default PaymentEdit