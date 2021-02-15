import React from 'react';

import cn from 'classnames';
import moment from 'moment';
import Router from 'next/router';
import PropTypes from 'prop-types';

import ButtonColab from './buttonColab';
import styles from './styles.module.scss';

const ColaborationCards = ({ label, client }) => {
  const handleCallbCardsClick = (id) => {
    Router.push({
      pathname: `/manga-story/${id}`,
      query: {},
    });
  };

  return (
    <div onClick={() => handleCallbCardsClick(label.id)} className={styles.colabWrap__item}>
      <div className={styles.colabWrap__top}>
        <div className={cn(styles.colabWrap__img, styles.colabWrap__imgOnline)}>
          <div className={styles.colabWrap__online}></div>
          <div className={styles.colabWrap__avatar}>
            <img
              src={label.image ? client.UPLOAD_URL + label.image : '/img/mangastory.jpg'}
              alt=""></img>
          </div>
        </div>
        <div className={styles.colabWrap__name}>
          <div className={styles.colabWrap__authorName}>{label.title}</div>
          <div className={styles.colabWrap__authorDescr}>{label.searchingFor[0]}</div>
        </div>
      </div>
      <div className={styles.colabWrap__descr}>{label.description}</div>
      <div className={styles.colabWrap__buttons}>
        {label.genres.map((item) => (
          <ButtonColab key={item._id} className={cn(styles.ButtonPurple)} text={item.name} />
        ))}
      </div>
      <div className={styles.colabWrap__bot}>
        <div className={styles.colabWrap__commision}>
          <img src="icons/suitcase.svg" alt=""></img>
          {label.compensationModel == 'paid' ? 'Commission' : 'Collaboration'}
        </div>
        <div className={styles.colabWrap__progress}>
          <img src="icons/clock.svg" alt=""></img>
          {moment(new Date(label.createdAt)).from(moment(new Date()))}
        </div>
      </div>
    </div>
  );
};

ColaborationCards.PropTypes = {
  label: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};
export default ColaborationCards;
