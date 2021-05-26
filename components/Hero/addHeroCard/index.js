import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AddHeroCard = ({ addHero, heroTypes, getAllowCreate, title }) => (
  <div
    className={cn(styles.addbutton, !getAllowCreate(heroTypes.personage) ? styles.disabled : '')}
    onClick={() => addHero(heroTypes.personage)}>
    <img className={styles.addIcon} src={`/icons/add.svg`} />
    <p className={styles.addButtonText}>{title}</p>
  </div>
);

AddHeroCard.propTypes = {
  addHero: PropTypes.func,
  heroTypes: PropTypes.object,
  getAllowCreate: PropTypes.func,
  title: PropTypes.string,
};

AddHeroCard.defaultProps = {
  addHero: () => {},
  heroTypes: {},
  getAllowCreate: () => {},
  title: '',
};

export default AddHeroCard;
