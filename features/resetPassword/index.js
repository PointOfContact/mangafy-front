import React, { useState } from 'react';

import { notification } from 'antd';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Imgix from 'components/imgix';
import LoginFooter from 'components/loginFooter';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import Head from 'next/head';
import Router from 'next/router';

import styles from './styles.module.scss';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleOnChangePassword = ({ target }) => {
    const { value } = target;
    setPassword(value.trim());
  };

  const handleChangeNewPassword = ({ target }) => {
    const { value } = target;
    setNewPassword(value.trim());
  };

  const reset = () => {
    if (password !== newPassword) {
      notification.error({
        message: 'Password and confirm password mismatch',
        placement: 'bottomLeft',
      });
      return;
    }
    if (!password) {
      notification.error({
        message: 'Field is required',
        placement: 'bottomLeft',
      });
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/authManagement')
        .create(
          {
            value: {
              token,
              password,
            },
            action: 'resetPwdLong',
            notifierOptions: {}, // options passed to options.notifier, e.g. {preferredComm: 'email'}
          },
          {
            mode: 'no-cors',
          }
        )
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Your password successfully changes. Pls. login',
            placement: 'bottomLeft',
          });
          setTimeout(() => {
            Router.push({
              pathname: `/sign-in`,
              query: {},
            });
          }, 1000);
        })
        .catch((err) => {
          notification.error({
            message: 'Failed',
            description: err.message,
            placement: 'bottomLeft',
          });
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
          alt="MangaFy forgot password"
        />
        <h2 className={styles.title}>Create new awesome password</h2>
        <p className={styles.info}>Imagine about new, different and cool password.</p>
        <div className={styles.form}>
          <PrimaryInput
            className={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChangePassword}
            isFullWidth={true}
            isLinear={true}
          />
          <PrimaryInput
            className={styles.input}
            type="password"
            name="newPassword"
            value={newPassword}
            placeholder="Confirm Password"
            onChange={handleChangeNewPassword}
            isFullWidth={true}
            isLinear={true}
          />
        </div>
        <LargeButton
          onClick={reset}
          className={styles.button_submit}
          htmlType="submit"
          text={'Change Password'}
          id="signInBtnId"
        />
      </div>
      <LoginFooter acaunt={false} />
      <FooterPolicy />
    </div>
  );
};

export default ResetPassword;
