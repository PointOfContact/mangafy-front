import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import myAmplitude, { setUser } from 'utils/amplitude';
import cn from 'classnames'
import SvgGoogle from 'components/icon/Google';
import SvgWhiteFacebook from 'components/icon/WhiteFacebook';
import PrimaryButton from 'components/ui-elements/button'
import styles from './styles.module.scss'
import { register } from 'store';
import { notification, Form } from 'antd';
import { userTypes } from 'helpers/constant';

const SignUp = ({ storyInfo, goNext, goBack, setStoryInfo }) => {

    const router = useRouter();

    const [loading, setLoading] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        name: null,
        email: null,
        password: null,
        type: 'editor'
    });

    const error = null;

    const refs = {
        name: useRef(null),
        email: useRef(null),
        password: useRef(null),
    }

    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [nameError, setNameError] = useState(true);
    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);

    function nameChangeHandler() {
        if (!refs.name.current) return;
        setRegisterInfo({ ...registerInfo, name: refs.name.current.value.trim()})
    }
    function emailChangeHandler() {
        if (!refs.email.current) return;
        setRegisterInfo({ ...registerInfo, email: refs.email.current.value.trim()})
    }
    function passwordChangeHandler() {
        if (!refs.password.current) return;
        setRegisterInfo({ ...registerInfo, password: refs.password.current.value.trim()})
    }

    function nameBlurHandler() {
        if (nameError) notification.error({
            message: nameError,
            placement: 'bottomLeft',
        })
    }
    function emailBlurHandler() {
        if (emailError) notification.error({
            message: emailError,
            placement: 'bottomLeft',
        })
    }
    function passwordBlurHandler() {
        if (passwordError) notification.error({
            message: passwordError,
            placement: 'bottomLeft',
        })
    }

    function registerHandler() {
        if (nameError) return notification.error({
            message: nameError,
            placement: 'bottomLeft',
        })
        if (emailError) return notification.error({
            message: emailError,
            placement: 'bottomLeft',
        })
        if (passwordError) return notification.error({
            message: passwordError,
            placement: 'bottomLeft',
        })
        setLoading('next');
        register(registerInfo)
            .then(({ user: newUser }) => {
                setLoading(false);
                goNext();
            })
            .catch((error) => {
                setLoading(false)
                notification.error({
                    message: error.message,
                    placement: 'bottomLeft'
                })
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
                                name='name'
                                rules={[
                                    {
                                      required: true,
                                      validator: async (_, name) => {
                                        if (!name) {
                                            return setNameError('Please input your name');
                                        }
                                        if (name.trim().length < 3) {
                                            return setNameError('Name should has more than 3 characters')
                                        }
                                        setNameError(null)
                                      },
                                    },
                                ]}>
                                <input
                                    ref={refs.name}
                                    type='text'
                                    className={cn(
                                        styles.input,
                                        nameError ? styles.input_error : null
                                    )}
                                    placeholder='Your dream name'
                                    onChange={nameChangeHandler}
                                    onBlur={nameBlurHandler}
                                    name="name"
                                ></input>
                            </Form.Item>
                            <Form.Item
                                className={styles.form_item}
                                name='email'
                                rules={[
                                    {
                                        validator: () => setEmailError(null)
                                    },
                                    {
                                        required: true,
                                        message: () => setEmailError('Please input your email')
                                    },
                                    {
                                        type: 'email',
                                        message: () => setEmailError('Please input correct email')
                                    }
                                ]}>
                                <input
                                    ref={refs.email}
                                    type='text'
                                    className={cn(
                                        styles.input,
                                        emailError ? styles.input_error : null
                                    )}
                                    placeholder='Your email'
                                    onChange={emailChangeHandler}
                                    name='email'
                                    onBlur={emailBlurHandler}
                                ></input>
                            </Form.Item>
                            <Form.Item
                                className={styles.form_item}
                                name='password'
                                rules={[
                                    {
                                        validator: async (_, password) => {
                                            if (!password) {
                                                return setPasswordError('Please input your password');
                                            }
                                            if (password.trim().length < 2) {
                                                return setPasswordError('Password should has more than 2 characters')
                                            }
                                            setPasswordError(null)
                                          },
                                    }
                                ]}>
                                <input
                                    ref={refs.password}
                                    type='password'
                                    className={cn(
                                        styles.input,
                                        passwordError ? styles.input_error : null
                                        )}
                                    placeholder='Password'
                                    onChange={passwordChangeHandler}
                                    onBlur={passwordBlurHandler}
                                    name='password'
                                ></input>
                            </Form.Item>
                        </div>
                        <div className={styles.buttons}>
                            <PrimaryButton
                                className={styles.button_blackLoading}
                                onClick={() => {setLoading('prev'); goBack()}}
                                text="Go back"
                                loading={loading === 'prev'}
                                isWhite={true}
                            />
                            <PrimaryButton
                                onClick={registerHandler}
                                text="Create account"
                                loading={loading === 'next'}
                                disabled={loading === 'next'}
                            />
                        </div>
                    </Form>
                    <div className={styles.signUpWith}>
                        <div className={styles.signUpWith__label}>
                            Or sign up with:
                        </div>
                        <div className={styles.signUpWith__buttons}>
                            <Link href="/api/v2/auth/google" >
                                <a className={cn(styles.signUpButton)}>
                                    <SvgGoogle />
                                    Sign up with Google
                                </a>
                            </Link>
                            <Link href="/api/v2/auth/facebook" >
                                <a className={cn(styles.signUpButton)}>
                                    <SvgWhiteFacebook />
                                    Sign up with Facebook
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SignUp