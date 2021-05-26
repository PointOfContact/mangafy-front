import React from 'react';

import cn from 'classnames';
import SvgAdd from 'components/icon/Add';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AddHeroCard = ({ imgWidth, imgHeight, addHero, heroTypes, getAllowCreate, title, img }) => (
  <div className={styles.container}>
    <div
      className={cn(styles.addbutton, !getAllowCreate(heroTypes.personage) ? styles.disabled : '')}
      onClick={() => addHero(heroTypes.personage)}>
      <SvgAdd width="31px" height="31px" />
      <p className={styles.addButtonText}>{title}</p>
    </div>

    {img && (
      <div className={styles.showImage}>
        <img width={`${imgWidth}px`} height={`${imgHeight}px`} src={`/img/${img}`} alt="icon" />
      </div>
    )}
  </div>
);

AddHeroCard.propTypes = {
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  addHero: PropTypes.func,
  heroTypes: PropTypes.object,
  getAllowCreate: PropTypes.func,
  title: PropTypes.string,
  img: PropTypes.string,
};

AddHeroCard.defaultProps = {
  imgWidth: 200,
  imgHeight: 200,
  addHero: () => {},
  heroTypes: {},
  getAllowCreate: () => {},
  title: '',
  img: null,
};

export default AddHeroCard;
