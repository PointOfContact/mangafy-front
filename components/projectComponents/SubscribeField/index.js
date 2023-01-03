import Button from 'components/ui-new/Button';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import notification from 'antd/lib/notification';
import cn from 'classnames';
import Check from 'components/icon/new/Check';
import Link from 'next/link';

const SubscribeField = ({
  openPledgeModal,
  payPalEmail,
  user,
  className,
  subscription,
  subscribe,
  unsubscribe,
  mobile,
  project,
  subscribedProject,
}) => {
  const [email, setEmail] = useState('');

  function onInput(e) {
    if (e.key === 'Enter') {
      onSubscribe();
    } else {
      setEmail(e.target.value);
    }
  }

  function onSubscribe() {
    const emailToSubscribe = email || user?.email;
    // if (!validateEmail(emailToSubscribe)) {
    //   return notification.error({ message: 'Please enter valid email', placement: 'bottomLeft' });
    // }
    subscribe(emailToSubscribe);
  }

  return (
    <div className={className}>
      <div className={styles.title}>Subscribe to my stories</div>
      <div className={styles.subtitle}>
        Show your support and receive all my stories in your feed.
      </div>
      <div className={styles.buttons}>
        {subscription ? (
          <>
            <Button
              pink
              outline
              rounded
              iconRight
              icon={<Check bold />}
              className={styles.unsubscribe}
              onClick={unsubscribe}>
              Subscribed
            </Button>
            {project?.planId && (
              <Button disabled={subscribedProject} rounded outline onClick={openPledgeModal}>
                Pledge
              </Button>
            )}
          </>
        ) : (
          <>
            <Button pink rounded onClick={onSubscribe}>
              Subscribe
            </Button>
            {project?.planId && (
              <Button disabled={subscribedProject} rounded outline onClick={openPledgeModal}>
                Pledge
              </Button>
            )}
          </>
        )}
        {/* ) : (
           <div className={styles.subscribe}>
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
          )} */}
      </div>
      {payPalEmail && (
        <>
          <div className={styles.title}>Send me a tip</div>
          <div className={styles.subtitle}>Show your support with a small one-off tip.</div>
          <div className={styles.buttons}>
            <Link
              href={`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${payPalEmail}&item_name=Friends+of+the+Park&item_number=Fall+Cleanup+Campaign&currency_code=USD`}>
              <a>
                <Button outline rounded>
                  Tip
                </Button>
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
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
