import client from 'api/client';
import Heart from 'components/icon/new/Heart';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';

const ProfileCard = ({ card }) => {
  const name = card.title;
  const followers = card.likesCount;
  const authorImage = card.logoUrl;
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileCard__images}>
        <img src="img/feedTemp/cover.png" alt="Portfolio image" />
        <img src="img/feedTemp/cover.png" alt="Portfolio image" />
        <img src="img/feedTemp/cover.png" alt="Portfolio image" />
      </div>
      <div className={styles.profileCard__footer}>
        <div className={styles.profileCard__author}>
          <div className={styles.profileCard__avatar}>
            <img
              src={authorImage ? client.UPLOAD_URL + authorImage : 'img/feedTemp/avatar.png'}
              alt="Profile image"
            />
          </div>
          <div className={styles.profileCard__info}>
            <div className={styles.profileCard__name}>{name}</div>
            <div className={styles.profileCard__followers}>{followers + ' followers'}</div>
          </div>
        </div>
        <Button sm rounded iconRight icon={<Heart color="#fff" bold />}>
          Follow
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
