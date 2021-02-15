import React, { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import AuthForm from '../../components/authForm';
import { EVENTS } from '../../helpers/amplitudeEvents';
import { login } from '../../store';

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
      <div className="sign_in_page_container">
        <div className="sign_in_content">
          <div className="sign_in_header">Hello, who’s this?</div>
          <div className="sign_in_info">
            Sign in to get your personalized page connect with you love
          </div>
          <div className="sign_in_form sign_in_form col-lg-4 col-md-6 col-sm-8 col-xs-10">
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
          <div className="sign_in_terms_info">
            To make MangaFY work we log user data. Click "Sign in to accept MangaFY's{' '}
            <Link href="/terms">
              <a className="margin-horizontal-5">Term and service</a>
            </Link>{' '}
            &{' '}
            <Link href="/privacy-policy">
              <a className="margin-horizontal-5">Privacy Policy </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
