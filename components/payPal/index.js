import React, { useState } from 'react';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const PAYPAL_CLIENT_ID = {
  clientId: 'ARYBEIrA9abI578VrxgodkT3O8BOjijZJYzhzandXfXYc_jW2sl_mj_-NolHvK89EkpG7cskc6YWgZHO',
};

const PayPal = ({ price }) => {
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
              value: price,
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
        setBillingDetails(details);
        setSucceeded(true);
      })
      .catch(() => setPaypalErrorMessage('Something went wrong.'));

  const initialOptions = {
    locale: 'en_US',
    'client-id': PAYPAL_CLIENT_ID.clientId,
    currency: 'USD',
    intent: 'capture',
  };

  return (
    <div className={styles.get}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            color: 'gold',
            shape: 'pill',
            label: 'pay',
            tagline: false,
            layout: 'horizontal',
            size: 'large',
          }}
          forceReRender={[price]}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
      {paypalErrorMessage && paypalErrorMessage}
      {succeeded && 'succeeded'}
    </div>
  );
};

PayPal.propTypes = {
  price: PropTypes.number,
};

PayPal.defaultProps = {
  price: 0,
};

export default PayPal;
