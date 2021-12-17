import React, { useState } from 'react';

import cn from 'classnames';
import AuthForm from 'components/authForm';
import Header from 'components/header';
import Imgix from 'components/imgix';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { register } from 'store';
import myAmplitude, { setUser } from 'utils/amplitude';

import styles from './styles.module.scss';

const Register = ({ user }) => {
  const defaultState = {
    name: '',
    password: '',
    errorMessage: '',
    type: userTypes[0].key,
    disabled: false,
    err: '',
  };

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(defaultState);
  const { name, email, password, errorMessage, type, err, disabled } = state;

  const handleOnChange = (e) => {
    if (!e.target) {
      setState({
        ...state,
        type: e,
        errorMessage: '',
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        errorMessage: '',
      });
    }
  };

  const history = useRouter();

  const handleRegisterSubmit = (e) => {
    setState({
      ...state,
      errorMessage: '',
    });

    const { inviteId } = qs.parse(window.location.search);
    setLoading(true);
    const payload = {
      name: e.user.name,
      type,
      email: e.user.email,
      password: e.user.password,
      inviteId,
    };

    register(payload)
      .then(({ user: newUser }) => {
        history.push(`/profile/${newUser?._id}?editModal=true`);

        setLoading(false);
        const data = [
          {
            event_type: EVENTS.SIGN_IN,
            event_properties: { strategy: 'local', userData: newUser, type: EVENTS.SIGN_UP },
          },
        ];
        setUser(newUser);
        myAmplitude(data);
        // info({
        //   className: 'MangaFY',
        //   title: <h3 className={styles.modalTitle}>Welcome to MangaFY</h3>,
        //   icon: '',
        //   width: '100%',
        //   maskClosable: true,
        //   afterClose: history.push(`/profile/${user._id}`),
        //   okText: <LargeButton onClick={() => routeChange()} text="Create Your First Story" />,
        //   style: { top: 120, maxWidth: '1000px' },
        //   content: (
        //     <div className={styles.publishedModal}>
        //       <p>
        //         Whether you have a story to tell or a cool illustration, our platform is here to
        //         ensure you take your ideas forward. Share your stories and build the graphic novel
        //         you always dreamt about (plus, our awesome community to interact with)
        //       </p>
        //     </div>
        //   ),
        //   onOk() {},
        // });
      })
      .catch((error) => {
        setLoading(false);
        setState({
          ...state,
          errorMessage: error.message,
        });
      });
  };

  return (
    <>
      <NextSeo
        title="Welcome! - MangaFY Community"
        description="MangaFY is a community of amazing webcomics and webtoon creators"
      />
      <ButtonToTop />
      <div className={styles.bg}>
        <Imgix layout="fill" src={'https://mangafy.club/img/login-bg.webp'} />
      </div>
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header user={user} path="sign-up" />
          <main className={cn(styles.box, styles.boxBg)}>
            <div className={cn(styles.container, 'container')}>
              <div className={styles.box__wrapper}>
                <div className={styles.content}>
                  <div className={styles.box__title_wrap}>
                    <div className={styles.box__title}>
                      <h2 className={styles.box__title_text}>Welcome! - MangaFY Community</h2>
                    </div>
                    <div className={styles.box__hr}></div>
                    <div className={styles.box__description}>
                      <p className={styles.box__description_text}>
                        MangaFY is a community of amazing webcomics and webtoon creators
                      </p>
                    </div>
                    <div className={styles.box__hr}></div>
                  </div>
                  <div className={styles.box__form}>
                    <AuthForm
                      disabled={disabled}
                      {...{
                        type,
                        name,
                        email,
                        password,
                        errorMessage,
                        loading,
                        onChange: handleOnChange,
                        onSubmit: handleRegisterSubmit,
                        setState,
                        state,
                      }}
                    />
                    {err && <p>{err}</p>}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* <LoginFooter acaunt={true} />
        <FooterPolicy /> */}
      </div>
    </>
  );
};

Register.propTypes = {
  user: PropTypes.object,
};

Register.defaultProps = {
  user: null,
};

export default Register;
