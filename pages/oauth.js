import React, { useEffect } from 'react';

import auth from 'api/auth';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router from 'next/router';
import { FEATHERS_COOKIE, setClientCookie, store } from 'store';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const OAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    auth.authenticate(accessToken, true).then(({ user, jwt }) => {
      setClientCookie(FEATHERS_COOKIE, jwt);
      store.user = user;
      let event_type = EVENTS.O_AUTH;
      if (user.googleId) {
        event_type = EVENTS.O_AUTH_GOOGLE;
      }
      if (user.facebookId) {
        event_type = EVENTS.O_AUTH_FACEBOOK;
      }

      const data = [
        {
          platform: 'WEB',
          event_type,
          user_id: user._id,
          user_properties: {
            ...user,
          },
        },
      ];
      amplitude.track(data);
      Router.push('/collaborations');
      return user;
    });
  });

  return <div></div>;
};

export default OAuth;
