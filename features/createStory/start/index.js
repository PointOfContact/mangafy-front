import React, { useEffect, useRef, useCallback } from 'react';

import { notification } from 'antd';
import Footer from 'components/footer';
import Header from 'components/header';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { adaptData, timeout } from './utils';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

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
        await timeout(2000);
        const { answers } = await api.service('/api/v2/typeform').get(event.response_id);
        const mangaStory = adaptData(answers, genres);
        const response = await api.service('/api/v2/manga-stories').create(mangaStory, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        const data = [
          {
            platform: 'WEB',
            event_type: EVENTS.ADDED_GENRES,
            user_id: user._id,
            user_properties: {
              ...user,
            },
          },
        ];
        amplitude.track(data);
        // eslint- disable-next-line no-underscore-dangle
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
        <title>Focus on things that are really important</title>
        <meta name="description" content="MangaFY Expand your planning horizons." />
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
