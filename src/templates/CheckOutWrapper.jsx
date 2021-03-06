import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { PaymentEdit } from '../components/Payment/index'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51IR3asHZV2RI3eV7ENejDnFrq7tR1JjBxOJ8VYEXtrHHPXuaXgDZCw2NCmI25ivPqZtm96KHYNl249HT8GU86Olm00aKRVnYRb'
);

const CheckOutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentEdit/>
    </Elements>
  );
};

export default CheckOutWrapper