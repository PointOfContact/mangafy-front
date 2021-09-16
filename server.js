const { createServer } = require('http');
const { parse } = require('url');

const axios = require('axios');
const next = require('next');
const sitemap = require('nextjs-sitemap-generator'); // Import the package

const dev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';
const app = next({ dev });
const handle = app.getRequestHandler();

const extraPaths = [];

axios
  .get('https://mangafy.club/api/v2/manga-stories?$limit=1000&$sort[createdAt]=-1')
  .then((res) => {
    if (!res || !res.data || !res.data.data) return;
    extraPaths.push(...res.data.data.map(({ _id }) => `/manga-story/${_id}`));
    return axios.get(
      'https://mangafy.club/api/v2/users?$select=_id&$limit=1000&$sort[createdAt]=-1'
    );
  })
  .then((res) => {
    if (!res || !res.data || !res.data.data) return;
    extraPaths.push(...res.data.data.map(({ _id }) => `/profile/${_id}`));
    sitemap({
      alternateUrls: {},
      baseUrl: 'https://mangafy.club',
      ignoredPaths: [
        '[pid]',
        'index',
        'editPopup',
        'loading',
        'menuLinks',
        'mobileVersion',
        'modals',
        'oauth',
        'password-success-changed',
      ],
      extraPaths: ['/', ...extraPaths],
      pagesDirectory: `${__dirname}//pages`,
      targetDirectory: 'public/',
      sitemapFilename: 'sitemap.xml',
      nextConfigPath: `${__dirname}//next.config.js`,
    });
  })
  .catch(console.log);

/* 
  Here you is you have to use the sitemap function.
  Using it here you are allowing to generate the sitemap file
  only once, just when the server starts.
*/

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) {
      console.log('Err in server.js:', err);
      throw err;
    }
    console.log('> Ready on http://localhost:3000');
  });
});
