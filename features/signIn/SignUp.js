import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';

import HeaderNew from 'components/headerNew';
import SvgGoogle from 'components/icon/Google';
import SvgFacebook from 'components/icon/Facebook';
import Button from 'components/ui-new/Button';
import Facebook from 'components/icon/new/Facebook';
import Input from 'components/ui-new/Input';
import Imgix from 'components/imgix';

import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude, { setUser } from 'utils/amplitude';
import { notification } from 'antd';
import { register } from 'store';
import { validateEmail, validatePassword, validateName } from 'helpers/shared';
import Select from 'components/ui-new/Input/Select';
import { userTypes } from 'helpers/constant';
import Eye from 'components/icon/new/Eye';

const SignUp = () => {
  const router = useRouter();
  const page = useMemo(() => router.query.page || 'feed', [router.query.page]);
  const inviteId = useMemo(() => router.query.inviteId, [router.query.inviteId]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(userTypes[0].key);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (name) => {
    const error = validateName(name);
    setNameError(error);
    setName(name);
  };

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
    const nameError = validateName(name);
    setEmailError(loginError);
    setPasswordError(passwordError);
    setNameError(nameError);
    if (loginError || passwordError || nameError) return;

    const payload = {
      name,
      type: role,
      email,
      password,
      inviteId,
    };

    setLoading(true);
    register(payload)
      .then(({ user: newUser }) => {
        router.push(`/profile/${newUser?._id}?onBoarding=true`);

        setLoading(false);
        const data = [
          {
            event_type: EVENTS.SIGN_UP,
            event_properties: { strategy: 'local', userData: newUser },
          },
        ];
        setUser(newUser);
        myAmplitude(data);
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          message: error.message,
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
            <Imgix layout="fill" objectFit="cover" src={'img/loginCover.jpg'} />
            <div className={styles.loginPage__author}>Read: Kid of darkness. Agony</div>
          </a>
        </Link>
        <div className={styles.loginPage__container}>
          <div className={styles.loginPage__title}>Welcome to MangaFY</div>
          <div className={styles.loginPage__subTitle}>Let’s begin the adventure</div>
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
                  Sign up with Google
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
                  Sign up with Facebook
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.loginPage__or}>or use your email to sign in:</div>
          <form onSubmit={handleSubmit} className={styles.loginPage__form}>
            <Input
              className={styles.loginPage__input}
              err={nameError}
              onChange={handleNameChange}
              pink
              full
              rounded
              placeholder="Name"
            />
            <Input
              className={styles.loginPage__input}
              err={emailError}
              onChange={handleLoginChange}
              pink
              full
              rounded
              type="email"
              placeholder="Email"
            />
            <div className={styles.loginPage__iAm}>I'm a</div>
            <Select
              className={styles.loginPage__input}
              pink
              full
              rounded
              options={userTypes}
              placeholder="Role"
              onChange={setRole}
              defaultValue={role}
            />
            <div className={cn(styles.loginPage__input, styles.loginPage__password)}>
              <Input
                err={passwordError}
                onChange={handlePasswordChange}
                pink
                full
                rounded
                type={showPassword ? 'password' : 'text'}
                placeholder="Password"
              />
              <div className={styles.loginPage__showPassword} onClick={handleShowPasswordClick}>
                <Eye />
              </div>
            </div>
            <Button loading={loading} pink full rounded>
              Sign up
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

export default SignUp;
