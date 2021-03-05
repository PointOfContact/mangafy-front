import React from 'react';

import cn from 'classnames';
// import SvgClock from 'components/icon/Clock';
import SvgPortfolio from 'components/icon/Portfolio';
// import moment from 'moment';
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
    // eslint-disable-next-line no-underscore-dangle
    <div onClick={() => handleCallbCardsClick(label._id)} className={styles.colabWrap__item}>
      <div className={styles.colabWrap__top}>
        <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
          <div className={styles.avatar__avatar}>
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
        {label.genres.length ? (
          label.genres.map((item) => (
            <ButtonColab key={item._id} className={cn(styles.ButtonPurple)} text={item.name} />
          ))
        ) : (
          <ButtonColab className={cn(styles.ButtonWhite)} text={'💪 fan of all genres'} />
        )}
      </div>
      <div className={styles.colabWrap__bot}>
        <div className={styles.colabWrap__commision}>
          <SvgPortfolio width="14px" height="14px" />
          {label.compensationModel == 'paid' ? 'Commission' : 'Collaboration'}
        </div>
        {/* <div className={styles.colabWrap__progress}>
          <SvgClock width="14px" height="14px" />
          {moment(new Date(label.createdAt)).from(moment(new Date()))}
        </div> */}
      </div>
    </div>
  );
};

ColaborationCards.propTypes = {
  label: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};
export default ColaborationCards;
