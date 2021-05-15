import React, { useState } from 'react';

import { Modal } from 'antd';
import AuthForm from 'components/authForm';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import LoginFooter from 'components/loginFooter';
import ButtonToTop from 'components/ui-elements/button-toTop';
import LargeButton from 'components/ui-elements/large-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { register } from 'store';
import cn from 'classnames';

import styles from './styles.module.scss';

const { info } = Modal;
const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Register = ({ user }) => {
  const defaultState = {
    name: '',
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

  const history = useRouter();
  const routeChange = () => {
    const path = `/create-a-story/start`;
    history.push(path);
  };

  const handleRegisterSubmit = (e) => {
    setState({
      ...state,
      errorMessage: '',
    });
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
        info({
          className: 'MangaFY',
          title: <h3 className={styles.modalTitle}>Welcome to MangaFY</h3>,
          icon: '',
          width: '100%',
          maskClosable: true,
          okText: <LargeButton onClick={() => routeChange()} text="Create Your First Story" />,
          style: { top: 120, maxWidth: '1000px' },
          content: (
            <div className={styles.publishedModal}>
              <p>
                Whether you have a story to tell or a cool illustration, our platform is here to
                ensure you take your ideas forward. Share your stories and build the graphic novel
                you always dreamt about (plus, our awesome community to interact with)
              </p>
            </div>
          ),
          onOk() {},
        });
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
          content="Sign in to get your personalized page and start connecting with graphic novel enthusiasts"
        />
      </Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header user={user} path="sign-up" />
          <main className={cn(styles.box, styles.boxBg)}>
            <div className={'container'}>
              <div className={styles.box__wrapper}>
                {/* <div className={styles.box__img}>
                  <img src="/img/sing-in.svg" alt="" />
                </div> */}
                <div className={styles.box__title_wrap}>
                  <div className={styles.box__title}>
                    <h2 className={styles.box__title_text}>
                      Get started today
                    </h2>
                  </div>
                  <div className={styles.box__hr}></div>
                  <div className={styles.box__description}>
                    <p className={styles.box__description_text}>
                      Make most of your talant
                    </p>
                  </div>
                  <div className={styles.box__hr}></div>
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
        {/* <LoginFooter acaunt={true} />
        <FooterPolicy /> */}
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
