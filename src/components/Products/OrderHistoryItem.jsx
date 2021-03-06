import React from 'react'
import { TextDetail } from './index'
import { OrderProducts } from "./index";

const dateTimeToString = (date) => {
  return date.getFullYear() + '-'
          + ('00' + date.getMonth() + 1).slice(-2) + '-'
          + ('00' + date.getDate()).slice(-2) + ' '
          + ('00' + date.getHours()).slice(-2) + ':'
          + ('00' + date.getMinutes()).slice(-2) + ':'
          + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
  return date.getFullYear() + '-'
          + ('00' + date.getMonth() + 1).slice(-2) + '-'
          + ('00' + date.getDate()).slice(-2) + ' '
}

const OrderHistoryItem = (props) => {
  const order = props.order
  const orderdDateTime = dateTimeToString(order.update_at.toDate())
  const shippingDate = dateToString(order.shopping_date.toDate())
  const price = `¥${order.amount.toLocaleString()}`

  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={"注文ID"} value={order.id}/>
      <TextDetail label={"注文日時"} value={orderdDateTime}/>
      <TextDetail label={"発送予定日"} value={shippingDate}/>
      <TextDetail label={"注文金額"} value={price}/>
      {order.products.length > 0 && (
        <OrderProducts products={order.products} key={order.id}/>
      )}
      <div className="module-spacer--extra-extra-small" />
    </div>
  )
}

export default OrderHistoryItem
