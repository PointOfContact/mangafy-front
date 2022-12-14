import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

//
// TODO get rid of this hardcoded API_ENDPOINT, make it configurable !
//
// Note: the standard Feathers config approach doesn't work because this is next.js, so it has to work both on client and server
// (that's "universal Javascript" biting us again - really complicating a lot of things!) - an approach we could use is this:
//
// https://github.com/zeit/next.js/tree/canary/examples/with-universal-configuration-runtime

const API_ENDPOINT = 'http://localhost:3030';
// const API_ENDPOINT = 'https://mangafy.club';

const restClient = rest(API_ENDPOINT);

// We don't configure JWT storage, the next.js app (which is separate from the Feathers backend) manages the JWT via a cookie
const options = { path: 'api/v2/authentication' };

const client = feathers().configure(restClient.fetch(fetch)).configure(auth(options));

client.service('api/v2/users');
client.API_ENDPOINT = API_ENDPOINT;

export default client;
