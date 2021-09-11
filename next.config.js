// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require('@zeit/next-source-maps')();
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const resolve = require('resolve');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withBabelMinify = require('next-babel-minify')({});

const path = require('path');

const packageJson = require('./version.json');

const SENTRY_DSN = 'https://b3e803fd922a41958f07d5aee50b8bc8@o359272.ingest.sentry.io/5509366';
const SENTRY_ORG = 'mangafy';
const SENTRY_PROJECT = 'mangafy-next';
const SENTRY_AUTH_TOKEN = 'f5ce7c24228611eb947b4201c0a8d030';
const NODE_ENV = 'dev';
const VERCEL_GITHUB_COMMIT_SHA = 'VERCEL_GITHUB_COMMIT_SHA';
const VERCEL_GITLAB_COMMIT_SHA = 'VERCEL_GITLAB_COMMIT_SHA';
const VERCEL_BITBUCKET_COMMIT_SHA = 'VERCEL_BITBUCKET_COMMIT_SHA';

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA || VERCEL_GITLAB_COMMIT_SHA || VERCEL_BITBUCKET_COMMIT_SHA;

const aliases = {
  // '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
  lodash: path.resolve(__dirname, 'node_modules/lodash'),
  debug: path.resolve(__dirname, 'node_modules/debug'),
  ms: path.resolve(__dirname, 'node_modules/ms'),
  react: path.resolve(__dirname, 'node_modules/react'),
  'react-is': path.resolve(__dirname, 'node_modules/react-is'),
};

// styled jsx will fail without it
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {};
}

const nextConfigs = {
  experimental: {
    scss: true,
  },
  images: {
    domains: ['mangafy.club', 'ui-avatars.com', 'mangafy.imgix.net'],
    loader: 'imgix',
    path: 'https://mangafy.imgix.net',
  },
  future: {
    webpack5: true,
  },
  webpack(webpackConfig, options) {
    Object.assign(webpackConfig.resolve.alias, aliases);

    webpackConfig.plugins.push(
      new MomentLocalesPlugin({
        localesToKeep: ['es-us'],
      })
    );
    webpackConfig.plugins.push(new DuplicatePackageCheckerPlugin());

    if (options.defaultLoaders.babel.options.plugins === undefined) {
      options.defaultLoaders.babel.options.plugins = [];
    }
    options.defaultLoaders.babel.options.plugins.push([
      'import',
      {
        libraryName: 'antd',
      },
    ]);

    webpackConfig.module.rules.push({
      test: /\.(js|jsx)$/,
      use: [options.defaultLoaders.babel],
      exclude: /node_modules/,
    });
    webpackConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: Object.values(aliases),
      use: [
        {
          ...options.defaultLoaders.babel,
          options: {
            ...options.defaultLoaders.babel.options,
          },
        },
      ],
      exclude: /node_modules/,
    });

    webpackConfig.optimization.minimize = true;
    webpackConfig.optimization.minimizer = [];
    if (Array.isArray(webpackConfig.optimization.minimizer)) {
      webpackConfig.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
    }

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

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    // if (
    //   SENTRY_DSN &&
    //   SENTRY_ORG &&
    //   SENTRY_PROJECT &&
    //   SENTRY_AUTH_TOKEN &&
    //   COMMIT_SHA &&
    //   NODE_ENV === 'production'
    // ) {
    //   webpackConfig.plugins.push(
    //     new SentryWebpackPlugin({
    //       include: '.next',
    //       ignore: ['node_modules'],
    //       urlPrefix: '~/_next',
    //       configFile: './sentryclirc',
    //       // release: COMMIT_SHA
    //     })
    //   );
    // }

    webpackConfig.externals = [];

    if (options.isServer) {
      // add antd to https://github.com/zeit/next.js/blob/canary/build/webpack.js#L34-L59
      // This makes sure paths are relative when pushing build to other systems
      webpackConfig.externals.push((context, request, callback) => {
        resolve(request, { basedir: options.dir, preserveSymlinks: true }, (err, res) => {
          if (err) {
            return callback();
          }

          // Default pages have to be transpiled
          if (res.match(/node_modules[/\\]next[/\\]dist[/\\]pages/)) {
            return callback();
          }

          // Webpack itself has to be compiled because it doesn't always use module relative paths
          if (
            res.match(/node_modules[/\\]webpack/) ||
            res.match(/node_modules[/\\]css-loader/) ||
            res.match(/node_modules[/\\]antd/)
          ) {
            return callback();
          }

          if (res.match(/node_modules[/\\].*\.js$/)) {
            return callback(null, `commonjs ${request}`);
          }

          callback();
        });
      });
    }

    return webpackConfig;
  },
  crossOrigin: 'anonymous',
  assetPrefix: process.env.ASSET_PREFIX || '',
  generateBuildId: () => {
    const buildId =
      process.env.LOCAL === 'true' ? new Date().getTime().toString() : packageJson.version;
    return buildId;
  },
};

module.exports = withPlugins([[withBundleAnalyzer], [withBabelMinify]], nextConfigs);
