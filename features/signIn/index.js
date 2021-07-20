import React, { useState } from 'react';

import cn from 'classnames';
import AuthForm from 'components/authForm';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
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
  const [loading, setLoading] = useState(false);
  const { email, password, errorMessage } = state;
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    setState({
      ...state,
      errorMessage: '',
    });
    e.preventDefault();
    const page = qs.parse(location.search).page
      ? decodeURIComponent(qs.parse(location.search).page)
      : '';
    const payload = {
      email,
      password,
      page,
    };
    setLoading(true);
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
        setLoading(false);
        setState({
          ...state,
          errorMessage: err.message,
        });
      });
  };

  return (
    <>
      <Head>
        <title>Make the most of your talant!</title>
        <meta
          name="description"
          content="Sign in to get your personalized page and start connecting with graphic novel enthusiasts"
        />
      </Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header path="sign-in" user={user} />
          <main className={cn(styles.box, styles.boxBg)}>
            <div className={'container'}>
              <div className={styles.box__wrapper}>
                {/* <div className={styles.box__img}>
                  <img src="/img/sing-in.svg" alt="mangaFy sing in" />
                </div> */}
                <div className={styles.box__title_wrap}>
                  <div className={styles.box__title}>
                    <h2 className={styles.box__title_text}>Log in to MangaFY</h2>
                  </div>
                  <div className={styles.box__hr}></div>
                  <div className={styles.box__description}>
                    <p className={styles.box__description_text}>
                      We look forward seeing your artistic growth
                    </p>
                  </div>
                  <div className={styles.box__hr}></div>
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
                      loading,
                    }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
        <FooterLogin user={user} />
        {/* <LoginFooter acaunt={false} />
        <FooterPolicy /> */}
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
