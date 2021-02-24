import React from 'react';

import cn from 'classnames';
import HugeButton from 'components/ui-elements/huge-button';
import Link from 'next/link';

import styles from './styles.module.scss';

const CollaborationMainScreen = () => (
  <>
    <div className={styles.box}>
      <div className={'container'}>
        <div className={styles.box__wrapper}>
          <div className={styles.box__bgImgCloud}>
            <img src="/img/CollaborationMainScreen__cloud.png" alt="" />
          </div>
          <div className={cn(styles.box__bgImgs, styles.box__bgImgs_style1)}>
            <div className={styles.box__bgImgs_style1__img1}>
              <img src="/img/CollaborationMainScreen__bgImgs_style1__img1.png" alt="" />
            </div>
            <div className={styles.box__bgImgs_style1__img2}>
              <img src="/img/CollaborationMainScreen__bgImgs_style1__img2.png" alt="" />
            </div>
          </div>
          <div className={styles.box__content}>
            <div className={styles.box__title_wrap}>
              <div className={styles.box__title}>
                <p className={styles.box__title_text}>
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
                <HugeButton text="Post Collaborations" disabled={false} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.box}>
      <div className={'container'}>
        <div className={styles.box__wrapper}>
          <div className={styles.box__bgImgCloud}>
            <img src="/img/CollaborationMainScreen__cloud.png" alt="" />
          </div>
          <div className={cn(styles.box__bgImgs, styles.box__bgImgs_style2)}>
            <div className={styles.box__bgImgs_style2__img1}>
              <img src="/img/CollaborationMainScreen__bgImgs_style2__img1.png" alt="" />
            </div>
            <div className={styles.box__bgImgs_style2__img2}>
              <img src="/img/CollaborationMainScreen__bgImgs_style2__img2.png" alt="" />
            </div>
          </div>
          <div className={styles.box__content}>
            <div className={styles.box__title_wrap}>
              <div className={styles.box__title}>
                <p className={styles.box__title_text}>Go MangaFY</p>
              </div>
              <div className={styles.box__description}>
                <p className={styles.box__description_text}>
                  Join a global community of millions of <br />
                  comics frelancers
                </p>
              </div>
              <div className={styles.box__users}>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user1.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user2.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user3.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user4.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user5.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user6.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user7.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user8.png" alt="" />
                </i>
                <i className={styles.box__users_icon}>
                  <img src="/img/CollaborationMainScreen-user9.png" alt="" />
                </i>
              </div>
            </div>
            <div className={styles.box__link}>
              <Link href="/sign-in">
                <HugeButton text="Join to MangaFY" disabled={false} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default CollaborationMainScreen;
