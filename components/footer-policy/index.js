import React from 'react';

import SvgHeartNew from 'components/icon/HeartNew';

import styles from './styles.module.scss';

const FooterPolicy = () => (
  <div className={styles.footerPolicy}>
    <div className={'container'}>
      <div className={styles.wrap}>
        <div className={styles.wrap__left}>
          © 2021 MangaFY Community – A constructive and inclusive platform for webtoon and webcomics
          creators.
        </div>
        <div className={styles.wrap__center}>
          <span>Made with </span>
          <SvgHeartNew width="13px" height="13px" />
        </div>
      </div>
    </div>
  </div>
);
export default FooterPolicy;
