import React from 'react';

import '../styles/styles.sass';
import 'antd/dist/antd.min.css';
import * as Sentry from '@sentry/node';
import { notification } from 'antd';

Sentry.init({
  enabled: process.env.SENTRY_ENABLED,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, err }) {
  notification.config({
    placement: 'topRight',
    top: 120,
    duration: 3,
  });
  return <Component {...pageProps} err={err} />;
}
