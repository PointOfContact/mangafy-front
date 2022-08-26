import React, { useEffect, useRef, useCallback, useState } from 'react';

import { notification } from 'antd';
import Footer from 'components/footer';
import HeaderNew from 'components/headerNew';
import { EVENTS } from 'helpers/amplitudeEvents';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import PropTypes from 'prop-types';
import amplitude from 'utils/amplitude';

import { adaptData, timeout } from './utils';

const Start = ({ genres, jwt, user }) => {
  const typeformRef = useRef(null);
  const [closeTypeForm, setCloseTypeForm] = useState(true);

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomLeft',
    });
  };

  const onSubmit = useCallback(
    async (event) => {
      try {
        const { default: api } = await import('api/restClient');
        await timeout(2000);
        const { answers } = await api.service('/api/v2/typeform').get(event.response_id);
        const { mangaStory, user: newUser } = adaptData(answers, genres);
        const response = await api.service('/api/v2/manga-stories').create(mangaStory, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        newUser &&
          !!newUser.payPalEmail &&
          (await api.service('/api/v2/users').patch(user?._id, newUser, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          }));

        const data = {
          event_type: EVENTS.CREATE_PROJECT_COMPLETE,
        };
        amplitude(data);
        // eslint- disable-next-line no-underscore-dangle
        Router.push(`/manga-story/${response._id}`);

        setTimeout(() => {
          setCloseTypeForm(false);
        }, 5000);
      } catch (error) {
        // eslint-disable-next-line no-console
        openNotification('error', error?.message || error);
      }
    },
    [genres, jwt]
  );

  useEffect(() => {
    import('@typeform/embed').then((typeformEmbed) => {
      typeformEmbed.makeWidget(typeformRef.current, 'https://form.typeform.com/to/Ijyxme1e', {
        hideFooter: true,
        hideHeaders: true,
        opacity: 50,
        onSubmit,
      });
    });
  }, [typeformRef, onSubmit]);

  useEffect(() => {
    const data = {
      event_type: EVENTS.CREATE_PROJECT_START,
    };
    amplitude(data);
  }, []);

  return (
    <>
      <NextSeo
        title="Focus on things that are really important"
        description="MangaFY Expand your planning horizons."
        canonical=""
        openGraph={{
          url: '',
          title: 'Focus on things that are really important',
          description: 'MangaFY Expand your planning horizons.',
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
        <HeaderNew user={user} />
        {closeTypeForm && <div ref={typeformRef} style={{ height: '100vh', width: '100%' }}></div>}
        <Footer user={user} />
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
