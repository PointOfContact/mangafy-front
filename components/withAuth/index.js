import React from 'react';

import apiClient from 'api/client';
import {
  authenticate,
  FEATHERS_COOKIE,
  getServerCookie,
  setServerCookie,
  clearServerCookie,
} from 'store';

export const PUBLIC = 'PUBLIC';

export function withAuthServerSideProps(getServerSidePropsFunc) {
  return async (context) => {
    const { user, jwt } = await getUser(context);
    if (getServerSidePropsFunc) {
      return { props: { user, data: await getServerSidePropsFunc(context, user, jwt) } };
    }
    return { props: { user, data: { props: { user, jwt } } } };
  };
}

export const withAuthComponent = (Component) => (a) => <Component {...a.data.props} />;

export async function getUser(context) {
  // public page passes the permission `PUBLIC` to this function
  const isPublicPage = PUBLIC == 'permission';
  const { isServer, req, res } = context;

  if (isServer) {
    const jwtFromCookie = getServerCookie(req, FEATHERS_COOKIE);
    const result = await authenticate(jwtFromCookie);

    const newJwt = result.auth.jwt;
    if (newJwt) {
      setServerCookie(res, FEATHERS_COOKIE, newJwt);
    } else {
      clearServerCookie(res, FEATHERS_COOKIE);
    }

    // client side - check if the Feathers API client is already authenticated
  } else if (!apiClient.authenticated) {
    console.log('Need to authenticate client-side');

    // get the JWT (from cookie - set by previous login or server-side authentication) and use it to auth the API client
    const jwt = getServerCookie(req, FEATHERS_COOKIE); // getCookie('feathers-jwt', context.req.headers.cookie)
    return await authenticate(jwt);
  }

  console.log('Need to authenticate client-side');

  // get the JWT (from cookie - set by previous login or server-side authentication) and use it to auth the API client
  const jwt = getServerCookie(req, FEATHERS_COOKIE); // getCookie('feathers-jwt', context.req.headers.cookie)
  return await authenticate(jwt);
  // return { user: null }
}
