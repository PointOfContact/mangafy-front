import React, { useState } from 'react';

import cn from 'classnames';
import SvgFbNew from 'components/icon/FbNew';
import SvgInstNew from 'components/icon/InstNew';
import SvgTwNew from 'components/icon/TwNew';
import Imgix from 'components/imgix';
import ModalCreateProject from 'components/modalCreateProject';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Footer = ({ user }) => {
  const [createProjectModal, showCreateProjectModal] = useState(false);

  return (
    <footer className={cn(styles.footer, 'footer')}>
      <div className={'container'}>
        <div className={styles.footer__wrap}>
          <div className={styles.footer__left}>
            <a href="#">
              <Imgix
                priority
                layout="intrinsic"
                width={185}
                height={30}
                quality={50}
                src="https://mangafy.club/img/logo-new.webp"
                alt="MangaFy logo"
              />
            </a>
            <div className={styles.footerLeft__links}>
              <p className={styles.footerLeft__subtitle}>In collaboration we trust</p>
              <p className={styles.footerLeft__descr}>
                MangaFY is the world’s leading community for comics enthusiast to create share,
                grow, and get published.
              </p>
              <div className={styles.footer__soc}>
                <a
                  href="https://www.facebook.com/mangafyy"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footer__socBtn}>
                  <SvgFbNew width="25px" height="25px" />
                </a>
                <a
                  href="https://twitter.com/be_mangafy"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footer__socBtn}>
                  <SvgTwNew width="25px" height="25px" />
                </a>
                <a
                  href="https://www.instagram.com/be.mangafy/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footer__socBtn}>
                  <SvgInstNew width="25px" height="25px" />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footer__nav}>
            <div className={styles.footer__item1}>
              <div className={styles.footer__itemTitle}>For Dreamers</div>
              {/* <Link href="/pricing">
              <a className={styles.footer__itemLink}>Go PRO</a>
            </Link> */}
              <a className={styles.footer__itemLink} onClick={() => showCreateProjectModal(true)}>
                Post Collaboration
              </a>
              <Link href="profiles">
                <a className={styles.footer__itemLink}>Find enthusiast</a>
              </Link>
            </div>

            <div className={styles.footer__item2}>
              <div className={styles.footer__itemTitle}>Help & Support</div>
              <Link href="/https://www.notion.so/mangafy/What-Why-Documentation-5b00d2d6a82c42d9865fd109c1d1fbf6">
                <a className={styles.footer__itemLink}>Help & Support</a>
              </Link>
              <Link href="/resources">
                <a className={styles.footer__itemLink}>Guides and Tutorials</a>
              </Link>
            </div>

            <div className={styles.footer__item3}>
              <div className={styles.footer__itemTitle}>Browse</div>
              <Link href="/collaborations">
                <a className={styles.footer__itemLink}>Find Collaboration</a>
              </Link>
              <Link href="/collaborations?compensationModel=paid">
                <a className={styles.footer__itemLink}>Find Commission Work</a>
              </Link>
              <a className={styles.footer__itemLink} onClick={() => showCreateProjectModal(true)}>
                Post Commission Work
              </a>
            </div>

            <div className={styles.footer__item4}>
              <div className={styles.footer__itemTitle}>Company</div>
              <Link href="/about">
                <a className={styles.footer__itemLink}>About</a>
              </Link>
              {/* <Link href="/pricing">
              <a className={styles.footer__itemLink}>Pricing</a>
            </Link> */}
              <Link href="/">
                <a className={styles.footer__itemLink}>Welcome</a>
              </Link>
              <Link href="/contact-us">
                <a className={styles.footer__itemLink}>We Are Open For Collaboration</a>
              </Link>
              <Link href="/terms">
                <a className={styles.footer__itemLink}>Terms of service</a>
              </Link>
              <Link href="/privacy-policy">
                <a className={styles.footer__itemLink}>Privacy policy</a>
              </Link>
            </div>

            <div className={styles.footer__item5}>
              <div className={styles.footer__itemTitle}>Comics assets</div>
              <Link href="/coming-soon">
                <a className={styles.footer__itemLink}>Shop Creative Market</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
        user={user}
      />
    </footer>
  );
};

Footer.propTypes = {
  user: PropTypes.object,
};

Footer.defaultProps = {
  user: {},
};

export default Footer;
