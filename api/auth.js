import client from './client';

const auth = {
  authenticate(jwtFromCookie = null, doAuthenticate = false) {
    console.log(
      `authenticate, cookie: ${jwtFromCookie ? 'yes' : 'no'} , doAuthenticate: ${doAuthenticate}`
    );
    client.authenticated = false;

    // If there is no JWT then we don't try to authenticate (because strategy 'jwt' normally needs a JWT), *unless* the
    // parameter "doAuthenticate" is true - this is the case when we logged in just now and need to obtain a (new) JWT
    if (!jwtFromCookie && !doAuthenticate) {
      return Promise.resolve({ user: null, jwt: null });
    }

    let jwt = null;

    return client
      .authenticate({
        strategy: 'jwt',
        accessToken: jwtFromCookie,
      })
      .then((response) => {
        console.log('authenticate successful', response);

        jwt = response.accessToken;
        // set client.authenticated flag TRUE
        client.authenticated = true;

        return Promise.resolve({ user: response.user, jwt: response.accessToken });
      })
      .catch((err) => {
        console.log('authenticate failed', err);

        return Promise.resolve({ user: null, jwt: null });
      });
  },

  signout() {
    console.log('signout');

    return client
      .logout()
      .then(() => {
        // set client.authenticated flag FALSE
        client.authenticated = false;

        console.log('signout successful');
      })
      .catch((err) => {
        console.log('signout failed', err);

        return Promise.reject(err);
      });
  },

  register(email, password, name, type) {
    return client.service('api/v2/users').create({
      email,
      password,
      name,
      type,
      fromWeb: true,
    });
  },

  login(email, password) {
    return client.authenticate({
      strategy: 'local',
      email,
      password,
    });
  },
};

export default auth;
