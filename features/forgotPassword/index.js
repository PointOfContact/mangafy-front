import React, { useState } from 'react';

import { notification } from 'antd';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Imgix from 'components/imgix';
import LoginFooter from 'components/loginFooter';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnChange = ({ target }) => {
    setEmail(target.value);
  };

  const reset = () => {
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/authManagement')
        .create(
          {
            action: 'sendResetPwd',
            value: { email }, // {email}, {token: verifyToken}
            preferredComm: 'email', // options passed to options.notifier, e.g. {preferredComm: 'email'}
          },
          {
            mode: 'no-cors',
          }
        )
        .then(() => {
          notification.success({
            message: 'Success',
            description: "Pls. check you mailbox. If you don't reactive pls. send again",
          });
          setErrorMessage('');
          setEmail('');
        })
        .catch((err) => {
          notification.error({
            message: 'Failed',
            description: err.message,
          });
          setErrorMessage(err.message);
        });
    });
  };

  return (
    <div className={styles.forgot_password}>
      <Header />
      <Head></Head>
      <div className={styles.forgot_password_content}>
        <Imgix
          width={345}
          height={284}
          layout="fixed"
          src="https://mangafy.club/img/forgot-password.webp"
          alt=""
        />
        <h2 className={styles.title}>Forgot your password? Don’t panic!</h2>
        <p className={styles.info}>Enter the email you&apos;re using for your account.</p>
        <PrimaryInput
          className={styles.input}
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleOnChange}
          isFullWidth={true}
          isLinear={true}
        />
        {<p style={{ color: 'red' }}>{errorMessage}</p>}
        <LargeButton
          onClick={reset}
          className={styles.button_submit}
          htmlType="submit"
          text={'RESTART YOUR PASSWORD'}
          id="signInBtnId"
        />
        <Link href={'/sign-in'}>
          <a className={styles.back}>Back to Sign in</a>
        </Link>
      </div>
      <LoginFooter acaunt={false} />
      <FooterPolicy />
    </div>
  );
};

export default ForgotPassword;
