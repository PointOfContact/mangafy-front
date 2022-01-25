import React from 'react';

import { Alert, Form } from 'antd';
import cn from 'classnames';
import SvgGoogle from 'components/icon/Google';
import SvgWhiteFacebook from 'components/icon/WhiteFacebook';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import PrimarySelect from 'components/ui-elements/select';
import { userTypes } from 'helpers/constant';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AuthForm = ({
  type,
  errorMessage,
  onChange,
  onSubmit,
  isLogin,
  loading,
  setState,
  state,
}) => (
  <>
    <Form className={styles.auth_form} name="nest-messages" onFinish={onSubmit}>
      <div className={styles.login_form}>
        {!isLogin ? (
          <div className="input_login">
            <Form.Item
              className={styles.name}
              name={['user', 'name']}
              rules={[
                {
                  required: true,
                  validator: async (_, names) => {
                    if (names === undefined) {
                      return Promise.reject(
                        new Error('Hey, bud. You forgot to add your name in the field above...')
                      );
                    }
                    if (names.trim().length < 3) {
                      return Promise.reject(new Error('Length must be at least 3 characters long'));
                    }
                  },
                },
              ]}>
              <PrimaryInput
                className={styles.input_login}
                id="name"
                isLinear={true}
                isFullWidth={true}
                placeholder={'Your name'}
                name="name"
              />
            </Form.Item>
            <div className={styles.select}>
              <PrimarySelect
                // mode="multiple"
                // isMulti={true}
                className={styles.select_login}
                label="I'm a"
                id="type"
                name="type"
                onChange={onChange}
                isLinear={true}
                isFullWidth={true}
                placeholder="Your Profession"
                value={type || undefined}
                options={userTypes}
              />
            </div>
          </div>
        ) : null}

        <Form.Item
          className={styles.email}
          name={['user', 'email']}
          rules={[
            {
              required: true,
              message: "Don't forget to enter your email! We'll be waiting.",
            },
            {
              type: 'email',
              message: 'Invalid email address.',
            },
          ]}>
          <PrimaryInput
            id="email"
            isLinear={true}
            isFullWidth={true}
            onChange={() => {
              setState({
                ...state,
                errorMessage: '',
              });
            }}
            placeholder={'Email'}
            name="email"
          />
        </Form.Item>

        <Form.Item
          className={styles.password}
          name={['user', 'password']}
          rules={[
            {
              required: true,
              validator: async (_, names) => {
                if (names === undefined) {
                  return Promise.reject(
                    new Error("If you're a human, add a password to continue.")
                  );
                }
                if (names.trim().length < 2) {
                  return Promise.reject(new Error('Length must be at least 2 characters long'));
                }
              },
            },
          ]}>
          <PrimaryInput
            id="password"
            type="password"
            isLinear={true}
            isFullWidth={true}
            placeholder={'Password'}
            name="password"
            onChange={() => {
              setState({
                ...state,
                errorMessage: '',
              });
            }}
          />
        </Form.Item>

        {isLogin && (
          <div className={styles.forgot_password}>
            <Link href="/forgot-password">
              <a>Forgot your password?</a>
            </Link>
          </div>
        )}
        <small className={styles.error}>
          {errorMessage &&
            (isLogin ? (
              <Alert
                message="Your login info isn't right. Try again, or reset your password if it slipped your mind."
                type="error"
                closable
              />
            ) : (
              <Alert message={errorMessage} type="error" closable />
            ))}
        </small>
        <div className={styles.login_button}>
          {!isLogin ? (
            <LargeButton
              className={cn(styles.button_submit, loading && styles.buttonDisabled)}
              loading={loading}
              disabled={loading}
              htmlType="submit"
              text={<p style={{ margin: 0 }}>Let&apos;s rock!</p>}
              id="signUpBtnId"
            />
          ) : (
            <LargeButton
              className={styles.button_submit}
              htmlType="submit"
              loading={loading}
              text={'Start your Journey'}
              id="signInBtnId"
            />
          )}
        </div>
      </div>
      <div className={styles.hr}></div>

      {/* {isLogin ? ( */}
      <>
        <div>
          <div className={styles.or}>
            <div className={styles.hr}></div>
            <span>or Sign in with:</span>
            <div className={styles.hr}></div>
          </div>
        </div>
        <div className={styles.social_login}>
          <Link href="/api/v2/auth/google">
            <a>
              <span className={cn(styles.google_btn, styles.btn)}>
                <SvgGoogle width="26px" height="26px" /> Sign in with Google
              </span>
            </a>
          </Link>
          <Link href="/api/v2/auth/facebook">
            <a>
              <span className={cn(styles.google_btn, styles.btn)}>
                <SvgWhiteFacebook width="26px" height="26px" /> Sign in with Facebook
              </span>
            </a>
          </Link>
          <div className={styles.policy}>
            <Link href="/terms">
              <a>
                <span>By continuing, you agree to the MangaFY site T&C and Privacy Policy.</span>
              </a>
            </Link>
          </div>
          {isLogin && (
            <div className={styles.new_account}>
              <span>No account yet ?</span>
              <Link href="/sign-up">
                <a>Start your journey</a>
              </Link>
            </div>
          )}
        </div>
      </>
      {/* ) : null} */}
    </Form>
  </>
);

AuthForm.propTypes = {
  type: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

AuthForm.defaultProps = {
  type: null,
  loading: false,
  onChange: () => {},
};

export default AuthForm;
