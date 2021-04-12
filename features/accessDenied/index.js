import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.scss';

const AccessDenied = () => (
  <div className="">
    <Head>
      <title>Access Denied</title>
      <meta name="description" content="Sorry, this confidential information is private" />
    </Head>
    <main>
      <Header path="comming-soon" />
      <div className={styles.error_page}>
        <div className={styles.page_inner}>
          <Imgix
            width={340}
            height={295}
            layout="fixed"
            src="https://mangafy.club/img/error.webp"
            alt=""
          />
          {/* <div className={styles.error_title}>404</div> */}
          <div className={styles.page_title}>Access Denied</div>
          <div className={styles.page_description}>
            Sorry, this confidential information is private.
          </div>
          <Link href="/">
            <a>
              <LargeButton className={styles.btn__submit} text="MangaFY Home" />
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  </div>
);

export default AccessDenied;
