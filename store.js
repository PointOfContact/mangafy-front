// Cookie parser used for extracting the JWT in an SSR scenario
import cookieParser from 'cookie';
import Router from 'next/router';

import auth from './api/auth';

// -- CONSTANTS
export const FEATHERS_COOKIE = 'feathers-jwt';

export const store = {
  user: null,
};

export function login(payload) {
  return auth
    .login(payload.email, payload.password)
    .then((_) => auth.authenticate(_.accessToken, true))
    .then(({ user, jwt }) => {
      setClientCookie(FEATHERS_COOKIE, jwt);
      store.user = user;
      Router.push('/collaborations');
      return user;
    });
}

export function logout() {
  return auth.signout().then(() => {
    clearClientCookie(FEATHERS_COOKIE);
    return {};
  });
}

export function register(payload) {
  return auth
    .register(payload.email, payload.password, payload.name, payload.type)
    .then((_) => auth.login(payload.email, payload.password))
    .then((_) => auth.authenticate(_.accessToken, true))
    .then(({ user, jwt }) => {
      setClientCookie(FEATHERS_COOKIE, jwt);
      return { user, jwt };
    });
}

export function authenticate(jwtFromCookie = null) {
  return auth.authenticate(jwtFromCookie).then(({ user, jwt }) => ({ user, jwt }));
}

// UTILS
export function setClientCookie(name, value) {
  document.cookie = `${name}=${value}`;
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
