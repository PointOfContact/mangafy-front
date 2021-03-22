import React from 'react';

import cn from 'classnames';
import SvgFbNew from 'components/icon/FbNew';
import SvgInstNew from 'components/icon/InstNew';
import SvgTwNew from 'components/icon/TwNew';
import Link from 'next/link';

import styles from './styles.module.scss';

const Footer = () => (
  <footer className={cn(styles.footer, 'footer')}>
    <div className={'container'}>
      <div className={styles.footer__wrap}>
        <div className={styles.footer__left}>
          <a href="#">
            <img src="/img/logo-new.png" alt=""></img>
          </a>
          <div className={styles.footerLeft__links}>
            <p className={styles.footerLeft__subtitle}>In collaboration we trust</p>
            <p className={styles.footerLeft__descr}>
              MangaFY is the world’s leading community for comics entusiats to create share, grow,
              and get published.
            </p>
            <div className={styles.footer__soc}>
              <a href="" className={styles.footer__socBtn}>
                <SvgFbNew width="25px" height="25px" />
              </a>
              <a href="" className={styles.footer__socBtn}>
                <SvgTwNew width="25px" height="25px" />
              </a>
              <a href="" className={styles.footer__socBtn}>
                <SvgInstNew width="25px" height="25px" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footer__nav}>
          <div className={styles.footer__item1}>
            <div className={styles.footer__itemTitle}>For dreames</div>
            {/* <Link href="/pricing">
              <a className={styles.footer__itemLink}>Go PRO</a>
            </Link> */}
            <Link href="/collaborations">
              <a className={styles.footer__itemLink}>Find Collaboration</a>
            </Link>
            <Link href="/create-a-story/start">
              <a className={styles.footer__itemLink}>Post Collaboration</a>
            </Link>
          </div>

          <div className={styles.footer__item2}>
            <div className={styles.footer__itemTitle}>Help & Support</div>
            <Link href="/resources">
              <a className={styles.footer__itemLink}>Help & Support</a>
            </Link>
            <Link href="/supports">
              <a className={styles.footer__itemLink}>Guides & tutorials</a>
            </Link>
          </div>

          <div className={styles.footer__item3}>
            <div className={styles.footer__itemTitle}>Browse</div>
            <Link href="/collaborations">
              <a className={styles.footer__itemLink}>Find Collaboration</a>
            </Link>
            <Link href="/collaborations?compensationModel=paid">
              <a className={styles.footer__itemLink}>Find Commisions Work</a>
            </Link>
            <Link href="/create-a-story/start">
              <a className={styles.footer__itemLink}>Post Commission Work</a>
            </Link>
          </div>

          <div className={styles.footer__item4}>
            <div className={styles.footer__itemTitle}>Company</div>
            <Link href="/about">
              <a className={styles.footer__itemLink}>About</a>
            </Link>
            {/* <Link href="/pricing">
              <a className={styles.footer__itemLink}>Pricing</a>
            </Link> */}
            <Link href="/contact-us">
              <a className={styles.footer__itemLink}>We open for collaborations</a>
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
  </footer>
);
export default Footer;
