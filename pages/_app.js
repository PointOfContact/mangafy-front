import React from 'react';

import '../styles/styles.sass';
import '../styles/antd.css';
import 'react-chat-elements/dist/main.css';
import * as Sentry from '@sentry/node';

// if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
Sentry.init({
  enabled: true,
  dsn: 'https://b3e803fd922a41958f07d5aee50b8bc8@o359272.ingest.sentry.io/5509366',
});
// }
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, err }) {
  return <Component {...pageProps} err={err} />;
}
