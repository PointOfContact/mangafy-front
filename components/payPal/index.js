import React, { useState } from 'react';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';

const PAYPAL_CLIENT_ID = {
  clientId: 'AbcgqDT6fy2AiCXtmvEy_pb5d7m3qRjj89ibbNi9-GSF6ri0xTjIeDNiX9QzDXup6zPX39X9gpKZmEGk',
};

const PayPal = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState('');

  const createOrder = (data, actions) =>
    actions.order
      .create({
        purchase_units: [
          {
            amount: {
              // charge users $499 per order
              value: 499,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((resOrderID) => {
        setOrderID(resOrderID);
        return resOrderID;
      });

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => {
        const { payer } = details;
        setBillingDetails(payer);
        setSucceeded(true);
      })
      .catch((err) => setPaypalErrorMessage('Something went wrong.'));

  const initialOptions = {
    'client-id': PAYPAL_CLIENT_ID.clientId,
    currency: 'USD',
    intent: 'capture',
  };

  return (
    <div className="get">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            color: 'blue',
            shape: 'pill',
            label: 'pay',
            tagline: false,
            layout: 'horizontal',
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
};

PayPal.propTypes = {
  user: PropTypes.object,
};

PayPal.defaultProps = {
  user: {},
};

export default PayPal;
