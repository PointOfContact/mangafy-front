import React from 'react';

import SvgFacebook from 'components/icon/Facebook';
import SvgInstagramColored from 'components/icon/InstagramColored';
import SvgShareFull from 'components/icon/ShareFull';
import SvgWhatsapp from 'components/icon/Whatsapp';

import styles from './styles.module.scss';

export const ShareStoryBoard = () => (
  <div className={styles.shareStoryBoard}>
    <div className={styles.social}>
      <span className={styles.share}>
        <SvgShareFull width="37px" height="37px" />
      </span>
      <span className={styles.fb}>
        <SvgFacebook width="33px" height="33px" />
      </span>
      <span className={styles.in}>
        <SvgInstagramColored width="33px" height="33px" />
      </span>
      <span className={styles.wt}>
        <SvgWhatsapp width="33px" height="33px" />
      </span>
    </div>
    <h4 className={styles.title}>Self publishing platforms</h4>
    <div className={styles.logos}>
      <img src="/img/tapacs.svg" alt="" />
      <img className="webtoon" src="/img/webtoon.svg" alt="" />
      <img src="/img/comico.svg" alt="" />
    </div>
    <div className={styles.logos_mobile}>
      <button type="button">Tapas</button>
      <button type="button">Webtoon</button>
      <button type="button">Comicos</button>
    </div>
    <div className={styles.link}>
      <h4>Link</h4>
      <p>Features of a Webtoon-style comic</p>
    </div>
  </div>
);
