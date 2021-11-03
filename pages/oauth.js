import React, { useEffect } from 'react';

import auth from 'api/auth';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router from 'next/router';
import { FEATHERS_COOKIE, setClientCookie, store } from 'store';
import myAmplitude from 'utils/amplitude';

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
          event_type,
          user_id: user._id,
          user_properties: {
            ...user,
          },
        },
      ];
      myAmplitude(data);
      const getCreateData = user.createdAt.slice(0, -8);
      const getLastLoginData = user.lastLoginDate.slice(0, -8);
      if (getCreateData === getLastLoginData) {
        data[0].event_type = EVENTS.SIGN_UP;
        Router.push(`/profile/${user._id}?editModal=true`);
      } else {
        data[0].event_type = EVENTS.SIGN_IN;
        Router.push('/feed');
      }
      myAmplitude(data);
      return user;
    });
  });

  return <div></div>;
};

export default OAuth;
