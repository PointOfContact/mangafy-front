import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import myAmplitude, { setUser } from 'utils/amplitude';
import cn from 'classnames';
import SvgGoogle from 'components/icon/Google';
import SvgWhiteFacebook from 'components/icon/WhiteFacebook';
import styles from './styles.module.scss';
import { register } from 'store';
import { notification, Form } from 'antd';
import { userTypes } from 'helpers/constant';
import Button from 'components/ui-new/Button';
import Input from 'components/ui-new/Input';

const SignUp = ({ storyInfo, goNext, goBack, setStoryInfo, loading, setLoading }) => {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState({
    name: null,
    email: null,
    password: null,
    type: 'editor',
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function nameChangeHandler(text) {
    setNameError(false);
    setRegisterInfo({ ...registerInfo, name: text.trim() });
  }
  function emailChangeHandler(text) {
    setEmailError(false);
    setRegisterInfo({ ...registerInfo, email: text.trim() });
  }
  function passwordChangeHandler(text) {
    setPasswordError(false);
    setRegisterInfo({ ...registerInfo, password: text.trim() });
  }

  function registerHandler() {
    if (nameError) return;
    if (emailError) return;
    if (passwordError) return;
    setLoading(true);
    register(registerInfo)
      .then(({ user: newUser }) => {
        goNext();
      })
      .catch((error) => {
        notification.error({
          message: error.message,
          placement: 'bottomLeft',
        });
        setLoading(null);
      });
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <div className={cn(styles.title)}>Sign up for FREE</div>
        <Form className={styles.form}>
          <div className={styles.signUpForm}>
            <Form.Item
              className={styles.form_item}
              name="name"
              rules={[
                {
                  required: true,
                  validator: async (_, name) => {
                    if (!name) {
                      return setNameError('Please input your name');
                    }
                    if (name.trim().length < 3) {
                      return setNameError('Name should has more than 3 characters');
                    }
                    setNameError(null);
                  },
                },
              ]}>
              <Input
                rounded
                pink
                className={cn(styles.input, nameError ? styles.input_error : null)}
                placeholder="Your dream name"
                onChange={nameChangeHandler}
                err={nameError}
              />
            </Form.Item>
            <Form.Item
              className={styles.form_item}
              name="email"
              rules={[
                {
                  validator: () => setEmailError(null),
                },
                {
                  required: true,
                  message: () => setEmailError('Please input your email'),
                },
                {
                  type: 'email',
                  message: () => setEmailError('Please input correct email'),
                },
              ]}>
              <Input
                rounded
                pink
                type="email"
                className={cn(styles.input, emailError ? styles.input_error : null)}
                placeholder="Your email"
                onChange={emailChangeHandler}
                err={emailError}
              />
            </Form.Item>
            <Form.Item
              className={styles.form_item}
              name="password"
              rules={[
                {
                  validator: async (_, password) => {
                    if (!password) {
                      return setPasswordError('Please input your password');
                    }
                    if (password.trim().length < 2) {
                      return setPasswordError('Password should has more than 2 characters');
                    }
                    setPasswordError(null);
                  },
                },
              ]}>
              <Input
                rounded
                pink
                type="password"
                className={cn(styles.input, passwordError ? styles.input_error : null)}
                placeholder="Password"
                onChange={passwordChangeHandler}
                err={passwordError}
              />
            </Form.Item>
          </div>
          <div className={styles.buttons}>
            <Button rounded pink onClick={registerHandler} loading={loading === 'next'}>
              Create account
            </Button>
            <Button
              rounded
              pink
              outline
              loading={loading === 'prev'}
              className={styles.button_blackLoading}
              onClick={() => goBack()}>
              Go back
            </Button>
          </div>
        </Form>
        <div className={styles.signUpWith}>
          <div className={styles.signUpWith__label}>Or sign up with:</div>
          <div className={styles.signUpWith__buttons}>
            <Link href="/api/v2/auth/google">
              <a className={cn(styles.signUpButton)}>
                <SvgGoogle />
                Sign up with Google
              </a>
            </Link>
            <Link href="/api/v2/auth/facebook">
              <a className={cn(styles.signUpButton)}>
                <SvgWhiteFacebook />
                Sign up with Facebook
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
