import React from 'react';
import styles from './styles.module.scss';

import Button from 'components/ui-new/Button';
import SvgGoogle from 'components/icon/Google';
import SvgFacebook from 'components/icon/Facebook';
import Facebook from 'components/icon/new/Facebook';
import Input from 'components/ui-new/Input';
import { Modal } from 'antd';
import Link from 'next/link';

import { notification } from 'antd';
import * as qs from 'query-string';
import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude, { setUser } from 'utils/amplitude';
import { login } from 'store';

export const SignInModal = ({ title, visible, setVisible }) => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  function submitHandler(e) {
    e.preventDefault();
    setError('');

    const page = qs.parse(window.location.search).page
      ? decodeURIComponent(qs.parse(window.location.search).page)
      : '';

    const payload = {
      email: e.target.login.value,
      password: e.target.password.value,
      page,
    };

    setLoading(true);
    login(payload)
      .then((newUser) => {
        setLoading(false);

        const data = [
          {
            event_type: EVENTS.SIGN_IN,
            event_properties: { strategy: 'local', userData: newUser, type: EVENTS.SIGN_IN },
          },
        ];
        setUser(newUser);
        setLoginError('');
        setPasswordError('');
        myAmplitude(data);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: 'Invalid login or password',
          placement: 'bottomLeft',
        });
      });
  }

  function validateLogin(login) {
    if (!login) {
      setLoginError('Login is required');
      notification.error({ message: 'Login is required', placement: 'bottomLeft' });
    } else {
      setLoginError('');
    }
  }

  function validatePassword(password) {
    if (!password) {
      setPasswordError('Password is required');
      notification.error({ message: 'Password is required', placement: 'bottomLeft' });
    } else {
      setPasswordError('');
    }
  }

  return (
    <Modal
      className={styles.modal}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}>
      <div className={styles.modal__title}>{title}</div>
      <div className={styles.modal__subtitle}>Sign in to make your opinion count</div>
      <div>
        <div className={styles.modal__loginWith}>
          <Link href="/api/v2/auth/google">
            <a>
              <Button full rounded outline pink icon={<SvgGoogle />}>
                Sign in with Google
              </Button>
            </a>
          </Link>
          <Link href="/api/v2/auth/facebook">
            <a>
              <Button full rounded outline pink icon={<Facebook color={'#1877F2'} />}>
                Sign in with Facebook
              </Button>
            </a>
          </Link>
        </div>
        <div className={styles.modal__orLine}>or</div>
        <form className={styles.modal__loginForm} onSubmit={submitHandler}>
          <Input
            onBlur={(e) => validateLogin(e.target.value)}
            name={'login'}
            full
            rounded
            pink
            placeholder={'Login'}
            err={loginError}
          />
          <Input
            onBlur={(e) => validatePassword(e.target.value)}
            name={'password'}
            type="password"
            full
            rounded
            pink
            placeholder={'Password'}
            err={passwordError}
          />
          <Link href="/forgot-password">
            <a className={styles.modal__forgotPassword}>Forgot your password?</a>
          </Link>
          <Button full rounded pink disabled={loading}>
            Login
          </Button>
          <Link href={'/terms'}>
            <a className={styles.modal__privacyPolicy}>
              By continuing, you agree to the MangaFY site T&C and Privacy Policy.
            </a>
          </Link>
        </form>
      </div>
    </Modal>
  );
};
