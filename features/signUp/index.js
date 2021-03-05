import React, { useState } from 'react';

import AuthForm from 'components/authForm';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import LoginFooter from 'components/loginFooter';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { register } from 'store';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Register = ({ user }) => {
  const defaultState = {
    username: '',
    password: '',
    errorMessage: '',
    type: userTypes[0].key,
    disabled: false,
    err: '',
  };
  const [loading, setLoading] = useState(false);
  const [state, setState] = React.useState(defaultState);
  const { name, email, password, errorMessage, type, err, disabled } = state;

  const handleOnChange = (e) => {
    if (!e.target) {
      setState({
        ...state,
        type: e,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    setState({ disabled: true });
    const payload = {
      name,
      type,
      email,
      password,
    };
    register(payload)
      .then(({ user }) => {
        setState({ disabled: false });

        const data = [
          {
            platform: 'WEB',
            event_type: EVENTS.SIGN_UP,
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(data);
        Router.push(`/my-profile`);
      })
      .catch((error) => {
        setLoading(false);
        setState({
          ...state,
          errorMessage: error.message,
        });
      });
  };

  return (
    <>
      <Head>
        <title>Make the most of your talant!</title>
        <meta
          name="description"
          content="Sign in to get your personalized page and start connecting with graphic novel entusiasts"
        />
      </Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header user={user} path="sign-up" />
          <main className={styles.box}>
            <div className={'container'}>
              <div className={styles.box__wrapper}>
                <div className={styles.box__img}>
                  <img src="/img/sing-in.svg" alt="" />
                </div>
                <div className={styles.box__title_wrap}>
                  <div className={styles.box__title}>
                    <h2 className={styles.box__title_text}>
                      Make the most of your digital comics life
                    </h2>
                  </div>
                  <div className={styles.box__description}>
                    <p className={styles.box__description_text}>
                      Sign up to get your personalized page connect with enthusiast world wide
                    </p>
                  </div>
                </div>
                <div className={styles.box__form}>
                  <AuthForm
                    disabled={disabled}
                    {...{
                      type,
                      name,
                      email,
                      password,
                      errorMessage,
                      loading,
                      onChange: handleOnChange,
                      onSubmit: handleRegisterSubmit,
                    }}
                  />
                  {err && <p>{err}</p>}
                </div>
              </div>
            </div>
          </main>
        </div>
        <LoginFooter acaunt={true} />
        <FooterPolicy />
      </div>
    </>
  );
};

Register.propTypes = {
  user: PropTypes.object,
};

Register.defaultProps = {
  user: null,
};

export default Register;
