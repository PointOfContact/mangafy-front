import React, { useEffect, useRef, useCallback } from 'react';

import { notification } from 'antd';
import Footer from 'components/footer';
import Header from 'components/header';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { adaptData } from './utils';

const Start = ({ genres, jwt, user }) => {
  const typeformRef = useRef(null);

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const onSubmit = useCallback(
    async (event) => {
      try {
        const { default: api } = await import('api/restClient');
        const { answers } = await api.service('/api/v2/typeform').get(event.response_id);
        const mangaStory = adaptData(answers, genres);
        const response = await api.service('/api/v2/manga-stories').create(mangaStory, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        // eslint-disable-next-line no-underscore-dangle
        Router.push(`/manga-story/${response._id}`);
      } catch (error) {
        // eslint-disable-next-line no-console
        openNotification('error', error?.message || error);
      }
    },
    [genres, jwt]
  );

  useEffect(() => {
    import('@typeform/embed').then((typeformEmbed) => {
      typeformEmbed.makeWidget(typeformRef.current, 'https://form.typeform.com/to/Q2Kciuy6', {
        hideFooter: true,
        hideHeaders: true,
        opacity: 50,
        onSubmit,
      });
    });
  }, [typeformRef, onSubmit]);

  return (
    <>
      <Head>
        <title>Start</title>
      </Head>
      <div>
        <Header path="create-a-story/start" user={user} />
        <div ref={typeformRef} style={{ height: '100vh', width: '100%' }}></div>
        <Footer />
      </div>
    </>
  );
};

Start.propTypes = {
  genres: PropTypes.array.isRequired,
  jwt: PropTypes.string,
  user: PropTypes.object.isRequired,
};

Start.defaultProps = {
  jwt: '',
};

export default Start;
