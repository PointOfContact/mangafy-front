import React from 'react';

import * as Sentry from '@sentry/node';
import { Layout, Row, Col } from 'antd';
import ButtonToTop from 'components/ui-elements/button-toTop';
import AuthForm from 'components/authForm';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import LoginFooter from 'components/loginFooter';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import Head from 'next/head';
import Router from 'next/router';
import { register } from 'store';

import styles from './styles.module.scss';

const { Content } = Layout;

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Register = () => {
  const defaultState = {
    username: '',
    password: '',
    errorMessage: '',
    type: userTypes[0].key,
    disabled: false,
    err: '',
  };
  const [state, setState] = React.useState(defaultState);
  const { name, email, password, errorMessage, type, err, disabled } = state;

  const handleOnChange = (e) => {
    if (!e.target) {
      setState({
        ...state,
        type: e,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    setState({ disabled: true });
    const payload = {
      name,
      type,
      email,
      password,
    };
    register(payload)
      .then(({ user, jwt }) => {
        setState({ disabled: false });

        const data = [
          {
            platform: 'WEB',
            event_type: EVENTS.SIGN_UP,
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(data);
        const mangaData = JSON.parse(localStorage.getItem('mangaStory'));
        if (!mangaData) {
          Router.push(`/my-profile`);
          return;
        }
        import('api/restClient').then((m) => {
          const res = mangaData.image
            ? m.default.service('/api/v2/uploads').create(
                { uri: mangaData.image },
                {
                  headers: { Authorization: `Bearer ${jwt}` },
                }
              )
            : Promise.resolve(null);
          res
            .then((response) => {
              const data = {
                story: mangaData.project_description,
                introduce: mangaData.project_story,
                description: mangaData.project_story,
                title: mangaData.introduce,
                searchingFor: mangaData.collaborators.map((c) => c.label),
                compensationModel: mangaData.compensation ? 'paid' : 'collaboration',
                country: mangaData.country,
                preferredLanguage: mangaData.prefered_language,
                price: mangaData.compensation,
                launchDate: mangaData.date_picker,
                genresIds: mangaData.manga_genres_obj.map((g) => g._id),
              };
              if (response) {
                data.image = response.id;
              }
              return m.default.service('/api/v2/manga-stories').create(data, {
                headers: { Authorization: `Bearer ${jwt}` },
              });
            })
            .then((res) => {
              const data = [
                {
                  event_type: EVENTS.CREATE_MANGA_STORY,
                  user_id: user._id,
                  user_properties: {
                    ...user,
                  },
                  event_properties: {
                    ...res,
                  },
                },
              ];
              amplitude.track(data);
              localStorage.removeItem('mangaStory');
              Router.push(`/manga-story/${res._id}`);
            })
            .catch((err) => {
              console.log('err', err);
              Router.push(`/my-profile`);
              setState({
                ...state,
                disabled: false,
              });
              Sentry.captureException(err);
            });
        });
      })
      .catch((err) => {
        Sentry.captureException(err);
        setState({
          ...state,
          disabled: false,
        });
        setState({
          ...state,
          err: err.message,
        });
      });
  };

  return (
    <>
      <Head></Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header />
          <main className={styles.box}>
            <div className={"container"}>
              <div className={styles.box__wrapper}>
                <div className={styles.box__img}>
                  <img src="/img/sing-in.svg" alt="" />
                </div>
                <div className={styles.box__title_wrap}>
                  <div className={styles.box__title}>
                    <h2 className={styles.box__title_text}>Make the most of your digital comics life</h2>
                  </div>
                  <div className={styles.box__description}>
                    <p className={styles.box__description_text}>Sign up to get your personalized page connect with enthusiast world wide</p>
                  </div>
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
                      onChange: handleOnChange,
                      onSubmit: handleRegisterSubmit,
                    }}
                  />
                  {err && <p>{err}</p>}
                </div>
              </div>
            </div>
          </main>
        </div>
        <LoginFooter acaunt={true} />
        <FooterPolicy />
      </div>
    </>
  );
};

export default Register;
