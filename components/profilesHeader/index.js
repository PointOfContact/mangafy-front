import React from 'react';

import cn from 'classnames';
import HugeButton from 'components/ui-elements/huge-button';
import Link from 'next/link';

import styles from './styles.module.scss';

const ProfilesHeader = () => (
  <div className={styles.box}>
    <div className={'container'}>
      <div className={styles.box__wrapper}>
        <div className={styles.box__bgImgCloud}>
          <img src="/img/CollaborationMainScreen__cloud.webp" alt="" />
        </div>
        <div className={cn(styles.box__bgImgs, styles.box__bgImgs_style1)}>
          <div className={styles.box__bgImgs_style1__img1}>
            <img src="/img/CollaborationMainScreen__bgImgs_style1__img1.webp" alt="" />
          </div>
          <div className={styles.box__bgImgs_style1__img2}>
            <img src="/img/CollaborationMainScreen__bgImgs_style1__img2.webp" alt="" />
          </div>
        </div>
        <div className={styles.box__content}>
          <div className={styles.box__title_wrap}>
            <div className={styles.box__title}>
              <p className={cn(styles.box__title_text, styles.box__title_text__mobile_resize)}>
                Collect them All!
              </p>
            </div>
            <div className={styles.box__description}>
              <p className={styles.box__description_text}>
                All manga entusiast, all genres, one Place - MangaFY
              </p>
            </div>
          </div>
          <div className={styles.box__link}>
            <Link href="/sign-in">
              <a>
                <HugeButton text="Join to MangaFY" disabled={false} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfilesHeader;
