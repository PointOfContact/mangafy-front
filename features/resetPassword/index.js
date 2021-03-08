import React, { useState } from 'react';

import { notification } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleOnChangePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const handleChangeNewPassword = ({ target }) => {
    const { value } = target;
    setNewPassword(value);
  };

  const submit = () => {};

  const reset = () => {
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
        .then((res) => {
          notification.success({
            message: 'Success',
            description: 'Your password successfully changes. Pls. login',
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
          });
        });
    });
  };

  return (
    <div className="form_magafy">
      <Head></Head>
      <div className="sign_in_page_container">
        <div className="sign_in_content">
          <div className="sign_in_header">Create new awesome password</div>
          <div className="sign_in_info">Imagine about new, different and cool password.</div>
          <form>
            <div className="sign_in_form forgot-pass-block sign_in_form col-lg-4 col-md-6 col-sm-8 col-xs-10">
              <div className="input_login floating-label-wrap">
                <label>Password</label>
                <input
                  autoComplete="new-password"
                  value={password}
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChangePassword}
                />
              </div>
              <div className="input_login floating-label-wrap">
                <label>Confirm Password</label>
                <input
                  autoComplete="new-password"
                  value={newPassword}
                  type="password"
                  name="password"
                  onChange={handleChangeNewPassword}
                />
              </div>
              <div className="login_button_container">
                <button id="ResetBtnId" type="button" onClick={reset} className="login_btn">
                  Reset
                </button>
              </div>
            </div>
          </form>
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

export default ResetPassword;
