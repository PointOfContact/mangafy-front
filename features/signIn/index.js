import React, { useState } from 'react';

import { Layout, Row, Col } from 'antd';
import AuthForm from 'components/authForm';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import LoginFooter from 'components/loginFooter';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import { login } from 'store';

import styles from './styles.module.scss';

const { Content } = Layout;

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Login = () => {
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
    console.log('payloadpayloadpayloadpayloadpayloadpayload', payload);
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
      <Header />
      <Content className={styles.sign_in_content}>
        <Row>
          <Col className={styles.sign_in} span={24}>
            <img src="/img/sing-in.svg" alt="" />
            <h2 className={styles.title}>Hello, who’s this?</h2>
            <p className={styles.info}>Sign in to get your personalized page and start connecting</p>
            <div>
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
          </Col>
        </Row>
      </Content>
      <LoginFooter acaunt={false} />
      <FooterPolicy />
    </>
  );
};

export default Login;
