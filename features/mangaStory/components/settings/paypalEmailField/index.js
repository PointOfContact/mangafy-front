import React, { useEffect, useRef, useState } from 'react';

import PrimaryInput from 'components/ui-elements/input';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const PaypalEmailField = ({
  userData,
  setUserData,
  onChangeSingleField,
  setShowPayPalContent,
  showPayPalContent,
}) => {
  const bubbleChecked = useRef();

  useEffect(() => {
    bubbleChecked.current.checked = showPayPalContent;
  }, []);

  const [payPalEmail, setPayPalEmail] = useState(userData?.payPalEmail);

  const savePayPalEmail = (email) => {
    mangaStoryAPI.draft.saveUserDataByKey(email, userData, setUserData);
  };

  const regEmail = /\S+@\S+\.\S+/;
  const payPalEmailValidate = payPalEmail?.length > 6 && regEmail.test(payPalEmail);

  return (
    <div className={styles.paypalEmail}>
      <div className={styles.titleContainer}>
        <h2>Bubble Tea</h2>
        <div className={styles.betaButton}>Beta</div>
      </div>
      <p>Receive micropayments from your fans</p>
      <h3 className={styles.paypalInputTitle}>Paypal Payment Pointer</h3>
      <PrimaryInput
        placeholder="@paypal.contact"
        value={payPalEmail}
        onChange={(e) => setPayPalEmail(e.target.value)}
        onBlur={() => payPalEmailValidate && savePayPalEmail(payPalEmail)}
      />
      {!payPalEmailValidate && (
        <p className={styles.error}>Yo! Please use valid email connected to your PayPal account</p>
      )}
      <div className={styles.toggleStylesBubble}>
        <span className={styles.toggleTitle}>Draft</span>
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
  showPayPalContent: PropTypes.bool,
};

PaypalEmailField.defaultProps = {
  baseData: {},
  showPayPalContent: false,
};
export default PaypalEmailField;
