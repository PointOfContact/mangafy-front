// Cookie parser used for extracting the JWT in an SSR scenario
import cookieParser from 'cookie';
import Router from 'next/router';

import auth from './api/auth';

// -- CONSTANTS
export const FEATHERS_COOKIE = 'feathers-jwt';

export function setClientCookie(cname, cvalue, exdays = 5) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export const store = {
  user: null,
};

export function login(payload) {
  return auth.login(payload.email, payload.password).then((_) => {
    setClientCookie(FEATHERS_COOKIE, _.accessToken, 5);
    store.user = _.user;
    if (payload.page) {
      Router.push(`/${payload.page}`);
    } else {
      Router.push('/');
    }
    return _.user;
  });
}

export function logout() {
  auth.signout();
  store.user = null;
}

export function register(payload) {
  return auth
    .register(payload.email, payload.password, payload.name, payload.type)
    .then((_) => auth.login(payload.email, payload.password))
    .then((_) => auth.authenticate(_.accessToken, true))
    .then(({ user, jwt }) => {
      setClientCookie(FEATHERS_COOKIE, jwt, 5);
      return { user, jwt };
    });
}

export function authenticate(jwtFromCookie = null) {
  return auth.authenticate(jwtFromCookie).then(({ user, jwt }) => ({ user, jwt }));
}

export function clearClientCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function setServerCookie(res, name, value) {
  res.cookie(name, value, {}); // maxAge: 900000, httpOnly: true })
}

export function clearServerCookie(res, name) {
  res.clearCookie(name);
}

export function getServerCookie(req, name) {
  const cookies = extractCookies(req);
  const cookie = cookies ? cookies[name] : null;

  return cookie;
}

function extractCookies(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  return cookieParser.parse(cookies);
}
