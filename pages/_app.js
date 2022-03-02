import React, { useEffect } from 'react';

import '../styles/styles.sass';
import 'antd/dist/antd.min.css';
import { load } from '@fingerprintjs/fingerprintjs';
import * as Sentry from '@sentry/node';
import { notification } from 'antd';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';
import '../styles/landing/landing.css';

import { initAmplitude } from '../utils/amplitude';

Sentry.init({
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, err }) {
  notification.config({
    placement: 'topRight',
    top: 120,
    duration: 3,
  });

  useEffect(() => {
    load()
      .then((fpPromise) => fpPromise.get())
      .then((result) => {
        // This is the visitor identifier:
        const { visitorId } = result;
        console.log('visitorIdvisitorIdvisitorId', visitorId);
        initAmplitude(visitorId, pageProps?.user);
      });
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    const handleRouteChangeError = (err, url) => {
      console.log('Errrorrr-------', err);
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`);
      }
    };

    router.events.on('routeChangeError', handleRouteChangeError);

    const handleRouteChangeComplete = (url, { shallow }) => {
      console.log(
        `App is changed complete to ${url} ${shallow ? 'with' : 'without'} shallow routing`
      );
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeError', handleRouteChangeError);
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://mangafy.club/',
          site_name: 'MangaFY',
        }}
        facebook={{
          appId: '444070883191700',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} err={err} />
    </>
  );
}
