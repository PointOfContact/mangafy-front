import React from 'react';

import client from 'api/client';
import cn from 'classnames';
import СardGenres from 'components/card-genres';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import { userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import PropTypes from 'prop-types';

import SvgPortfolio from '../icon/Portfolio';
import styles from './styles.module.scss';

const ProfilesCard = ({ user, genres }) => {
  const profileGenres = genres.filter(
    (item) => user.genresIds && user.genresIds.includes(item._id)
  );

  if (!user) {
    return <></>;
  }
  return (
    <Link href={`/profile/${user._id}`}>
      <a className={styles.colabWrap__item}>
        <div className={styles.colabWrap__top}>
          <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
            <div className={styles.avatar__avatar}>
              {user.avatar ? (
                <Imgix
                  width={104}
                  height={104}
                  layout="fixed"
                  src={client.UPLOAD_URL + user.avatar}
                  alt="MangaFy user avatar"
                />
              ) : (
                <Avatar text={user.name} size={104} />
              )}
            </div>
          </div>
          <div className={styles.colabWrap__name}>
            <div className={styles.colabWrap__authorName}>{user.name}</div>
            <div className={styles.colabWrap__authorDescr}>{userTypesEnums[user?.type]}</div>
          </div>
        </div>
        <СardGenres genres={profileGenres} />
        <div className={styles.colabWrap__bot}>
          <div className={styles.colabWrap__commision}>
            <SvgPortfolio width="14px" height="14px" />
            {user.compensationModel === 'paid' ? 'Commission' : 'Collaboration'}
          </div>
          <div className={styles.colabWrap__commision}>
            <SvgPortfolio width="14px" height="14px" />
            {user.collaboration === 'paid' ? 'Paid Collab' : 'Joint Collab'}
          </div>
        </div>
      </a>
    </Link>
  );
};

ProfilesCard.propTypes = {
  user: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
};

export default ProfilesCard;
