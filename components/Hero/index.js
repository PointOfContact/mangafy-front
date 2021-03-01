import React, { useMemo } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

// Styles
import HeroCard from './HeroCard';
import styles from './styles.module.scss';

export const HeroTypes = {
  personage: 'personage',
  component: 'component',
};

const Hero = ({ storyBoard, setStoryBoard, getStoryBoard }) => {
  const { allowPersonageCreate, allowComponentCreate } = useMemo(() => {
    const allow = {
      allowPersonageCreate: true,
      allowComponentCreate: true,
    };
    storyBoard.heroes.forEach((hero) => {
      if (hero.name === '') {
        if (hero.type === HeroTypes.personage) {
          allow.allowPersonageCreate = false;
        } else {
          allow.allowComponentCreate = false;
        }
      }
    });
    return allow;
  }, [storyBoard]);

  const getAllowCreate = (type) =>
    type === HeroTypes.personage ? allowPersonageCreate : allowComponentCreate;
  const getHeroesList = () => {
    const heroes = [];
    storyBoard?.heroes?.map((hero, index) => {
      if (hero?.type === HeroTypes.personage) {
        heroes.push(
          <HeroCard hero={hero} key={hero?._id || index} getStoryBoard={getStoryBoard} />
        );
      }
    });
    return heroes;
  };

  const getComponentsList = () => {
    const heroes = [];
    storyBoard?.heroes?.map((hero, index) => {
      if (hero?.type === HeroTypes.component) {
        heroes.push(
          <HeroCard hero={hero} key={hero?._id || index} getStoryBoard={getStoryBoard} />
        );
      }
    });
    return heroes;
  };

  const addHero = (type) => {
    if (!getAllowCreate(type)) {
      return;
    }
    const newHero = {
      newCreated: true,
      name: '',
      description: '',
      imageUrl: '',
      storyBoard: storyBoard?._id,
      type,
    };

    setStoryBoard({
      ...storyBoard,
      heroes: [...storyBoard?.heroes, newHero],
    });
  };

  return (
    <div>
      <div className={styles.heroContainer}>
        <div className={styles.heroesRow}>{getHeroesList()}</div>
        <div className={styles.heroesRow}>{getComponentsList()}</div>
      </div>
      <div className={styles.addButtonContainer}>
        <div
          className={cn(
            styles.addbutton,
            !getAllowCreate(HeroTypes.personage) ? styles.disabled : ''
          )}
          onClick={() => addHero(HeroTypes.personage)}>
          <img className={styles.addIcon} src={`/icons/add.svg`} />
          <p className={styles.addButtonText}>Add a hero</p>
        </div>
        <div
          className={cn(
            styles.addbutton,
            !getAllowCreate(HeroTypes.component) ? styles.disabled : ''
          )}
          onClick={() => addHero(HeroTypes.component)}>
          <img className={styles.addIcon} src={`/icons/add.svg`} />
          <p className={styles.addButtonText}>Add components</p>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  storyBoard: PropTypes.object,
  setStoryBoard: PropTypes.func,
  getStoryBoard: PropTypes.func,
};

Hero.defaultProps = {
  storyBoard: {},
  setStoryBoard: () => {},
  getStoryBoard: () => {},
};

export default Hero;
