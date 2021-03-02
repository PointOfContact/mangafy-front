import React, { useState } from 'react';

import AuthForm from 'components/authForm';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import LoginFooter from 'components/loginFooter';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { login } from 'store';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Login = ({ user }) => {
  const defaultState = {
    email: '',
    password: '',
    errorMessage: '',
  };
  const [state, setState] = useState(defaultState);
  const { email, password, errorMessage } = state;
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    login(payload)
      .then((user) => {
        const data = [
          {
            platform: 'WEB',
            event_type: EVENTS.SIGN_IN,
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(data);
      })
      .catch((err) => {
        setState({
          ...state,
          errorMessage: err.message,
        });
      });
  };

  return (
    <>
      <Head></Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header path="sign-in" user={user} />
          <main className={styles.box}>
            <div className={'container'}>
              <div className={styles.box__wrapper}>
                <div className={styles.box__img}>
                  <img src="/img/sing-in.svg" alt="" />
                </div>
                <div className={styles.box__title_wrap}>
                  <div className={styles.box__title}>
                    <h2 className={styles.box__title_text}>Hello, who’s this?</h2>
                  </div>
                  <div className={styles.box__description}>
                    <p className={styles.box__description_text}>
                      Sign in to get your personalized page and start connecting
                    </p>
                  </div>
                </div>
                <div className={styles.box__form}>
                  <AuthForm
                    {...{
                      email,
                      password,
                      errorMessage,
                      onChange: handleOnChange,
                      onSubmit: handleLoginSubmit,
                      isLogin: true,
                    }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
        <LoginFooter acaunt={false} />
        <FooterPolicy />
      </div>
    </>
  );
};

Login.propTypes = {
  user: PropTypes.object,
};

Login.defaultProps = {
  user: null,
};

export default Login;
