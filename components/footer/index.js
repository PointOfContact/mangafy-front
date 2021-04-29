import React from 'react';

import cn from 'classnames';
import SvgFbNew from 'components/icon/FbNew';
import SvgInstNew from 'components/icon/InstNew';
import SvgTwNew from 'components/icon/TwNew';
import Imgix from 'components/imgix';
import Link from 'next/link';

import styles from './styles.module.scss';

const Footer = () => (
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
              alt=""
            />
          </a>
          <div className={styles.footerLeft__links}>
            <p className={styles.footerLeft__subtitle}>In collaboration we trust</p>
            <p className={styles.footerLeft__descr}>
              MangaFY is the world’s leading community for comics enthusiast to create share, grow,
              and get published.
            </p>
            <div className={styles.footer__soc}>
              <a
                href="https://www.facebook.com/mangafyy"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__socBtn}>
                <SvgFbNew width="25px" height="25px" />
              </a>
              <a href="" target="_blank" rel="noreferrer" className={styles.footer__socBtn}>
                <SvgTwNew width="25px" height="25px" />
              </a>
              <a
                href="https://www.instagram.com/mangaka_ody/"
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
            <Link href="/profiles">
              <a className={styles.footer__itemLink}>Find enthusiast</a>
            </Link>
          </div>

          <div className={styles.footer__item2}>
            <div className={styles.footer__itemTitle}>Help & Support</div>
            <Link href="/contact-us">
              <a className={styles.footer__itemLink}>Help & Support</a>
            </Link>
            <Link href="/resources/manga-paneling-basics">
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
            <Link href="/welcome">
              <a className={styles.footer__itemLink}>Welcome</a>
            </Link>
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
