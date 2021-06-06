import React from 'react';

import Imgix from 'components/imgix';
import HugeButton from 'components/ui-elements/huge-button';
import Link from 'next/link';

import styles from './styles.module.scss';

const ProfilesHeader = () => (
  <div className={styles.box}>
    <div className={'container'}>
      <div className={styles.box__container}>
        <div className={styles.box__bgImg}>
          <Imgix
            priority
            layout="intrinsic"
            width={428}
            height={294}
            src="https://mangafy.club/img/people.webp"
            alt=""
          />
        </div>
        <div className={styles.box__content}>
          <div className={styles.box__title_wrap}>
            <div className={styles.box__title}>
              <p>Collect them All!</p>
            </div>
            <div className={styles.box__description}>
              <p>All manga enthusiast, all genres, one Place - MangaFY</p>
            </div>
          </div>
          <div className={styles.box__link}>
            <Link href="/sign-in">
              <span>
                <HugeButton text="Join MangaFy" disabled={false} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfilesHeader;
