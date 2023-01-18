import client from 'api/client';
import { createContext, useContext, useEffect, useState } from 'react';
const axios = require('axios').default;
import Router from 'next/router';
import { notification } from 'antd';
import chargebee from 'chargebee';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const urlEncode = (data) => {
  const str = [];
  for (const p in data) {
    if (data.hasOwnProperty(p) && !(data[p] === undefined || data[p] === null)) {
      str.push(encodeURIComponent(p) + '=' + (data[p] ? encodeURIComponent(data[p]) : ''));
    }
  }
  return str.join('&');
};

const openPlanModal = (
  cbInstance,
  plan_id,
  item_id,
  customer_id,
  closePayModal,
  updatePage,
  type
) =>
  cbInstance.openCheckout({
    hostedPage: async () => {
      // required
      // This function should return a promise, that will resolve a hosted page object
      // If the library that you use for making ajax calls, can return a promise,
      // you can directly return that.
      try {
        const jwt = client.getCookie('feathers-jwt');
        const data = await client.service(`api/v2/generate-checkout-new-url`).create(
          { plan_id, customer_id, item_id, type },
          {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          }
        );
        // console.log(data.hosted_page);
        return data.hosted_page;
      } catch (err) {
        console.log('Error catch: ', err);
        closePayModal();
        if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
          Router.push(`/sign-in`);
        } else {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
        }
      }
    },
    loaded: () => {
      console.log('Loaded');
      closePayModal();
      // Optional
      // will be called once checkout page is loaded
    },
    error: (err) => {
      console.log('Error: ', err);
      // Optional
      // will be called if the promise passed causes an error
    },
    step: (step) => {
      console.log('Step: ' + step);
      // Optional
      // will be called for each step involved in the checkout process
    },
    success: (hostedPageId) => {
      console.log('Success: ' + hostedPageId);
      updatePage();
      closePayModal();
      // Optional
      // will be called when a successful checkout happens.
    },
    close: () => {
      console.log('Closed Pay Modal');
      closePayModal();
      // Optional
      // will be called when the user closes the checkout modal box
    },
  });

const AppContext = createContext({
  cbInstance: {},
  chargebee: {},
  openCheckout: () => {},
});

chargebee.configure({
  site: process.env.NEXT_PUBLIC_CHARGBEE_SITE,
  api_key: process.env.NEXT_PUBLIC_CHARGBEE_KEY,
});

const AppWrapper = ({ children }) => {
  const [cbInstance, setCbInstance] = useState({});
  const [chargebeeInterface, setChargebeeInterface] = useState({});

  useEffect(() => {
    const cbInstanceData = window.Chargebee.init({
      site: process.env.NEXT_PUBLIC_CHARGBEE_SITE, // your test site
      publishableKey: process.env.NEXT_PUBLIC_CHARGBEE_KEY, // this is an optional parameter.
      // Use this, if custom domain is enabled for your site
    });
    setChargebeeInterface(chargebee);
    setCbInstance(cbInstanceData);
  }, []);

  return (
    <AppContext.Provider value={{ cbInstance, chargebee, openPlanModal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppWrapper;
