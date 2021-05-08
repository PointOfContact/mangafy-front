import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Spin } from 'antd';
import SvgGoogle from 'components/icon/Google';
import SvgWhiteFacebook from 'components/icon/WhiteFacebook';
import PrimaryInput from 'components/ui-elements/input';
import LargeButton from 'components/ui-elements/large-button';
import PrimarySelect from 'components/ui-elements/select';
import { userTypes } from 'helpers/constant';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AuthForm = ({ type, errorMessage, onChange, onSubmit, isLogin, loading }) => (
  <>
    <form className={styles.auth_form} onSubmit={onSubmit}>
      {!isLogin ? (
        <div className="input_login">
          <PrimaryInput
            className={styles.input_login}
            id="name"
            type="name"
            isLinear={true}
            isFullWidth={true}
            placeholder={'Your name'}
            name="name"
            required
            pattern=".*\S+.*"
            title="This field is required"
            onChange={onChange}
          />
          <div className={styles.select}>
            <PrimarySelect
              className={styles.select_login}
              label="I'm a"
              id="type"
              name="type"
              onChange={onChange}
              isLinear={true}
              isFullWidth={true}
              placeholder="Your title"
              value={type || undefined}
              options={userTypes}
            />
          </div>
        </div>
      ) : null}
      <div className={styles.login_form}>
        <PrimaryInput
          className={styles.email}
          id="email"
          type="email"
          isLinear={true}
          isFullWidth={true}
          placeholder={'Email'}
          name="email"
          required
          onChange={onChange}
        />
        <PrimaryInput
          id="password"
          type="password"
          isLinear={true}
          isFullWidth={true}
          placeholder={'Password'}
          name="password"
          required
          onChange={onChange}
        />
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
            <>
              <LargeButton
                className={styles.button_submit}
                loading={loading}
                htmlType="submit"
                text={
                  <p style={{ margin: 0 }}>
                    Let&apos;s rock!
                    {loading && (
                      <span className="ml-2">
                        <Spin indicator={antIcon} />
                      </span>
                    )}
                  </p>
                }
                id="signUpBtnId"
              />
            </>
          ) : (
            <>
              <LargeButton
                className={styles.button_submit}
                htmlType="submit"
                loading={loading}
                text={'Start your Jorney'}
                id="signInBtnId"
              />
            </>
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
            <span className={cn(styles.google_btn, styles.btn)}>
              <SvgGoogle width="26px" height="26px" /> Sign in with Google
            </span>
          </Link>
          <Link href="/api/v2/auth/facebook">
            <span className={cn(styles.google_btn, styles.btn)}>
              <SvgWhiteFacebook width="26px" height="26px" /> Sign in with Facebook
            </span>
          </Link>
          <div className={styles.policy}>
            <Link href="">
              <span>By continuing, you agree to the Terms of Service and Privacy Policy MangaFy</span>
            </Link>
          </div>
          <div className={styles.new_account}>
            <span>No account yet ?</span>
            <Link href="">
              Create account here 
            </Link>
          </div>
        </div>
        
      </>
      {/* ) : null} */}
    </form>
  </>
);

AuthForm.propTypes = {
  type: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

AuthForm.defaultProps = {
  type: null,
  loading: false,
};

export default AuthForm;
