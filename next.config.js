const withPlugins = require('next-compose-plugins');
const packageJson = require('./version.json');
const dotenv = require('dotenv');


dotenv.config({ path: `${process.env.ENVIRONMENT}` });


function webpack(webpackConfig, options) {

    webpackConfig.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
    // @sentry/node will run in a Node.js environment. @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      webpackConfig.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return webpackConfig;
}

const nextConfigs = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['mangafy.club', 'ui-avatars.com', 'mangafy.imgix.net'],
    loader: 'imgix',
    path: 'https://mangafy.imgix.net',
  },
  webpack,
  crossOrigin: 'anonymous',
  assetPrefix: process.env.ASSET_PREFIX || '',
  generateBuildId: () => {
    const buildId =
      process.env.LOCAL === 'true' ? new Date().getTime().toString() : packageJson.version;
    return buildId;
  },
};


module.exports = withPlugins([], nextConfigs);
