import client from 'api/client';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import cn from 'classnames';
import Avatar from 'components/Avatar';
import { notification } from 'antd';

const ShotHeader = ({ user, shot, className, allShots, isOwn, isSubscribed, subscribe }) => {
  function getActiveShotIndex() {
    return allShots.findIndex((s) => s._id === shot._id);
  }

  function getPrevShot() {
    const index = getActiveShotIndex();
    if (index === 0) {
      return null;
    } else {
      return allShots[index - 1];
    }
  }

  function getNextShot() {
    const index = getActiveShotIndex();
    if (index === allShots.length - 1) {
      return null;
    } else {
      return allShots[index + 1];
    }
  }

  const prevShotId = getPrevShot()?._id;
  const nextShotId = getNextShot()?._id;

  return (
    <div className={className}>
      <div className={styles.header}>
        <div className={styles.header__shot}>
          <div className={styles.header__image}>
            <Avatar image={shot?.authorInfo?.avatar} text={shot?.authorInfo?.name[0]} size={80} />
          </div>

          <div className={styles.header__info}>
            <div className={styles.header__title}>{shot?.title}</div>

            <div className={styles.header__subtitle}>
              <Link href={'/profile/' + shot?.authorInfo?._id}>
                <a className={styles.header__author}>{shot?.authorInfo?.name}</a>
              </Link>
              {!isOwn && (
                <>
                  <span>{' | '}</span>
                  <button className={styles.header__subscribe} onClick={subscribe}>
                    {isSubscribed ? 'Unfollow' : 'Follow'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.header__arrows}>
          <Link href={'/shot/' + prevShotId}>
            <a className={cn(styles.header__arrow, !prevShotId && styles.header__arrow_disabled)}>
              <ArrowDown2 />
            </a>
          </Link>
          #{getActiveShotIndex() + 1}
          <Link href={'/shot/' + nextShotId}>
            <a className={cn(styles.header__arrow, !nextShotId && styles.header__arrow_disabled)}>
              <ArrowDown2 />
            </a>
          </Link>
        </div>

        {/* <Button rounded pink className={styles.header__tip}>
          Tip
        </Button> */}
      </div>

      <div className={styles.header__mobileArrowsAndTip}>
        <div className={cn(styles.header__arrows, styles.header__arrows_mobile)}>
          <Link href={'/shot/' + prevShotId}>
            <a className={cn(styles.header__arrow, !prevShotId && styles.header__arrow_disabled)}>
              <ArrowDown2 />
            </a>
          </Link>
          #{getActiveShotIndex() + 1}
          <Link href={'/shot/' + nextShotId}>
            <a className={cn(styles.header__arrow, !nextShotId && styles.header__arrow_disabled)}>
              <ArrowDown2 />
            </a>
          </Link>
        </div>
        {/* <Button rounded pink sm className={cn(styles.header__tip, styles.header__tip_mobile)}>
          Tip
        </Button> */}
      </div>
    </div>
  );
};

export default ShotHeader;
