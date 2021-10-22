import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import AddHeroCard from '../addHeroCard';
import styles from './styles.module.scss';

const CreateBoard = ({ title, list, addHero, heroTypes, getAllowCreate }) => {
  const ifNotCards = list.length > 2;

  const getList = () =>
    list?.map((value, index) => {
      if (!(index % 2)) {
        return (
          <div className={styles.cont} key={index}>
            {list[index]}
            {index + 1 < list.length && list[index + 1]}
          </div>
        );
      }
      return <></>;
    });

  return (
    <div className={cn(ifNotCards ? styles.containerMax : styles.containerMin)}>
      <div className={styles.cardName}>
        {title}
        <AddHeroCard
          imgWidth={138}
          imgHeight={177}
          addHero={addHero}
          heroTypes={heroTypes}
          getAllowCreate={getAllowCreate}
          title={''}
          img="addComponent.png"
          ifValidCards={false}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.card_wrap}>{getList()}</div>
      </div>
    </div>
  );
};

CreateBoard.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  addHero: PropTypes.func,
  heroTypes: PropTypes.object,
  getAllowCreate: PropTypes.func,
};

CreateBoard.defaultProps = {
  title: '',
  list: [],
  addHero: () => {},
  heroTypes: {},
  getAllowCreate: () => {},
};

export default CreateBoard;
