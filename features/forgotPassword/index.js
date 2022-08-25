/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

import { Modal } from 'antd';
import FooterPolicy from 'components/footer-policy';
import HeaderNew from 'components/headerNew';
import Imgix from 'components/imgix';
import LoginFooter from 'components/loginFooter';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.scss';

const ReachableContext = React.createContext();

const ForgotPassword = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const handleOnChange = ({ target }) => {
    setEmail(target.value);
  };

  const countDown = () => {
    let secondsToGo = 5;
    const mod = modal.success({
      okButtonProps: {
        style: { background: '#7b65f3', borderRadius: '4px', borderColor: '#7b65f3' },
      },
      centered: true,
      title: 'Success',
      content: `Check the email address connected to your account and follow the steps to recover your account:)`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      mod.update({
        content: `Check the email address connected to your account and follow the steps to recover your account:)`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      mod.destroy();
    }, secondsToGo * 1000);
  };

  const reset = () => {
    setLoading(true);
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
          setLoading(false);
          countDown();
          // setErrorMessage('');
          setEmail('');
        })
        .catch(() => {
          setLoading(false);
          modal.error({
            okButtonProps: {
              style: { background: '#7b65f3', borderRadius: '4px', borderColor: '#7b65f3' },
            },
            centered: true,
            title: 'Oh...',
            okText: 'Try again',
            content: (
              <>
                There wasn't an account for that email.
                <br />
                <Link href="/sign-up">
                  <a className={styles.errorModal}>
                    <button>Sign up</button>
                  </a>
                </Link>
              </>
            ),
          });
          // setErrorMessage(err.message);
        });
    });
  };

  return (
    <div className={styles.forgot_password}>
      <HeaderNew user={user} />
      <Head></Head>
      <div className={styles.forgot_password_content}>
        <Imgix
          width={345}
          height={284}
          layout="fixed"
          src="https://mangafy.club/img/forgot-password.webp"
          alt="MangaFy forgot password"
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
        <ReachableContext.Provider value="Light">
          <LargeButton
            loading={loading}
            onClick={reset}
            className={styles.button_submit}
            htmlType="submit"
            text={'RESTART YOUR PASSWORD'}
            id="signInBtnId"
          />
          {contextHolder}
        </ReachableContext.Provider>
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
