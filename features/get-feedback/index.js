import React, { useCallback, useEffect, useRef } from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import { EVENTS } from 'helpers/amplitudeEvents';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import PropTypes from 'prop-types';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Start = ({ user }) => {
  const typeformRef = useRef(null);

  const onSubmit = useCallback(async (event) => {
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.ADD_FEEDBACK,
        event_properties: { response_id: event.response_id },
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
    // eslint- disable-next-line no-underscore-dangle
    Router.push(`/`);
  });

  useEffect(() => {
    import('@typeform/embed').then((typeformEmbed) => {
      typeformEmbed.makeWidget(
        typeformRef.current,
        `https://mangafy.typeform.com/to/V9Wd5WAY?userId=${user._id}`,
        {
          hideFooter: true,
          hideHeaders: true,
          opacity: 50,
          onSubmit,
        }
      );
    });
  }, [typeformRef, onSubmit]);

  return (
    <>
      <NextSeo
        title="Focus on things that are really important"
        description="MangaFY Expand your planning horizons."
        canonical=""
        openGraph={{
          url: '',
          title: '',
          description: '',
          images: [
            {
              url: '',
              width: 800,
              height: 600,
              alt: '',
            },
          ],
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div>
        <Header path="create-a-story/start" user={user} />
        <div ref={typeformRef} style={{ height: '100vh', width: '100%' }}></div>
        <Footer />
      </div>
    </>
  );
};

Start.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Start;
