import React, { useState } from 'react';

import { notification } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

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
        .then((res) => {
          notification.success({
            message: 'Success',
            description: "Pls. check you mailbox. If you don't reactive pls. send again",
          });
          // setMessage('Pls. check you mailbox. If you don\'t reactive pls. send again')
          setErrorMessage('');
          setEmail('');
        })
        .catch((err) => {
          notification.error({
            message: 'Failed',
            description: err.message,
          });
          setErrorMessage(err.message);
          setMessage('');
        });
    });
  };

  return (
    <div className="form_magafy">
      <Head></Head>
      <div className="sign_in_page_container">
        <div className="sign_in_content">
          <div className="sign_in_header">Forgot your password? Don’t panic!</div>
          <div className="sign_in_info">
            Type the address linked to your account and we'll send you password reset instructions.
            They might end up in your spam folder, so please check there as well.
          </div>
          <div className="sign_in_form forgot-pass-block sign_in_form col-lg-4 col-md-6 col-sm-8 col-xs-10">
            <div className="input_login floating-label-wrap">
              <label>Email</label>
              <input type="email" name="email" value={email} onChange={handleOnChange} />
            </div>
            {/* {<p>{message}</p>} */}
            {<p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="login_button_container">
              <button onClick={reset} className="login_btn">
                Send instruction
              </button>
            </div>
          </div>
          <div className="sign_in_terms_info">
            To make MangaFY work we log user data. Click "{<Link href="/sign-in">sign in</Link>}" to
            accept MangaFY's{' '}
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
    </div>
  );
};

export default ForgotPassword;
