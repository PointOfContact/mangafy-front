import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
import { userTypes } from 'helpers/constant';
import Link from 'next/link';
import PropTypes from 'prop-types';

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AuthForm = ({ type, errorMessage, onChange, onSubmit, isLogin, disabled = false }) => (
  <>
    <form className="form_magafy" onSubmit={onSubmit}>
      {!isLogin ? (
        <div className="input_login">
          <div className="sign-in-name">
            <label htmlFor="name">I'm</label>
            <input
              id="name"
              required
              type="text"
              name="name"
              placeholder="Your name"
              onChange={onChange}
            />
          </div>
          <div style={{ marginTop: '5%', borderBottom: '1px solid black' }}>
            <label htmlFor="type">I'm a</label>
            <Select
              id="type"
              placeholder="Your title"
              value={type || undefined}
              bordered={false}
              style={{ width: '100%', marginBottom: 15 }}
              name="type"
              onChange={onChange}>
              {userTypes.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      ) : null}
      <div className="input_login floating-label-wrap">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          required
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={onChange}
        />
      </div>
      <div className="input_login">
        <label htmlFor="password">Password</label>
        <input id="password" required type="password" name="password" onChange={onChange} />
      </div>
      {isLogin && (
        <div className="forgot_password">
          <Link href="/forgot-password">
            <span className="login_links underline">Forgot your password?</span>
          </Link>
        </div>
      )}
      <div className="login_button_container">
        <button
          disabled={disabled}
          id={!isLogin ? 'signUpBtnId' : 'signInBtnId'}
          className="login_btn"
          style={{ minWidth: !isLogin ? 140 : 200 }}>
          {!isLogin ? (
            <p style={{ margin: 0 }}>
              {' '}
              Let's rock!{' '}
              {disabled && (
                <span className="ml-2">
                  <Spin indicator={antIcon} />
                </span>
              )}
            </p>
          ) : (
            'Start your Jorney'
          )}
        </button>
      </div>
      {isLogin ? (
        <>
          <div>
            <p className="sign_in_or_separator">
              <span className="or-text">or</span>
            </p>
          </div>
          <div className="facebook_center">
            <Link href="/api/v2/auth/facebook">
              <span className="fb connect">Sign in with Facebook</span>
            </Link>
            <Link href="/api/v2/auth/google">
              <span className="login-with-google-btn">Sign in with Google</span>
            </Link>
          </div>
        </>
      ) : null}
      <div>
        {!isLogin ? (
          <Link href="/sign-in">
            <span className="login_links">Already have account? Login</span>
          </Link>
        ) : (
          <div className="new_to_manga">
            <span className="login_links_info">New to ManagaFY? </span>
            <Link href="/sign-up">
              <span className="login_links margin-horizontal-5 underline">Join now</span>
            </Link>
          </div>
        )}
      </div>
      <small className="error">
        {errorMessage && isLogin
          ? "Your login info isn't right. Try again, or reset your password if it slipped your mind."
          : errorMessage}
      </small>
    </form>
  </>
);

AuthForm.propTypes = {
  type: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default AuthForm;
