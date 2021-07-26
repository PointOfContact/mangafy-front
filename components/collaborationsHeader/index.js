import React from 'react';

import Imgix from 'components/imgix';
import HugeButton from 'components/ui-elements/huge-button';
import Link from 'next/link';

import styles from './styles.module.scss';

const CollaborationsHeader = () => (
  <div className={styles.box}>
    <Imgix layout="fill" src={'https://mangafy.club/img/colabbg.png'} alt="MangaFy background" />
    <div className={'container'}>
      <div className={styles.box__container}>
        <div className={styles.box__bgImg}>
          <Imgix
            priority
            layout="intrinsic"
            width={378}
            height={284}
            src="https://mangafy.club/img/collab.webp"
            alt="MangaFy collab"
          />
        </div>
        <div className={styles.box__content}>
          <div className={styles.box__title_wrap}>
            <div className={styles.box__title}>
              <p>A platform for community collaboration.</p>
            </div>
            <div className={styles.box__description}>
              <p>Create, make decisions, and get published, together.</p>
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
