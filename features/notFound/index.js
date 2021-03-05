import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import LargeButton from 'components/ui-elements/large-button';
import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.scss';

const Error = () => (
  <div className="">
    <Head>
      <title>Oooops...</title>
      <meta name="description" content="Not to worry! Let's find a better place for you to go" />
    </Head>
    <main>
      <Header path="comming-soon" />
      <div className={styles.error_page}>
        <div className={styles.page_inner}>
          <img src="/img/error.png"></img>
          <div className={styles.error_title}>404</div>
          <div className={styles.page_title}>Ooops, we lost this page</div>
          <div className={styles.page_description}>
            We searched high and low but couldn't find what you are looking for.
            <br /> Not to worry! Let's find a better place for you to go
          </div>
          <Link href="/">
            <LargeButton className={styles.btn__submit} text="MangaFY Home" />
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  </div>
);

export default Error;
