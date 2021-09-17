/* eslint-disable react/react-in-jsx-scope */
import * as Sentry from '@sentry/node';
import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import { NextSeo } from 'next-seo';
import NextErrorComponent from 'next/error';
import Router from 'next/router';

import styles from './styles.module.scss';

const AppError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  const replacePage = () => {
    Router.push('/contact-us');
  };

  return (
    <>
      <NextSeo
        title="Oooops..."
        description="Not to worry! Let's find a better place for you to go"
      />
      <main>
        <div className={styles.error_page}>
          <div className={styles.page_inner}>
            <Imgix
              width={340}
              height={295}
              layout="fixed"
              src="https://mangafy.club/img/error.webp"
              alt="MangaFy error"
            />
            <div className={styles.page_title}>Argh! 😖 Something’s wrong</div>
            <div className={styles.page_description}>
              Sorry, we’re dealing with a technical issue. Please refresh the page—but note that
              you’ll lose any unsaved changes.
            </div>
            <LargeButton className={styles.btn__submit} text="Refresh page" onClick={replacePage} />
          </div>
        </div>
      </main>
    </>
  );
};

AppError.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });
  errorInitialProps.hasGetInitialPropsRun = true;
  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }
  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
  await Sentry.flush(2000);

  return errorInitialProps;
};

export default AppError;
