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

const SignIn = () => {
  const router = useRouter();
  const page = router.query.page || 'feed';

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle login input
  const handleLoginChange = (email) => {
    const error = validateEmail(email);
    setLoginError(error);
    setLogin(email);
  };

  // handle password input
  const handlePasswordChange = (pass) => {
    const error = validatePassword(pass);
    setPasswordError(error);
    setPassword(pass);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginError = validateEmail(login);
    const passwordError = validatePassword(password);
    setLoginError(loginError);
    setPasswordError(passwordError);
    if (!loginError && !passwordError) {
      console.log('Submit');
    }
  };

  return (
    <div>
      <HeaderNew />
      <div className={styles.loginPage}>
        <Link href="https://kidofdarkness.mangafy.club">
          <a className={styles.loginPage__weeklyArt}>
            <Imgix layout="fill" objectFit="cover" src={'img/loginCover.jpg'} />
            <div className={styles.loginPage__author}>Read: Kid of darkness. Agony</div>
          </a>
        </Link>
        <div className={styles.loginPage__container}>
          <div className={styles.loginPage__title}>Sing in to MangaFY</div>
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
              err={loginError}
              type="email"
              onChange={handleLoginChange}
              pink
              full
              rounded
              type="email"
              placeholder="Email"
            />
            <Input
              className={styles.loginPage__input}
              err={passwordError}
              type="password"
              onChange={handlePasswordChange}
              pink
              full
              rounded
              type="password"
              placeholder="Password"
            />
            <Link href="forgot-password">
              <a className={styles.loginPage__forgotPassword}>Forgot your password?</a>
            </Link>
            <Button loading pink full rounded>
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

function validateEmail(email) {
  if (email.length === 0) {
    return 'Email is required';
  }
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return 'Invalid email';
  }
}

function validatePassword(password) {
  if (password.length === 0) {
    return 'Password is required';
  }
  if (password.length < 2) {
    return 'Password should be at least 2 characters length';
  }
}
