import React from 'react';

import Footer from 'components/footer';
import HeaderNew from 'components/headerNew';
import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CommingSoon = (props) => {
  const { user } = props;

  return (
    <div className="">
      <NextSeo
        title=">MangaFY Pricing"
        description=">MangaFY Pricing"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />

      <main>
        <HeaderNew user={user} />
        <div className={styles.comming_page}>
          <div className={styles.page_inner}>
            <Imgix
              width={290}
              height={305}
              layout="fixed"
              src="https://mangafy.club/img/coming_soon.webp"
              alt="MangaFy coming soon"
            />
            <div className={styles.page_title}>Coming soon</div>
            <div className={styles.page_description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <LargeButton className={styles.btn__submit} text="MangaFY Home" />
          </div>
        </div>
        <Footer user={user} />
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
