import Button from 'components/ui-new/Button';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import notification from 'antd/lib/notification';
import cn from 'classnames';

const SubscribeField = ({ className, subscription, subscribe, unsubscribe }) => {
  const [email, setEmail] = useState('');

  function onInput(e) {
    if (e.key === 'Enter') {
      onSubscribe();
    } else {
      setEmail(e.target.value);
    }
  }

  function onSubscribe() {
    if (!validateEmail(email)) {
      return notification.error({ message: 'Please enter valid email', placement: 'bottomLeft' });
    }
    if (subscription) {
      //   unsubscribe(subscription._id);
    } else {
      subscribe(email);
    }
  }

  return (
    <>
      {subscription ? (
        <div className={cn(className, styles.unsubscribe)} onClick={unsubscribe}>
          unsubscribe
        </div>
      ) : (
        <div className={cn(className, styles.subscribe)}>
          <input
            onKeyUp={onInput}
            className={styles.subscribe__input}
            type="text"
            placeholder="Type your email..."
          />
          <Button pink rounded onClick={onSubscribe}>
            Subscribe
          </Button>
        </div>
      )}
    </>
  );
};

export default SubscribeField;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
