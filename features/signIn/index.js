import React, { useState } from 'react';

import cn from 'classnames';
import AuthForm from 'components/authForm';
import Header from 'components/header';
import Imgix from 'components/imgix';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { EVENTS } from 'helpers/amplitudeEvents';
import { NextSeo } from 'next-seo';
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

  const handleLoginSubmit = (e) => {
    setState({
      ...state,
      errorMessage: '',
    });

    const page = qs.parse(window.location.search).page
      ? decodeURIComponent(qs.parse(window.location.search).page)
      : '';

    const payload = {
      email: e.user.email,
      password: e.user.password,
      page,
    };

    setLoading(true);
    login(payload)
      .then((newUser) => {
        const data = [
          {
            platform: 'WEB',
            event_type: EVENTS.SIGN_IN,
            user_id: newUser._id,
            user_properties: {
              ...newUser,
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
      <NextSeo
        title="Make the most of your talent!"
        description="Sign in to get your personalized page and start connecting with graphic novel enthusiasts"
      />
      <ButtonToTop />
      <div className={styles.bg}>
        <Imgix layout="fill" src={'https://mangafy.club/img/login-bg.webp'} />
      </div>
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header path="sign-in" user={user} />
          <main className={cn(styles.box, styles.boxBg)}>
            <div className={cn(styles.container, 'container')}>
              <div className={styles.box__wrapper}>
                <div className={styles.content}>
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
                        onSubmit: handleLoginSubmit,
                        isLogin: true,
                        loading,
                        setState,
                        state,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
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
