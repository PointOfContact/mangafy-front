import React from 'react';

import SvgHeartNew from 'components/icon/HeartNew';

import styles from './styles.module.scss';

const FooterPolicy = () => (
  <div className={styles.footerPolicy}>
    <div className={'container'}>
      <div className={styles.wrap}>
        <div className={styles.wrap__left}>© 2021 MangaFy Inc. All rights reserved</div>
        <div className={styles.wrap__center}>
          <span>Made with </span>
          <SvgHeartNew width="13px" height="13px" />
        </div>
        <div className={styles.wrap__right}></div>
      </div>
    </div>
  </div>
);
export default FooterPolicy;
