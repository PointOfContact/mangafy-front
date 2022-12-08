import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

import HeaderNew from 'components/headerNew';
import SvgGoogle from 'components/icon/Google';
import SvgFacebook from 'components/icon/Facebook';
import Button from 'components/ui-new/Button';
import Facebook from 'components/icon/new/Facebook';
import Input from 'components/ui-new/Input';
import Imgix from 'components/imgix';
import Eye from 'components/icon/new/Eye';
import EyeClosed from 'components/icon/new/EyeClosed';

import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude, { setUser } from 'utils/amplitude';
import { notification } from 'antd';
import { login } from 'store';
import { validateEmail, validatePassword } from 'helpers/shared';
import client from 'api/client';
import cn from 'classnames';

const SignIn = () => {
  const router = useRouter();
  let page = router.query.page || '';
  if (page.includes('sign-in') || page.includes('sign-up')) {
    page = '';
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLoginChange = (email) => {
    const error = validateEmail(email);
    setEmailError(error);
    setEmail(email);
  };

  const handlePasswordChange = (pass) => {
    const error = validatePassword(pass);
    setPasswordError(error);
    setPassword(pass);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginError = validateEmail(email);
    const passwordError = validatePassword(password);
    setEmailError(loginError);
    setPasswordError(passwordError);
    if (loginError || passwordError) return;

    const payload = {
      email: email,
      password,
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
        myAmplitude(data);
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      });
  };

  return (
    <div>
      <HeaderNew />
      <div className={styles.loginPage}>
        <Link href="https://kidofdarkness.mangafy.club">
          <a className={styles.loginPage__weeklyArt}>
            <Imgix
              layout="fill"
              objectFit="cover"
              src={client.API_ENDPOINT + '/img/loginCover.jpg'}
            />
            <div className={styles.loginPage__author}>Read: Kid of darkness. Agony</div>
          </a>
        </Link>
        <div className={styles.loginPage__container}>
          <div className={styles.loginPage__title}>Sign in to MangaFY</div>
          <div className={styles.loginPage__subTitle}>
            MangaFY is a space for webcomics creators.
          </div>
          <div className={styles.loginPage__signInWith}>
            <Link href={'/api/v2/auth/google?page=' + page}>
              <a>
                <Button
                  pink
                  full
                  rounded
                  outline
                  icon={<SvgGoogle />}
                  className={styles.loginPage__signInWith}>
                  Sign in with Google
                </Button>
              </a>
            </Link>
            <Link href={'/api/v2/auth/facebook?page=' + page}>
              <a>
                <Button
                  pink
                  full
                  rounded
                  outline
                  icon={<Facebook />}
                  className={styles.loginPage__signInWith}>
                  Sign in with Facebook
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.loginPage__or}>or use your email to sign in:</div>
          <form onSubmit={handleSubmit} className={styles.loginPage__form}>
            <Input
              className={styles.loginPage__input}
              err={emailError}
              type="email"
              onChange={handleLoginChange}
              pink
              full
              rounded
              placeholder="Email"
            />
            <div className={cn(styles.loginPage__input, styles.loginPage__password)}>
              <Input
                err={passwordError}
                onChange={handlePasswordChange}
                pink
                full
                rounded
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <div className={styles.loginPage__showPassword} onClick={handleShowPasswordClick}>
                {showPassword ? <EyeClosed className={styles.loginPage__closedEye} /> : <Eye />}
              </div>
            </div>
            <Link href="forgot-password">
              <a className={styles.loginPage__forgotPassword}>Forgot your password?</a>
            </Link>
            <Button loading={loading} pink full rounded>
              Sign in
            </Button>
          </form>
          <Link href="terms">
            <a className={styles.loginPage__privacyPolicy}>
              By continuing, you agree to the MangaFY site T&C and Privacy Policy.
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
