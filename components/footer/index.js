import React from 'react';

import styles from './styles.module.scss';

const Footer = ({}) => (
  <footer className={`${'footer' + ' '}${styles.footer}`}>
    <div className={'container'}>
      <div className={styles.footer__wrap}>
        <div className={styles.footer__left}>
          <a href="#">
            <img src="img/logo-new.png" alt=""></img>
          </a>
          <div className={styles.footerLeft__links}>
            <p className={styles.footerLeft__subtitle}>In collaboration we trust</p>
            <p className={styles.footerLeft__descr}>
              Manga is the world’s leading community for comics entusiats to create share, grow, and
              get published.
            </p>
            <div className={styles.footer__soc}>
              <a href="" className={styles.footer__socBtn}>
                <img src="icons/fb-new.svg" alt=""></img>
              </a>
              <a href="" className={styles.footer__socBtn}>
                <img src="icons/tw-new.svg" alt=""></img>
              </a>
              <a href="" className={styles.footer__socBtn}>
                <img src="icons/inst-new.svg" alt=""></img>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footer__nav}>
          <div className={styles.footer__item1}>
            <div className={styles.footer__itemTitle}>For dreames</div>
            <a href="#" className={styles.footer__itemLink}>
              Go PRO
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Find Collaboration
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Post Collaboration
            </a>
          </div>

          <div className={styles.footer__item2}>
            <div className={styles.footer__itemTitle}>Resources</div>
            <a href="#" className={styles.footer__itemLink}>
              Resources
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Supports
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Terms of service
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Privacy policy
            </a>
          </div>

          <div className={styles.footer__item3}>
            <div className={styles.footer__itemTitle}>Browse</div>
            <a href="#" className={styles.footer__itemLink}>
              Find Collaboration
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Find Commisions Work
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Post Commission Work
            </a>
          </div>

          <div className={styles.footer__item4}>
            <div className={styles.footer__itemTitle}>Company</div>
            <a href="#" className={styles.footer__itemLink}>
              About
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Careers
            </a>
            <a href="#" className={styles.footer__itemLink}>
              We open for collaborations
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Terms of service
            </a>
            <a href="#" className={styles.footer__itemLink}>
              Privacy policy
            </a>
          </div>

          <div className={styles.footer__item5}>
            <div className={styles.footer__itemTitle}>Comics assets</div>
            <a href="#" className={styles.footer__itemLink}>
              Shop Creative Market
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
