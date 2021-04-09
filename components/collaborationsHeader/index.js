import React from 'react';

import cn from 'classnames';
import Imgix from 'components/imgix';
import HugeButton from 'components/ui-elements/huge-button';
import Link from 'next/link';

import styles from './styles.module.scss';

const CollaborationsHeader = () => (
  <div className={styles.box}>
    <div className={styles.hid}>
      <div className={styles.box__bgImgCloud}>
        <Imgix
          priority
          width={1190}
          height={608}
          src="https://mangafy.club/img/CollaborationMainScreen__cloud.webp"
          alt=""
        />
      </div>
      <div className={styles.box__bgImgs_style1__img2}>
        <Imgix
          priority
          layout="intrinsic"
          width={629}
          height={644}
          src="https://mangafy.club/img/CollaborationMainScreen__bgImgs_style1__img2.webp"
          alt=""
        />
      </div>
    </div>
    <div className={'container'}>
      <div className={styles.box__wrapper}>
        <div className={cn(styles.box__bgImgs, styles.box__bgImgs_style1)}>
          <div className={styles.box__bgImgs_style1__img1}>
            <Imgix
              priority
              layout="intrinsic"
              width={542}
              height={537}
              src="https://mangafy.club/img/CollaborationMainScreen__bgImgs_style1__img1.webp"
              alt=""
            />
          </div>
        </div>
        <div className={styles.box__content}>
          <div className={styles.box__title_wrap}>
            <div className={styles.box__title}>
              <p className={cn(styles.box__title_text, styles.box__title_text__mobile_resize)}>
                A platform for <br />
                community collaboration.
              </p>
            </div>
            <div className={styles.box__description}>
              <p className={styles.box__description_text}>
                Create, make decisions, and get published, together.
              </p>
            </div>
          </div>
          <div className={styles.box__link}>
            <Link href="/create-a-story/start">
              <span>
                <HugeButton text="Post Collaborations" disabled={false} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CollaborationsHeader;
