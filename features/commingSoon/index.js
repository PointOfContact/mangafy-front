import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import FooterLogin from 'features/footerLogin';
import Head from 'next/head';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CommingSoon = (props) => {
  const { user } = props;

  return (
    <div className="">
      <Head>
        <title>MangaFY Pricing</title>
        <meta name="MangaFY Pricing"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header path="error" user={user} />
        <div className={styles.comming_page}>
          <div className={styles.page_inner}>
            <Imgix
              width={290}
              height={305}
              layout="fixed"
              src="https://mangafy.club/img/coming_soon.webp"
              alt=""
            />
            <div className={styles.page_title}>Coming soon</div>
            <div className={styles.page_description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <LargeButton className={styles.btn__submit} text="MangaFY Home" />
          </div>
        </div>
        <Footer />
        <FooterLogin user={user} />
      </main>
    </div>
  );
};

CommingSoon.propTypes = {
  user: PropTypes.object,
};

CommingSoon.defaultProps = {
  user: null,
};

export default CommingSoon;
