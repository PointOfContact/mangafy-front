import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

const fetch = require('node-fetch');

// import socketio from '@feathersjs/socketio-client';
// import io from 'socket.io-client';

//
// TODO get rid of this hardcoded API_ENDPOINT, make it configurable !
//
// Note: the standard Feathers config approach doesn't work because this is next.js, so it has to work both on client and server
// (that's "universal Javascript" biting us again - really complicating a lot of things!) - an approach we could use is this:
//
// https://github.com/zeit/next.js/tree/canary/examples/with-universal-configuration-runtime
//
// const API_ENDPOINT = 'https://mangafy.club';
const API_ENDPOINT = 'http://localhost:3030';

// const socket = io(API_ENDPOINT, {
//   allowUpgrades: true,
//   forceNew: true,
//   pingTimeout: 3000,
//   pingInterval: 500,
// });

// "forceNew": https://github.com/feathersjs/authentication/issues/662

// We don't configure JWT storage, the next.js app (which is separate from the Feathers backend) manages the JWT via a cookie
const options = { path: 'api/v2/authentication' };
const restClient = rest(API_ENDPOINT);

// const client = feathers().configure(socketio(socket)).configure(auth(options));

const client = is_server()
  ? feathers().configure(restClient.fetch(fetch)).configure(auth(options))
  : feathers().configure(restClient.fetch(window.fetch)).configure(auth(options));

client.service('api/v2/users');
client.service('/counters');
client.API_ENDPOINT = API_ENDPOINT;
client.UPLOAD_URL = `${API_ENDPOINT}/api/v2/uploads/`;
client.getCookie = getCookie;
export default client;

function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function is_server() {
  return !(typeof window !== 'undefined' && window.document);
}
