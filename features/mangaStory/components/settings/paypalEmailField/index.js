import React, { useEffect, useRef, useState } from 'react';

import PrimaryInput from 'components/ui-elements/input';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const PaypalEmailField = ({
  userData,
  setUserData,
  onChangeSingleField,
  setShowPayPalContent,
  showPayPalContent,
  sendEvent,
}) => {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [touchedPaypal, setTouchedPaypal] = useState(true);
  const [payPalEmail, setPayPalEmail] = useState(userData?.payPalEmail);
  const bubbleChecked = useRef();

  useEffect(() => {
    bubbleChecked.current.checked = showPayPalContent;
  }, []);

  const savePayPalEmail = (email) => {
    mangaStoryAPI.draft.saveUserDataByKey(email, userData, setUserData);
  };

  const regEmail = /\S+@\S+\.\S+/;
  const payPalEmailValidate =
    payPalEmail?.length > 6 && regEmail.test(payPalEmail) && touchedPaypal;

  return (
    <div className={styles.paypalEmail}>
      <div className={styles.titleContainer}>
        <h2>Accept donation</h2>
        <div className={styles.betaButton}>Beta</div>
      </div>
      <p>Set up Instant Payouts</p>
      <h3>Enable Instant payouths via Paypal</h3>
      <PrimaryInput
        placeholder="@paypal account"
        value={payPalEmail}
        onChange={(e) => {
          setTouchedPaypal(true);
          setPayPalEmail(e.target.value);
        }}
        onBlur={() => {
          payPalEmailValidate && savePayPalEmail(payPalEmail);
          sendEvent(EVENTS.EDIT_PROJECT_PAY_PAL_EMAIL, 'payPalEmail', payPalEmail);
        }}
      />
      {!payPalEmailValidate && bubbleVisible && (
        <p className={styles.error}>Yo! Please use valid email connected to your PayPal account</p>
      )}
      <div className={styles.toggleStylesBubble}>
        <span className={styles.toggleTitle}>Invisible</span>
        <ToggleSwitch
          inputRef={bubbleChecked}
          name="payPalPublished"
          className={styles.toggle}
          onChange={(e) => {
            const data = {
              target: {
                name: e.target.name,
                value: e.target.checked,
              },
            };
            sendEvent(EVENTS.EDIT_PROJECT_PAY_PAL_PUBLISHED, 'payPalPublished', e.target.checked);
            setBubbleVisible(e.target.checked);
            onChangeSingleField(data, true);
            setShowPayPalContent(!showPayPalContent);
          }}
        />
        <span className={styles.toggleTitle}>Visible</span>
      </div>
    </div>
  );
};

PaypalEmailField.propTypes = {
  userData: PropTypes.object.isRequired,
  baseData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  setShowPayPalContent: PropTypes.func.isRequired,
  sendEvent: PropTypes.func.isRequired,
  showPayPalContent: PropTypes.bool,
};

PaypalEmailField.defaultProps = {
  baseData: {},
  showPayPalContent: false,
};
export default PaypalEmailField;
