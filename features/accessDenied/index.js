import React from 'react';

import Footer from 'components/footer';
import HeaderNew from 'components/headerNew';
import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AccessDenied = ({ user }) => (
  <div className="">
    <NextSeo title="Access Denied" description="Sorry, this confidential information is private" />
    <main>
      <HeaderNew user={user} />
      <div className={styles.error_page}>
        <div className={styles.page_inner}>
          <Imgix
            width={340}
            height={295}
            layout="fixed"
            src="https://mangafy.club/img/error.webp"
            alt="MangaFy error"
          />
          {/* <div className={styles.error_title}>404</div> */}
          <div className={styles.page_title}>Access Denied</div>
          <div className={styles.page_description}>
            Hello there! seems like you&apos;ve been invited to a private collaboration. Once you
            confirm (you can always cancel) you&apos;ll be able to see the project details.
          </div>
          <Link href="/">
            <a>
              <LargeButton className={styles.btn__submit} text="MangaFY Home" />
            </a>
          </Link>
        </div>
      </div>
      <Footer user={user} />
      <FooterLogin user={user} />
    </main>
  </div>
);

AccessDenied.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AccessDenied;
