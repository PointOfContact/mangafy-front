import React from 'react';

import client from 'api/client';
import cn from 'classnames';
import Image from 'next/image';
import Router from 'next/router';
import PropTypes from 'prop-types';

import SvgPortfolio from '../icon/Portfolio';
import ButtonColab from './buttonColab';
import styles from './styles.module.scss';

const ProfilesCard = ({ user, genres }) => {
  const profileGenres = genres.filter(
    (item) => user.genresIds && user.genresIds.includes(item._id)
  );
  const handleCallbCardsClick = (id) => {
    Router.push({
      pathname: `/profile/${id}`,
      query: {},
    });
  };
  if (!user) {
    return <></>;
  }
  return (
    <>
      <div onClick={() => handleCallbCardsClick(user._id)} className={styles.colabWrap__item}>
        <div className={styles.colabWrap__top}>
          <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
            <div className={styles.avatar__avatar}>
              <Image
                width={104}
                height={104}
                layout="responsive"
                src={
                  user.avatar
                    ? client.UPLOAD_URL + user.avatar
                    : `https://ui-avatars.com/api/?background=7b65f3&name=${user.name}&rounded=true&color=ffffff&size=128`
                }
                alt="User avatar"
              />
            </div>
          </div>
          <div className={styles.colabWrap__name}>
            <div className={styles.colabWrap__authorName}>{user.name}</div>
            <div className={styles.colabWrap__authorDescr}>{user.type}</div>
          </div>
        </div>
        <div className={styles.colabWrap__descr}>{user.description}</div>
        <div className={styles.colabWrap__buttons}>
          {profileGenres.length ? (
            profileGenres.map((item) => (
              <ButtonColab key={item._id} className={cn(styles.ButtonPurple)} text={item.name} />
            ))
          ) : (
            <ButtonColab className={cn(styles.ButtonWhite)} text={'💪 fan of all genres'} />
          )}
        </div>
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
      </div>
    </>
  );
};

ProfilesCard.propTypes = {
  user: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
};

export default ProfilesCard;
