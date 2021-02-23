import React from 'react';
import PropTypes from 'prop-types';
// Styles
import styles from './styles.module.scss';
import HeroCard from './HeroCard';

export const HeroTypes = {
  personage: 'personage',
  component: 'component'
}

const Hero = ({storyBoard, setStoryBoard}) => {

  const getHeroesList = () => {
    const heroes = []
    storyBoard?.heroes?.map((hero, index) => {
      if(hero?.type === HeroTypes.personage) {
        heroes.push(<HeroCard hero={hero} key={hero?._id || index}/>);
      }
    });
    return heroes;
  }

  const getComponentsList = () => {
    const heroes = []
    storyBoard?.heroes?.map((hero, index) => {
      if(hero?.type === HeroTypes.component) {
        heroes.push(<HeroCard hero={hero} key={hero?._id || index}/>);
      }
    });
    return heroes;
  }

  const addHero = (type) => {
    const newHero = {
      newCreated: true,
      name: '',
      description: '',
      imageUrl: '',
      storyBoard: storyBoard?._id,
      type
    };

    setStoryBoard({
      ...storyBoard,
      heroes: [...storyBoard?.heroes, newHero]
    });
  }

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.heroesRow}>{getHeroesList()}</div>
        <div className={styles.heroesRow}>{getComponentsList()}</div>
      </div>
      <div className={styles.addButtonContainer}>
        <div className={styles.addbutton} onClick={() => addHero(HeroTypes.personage)}>
          <img className={styles.addIcon} src={`/icons/add.svg`}/>
          <p className={styles.addButtonText}>Add a hero</p>
        </div>
        <div className={styles.addbutton} onClick={() => addHero(HeroTypes.component)}>
          <img className={styles.addIcon} src={`/icons/add.svg`}/>
          <p className={styles.addButtonText}>Add components</p>
        </div>
      </div>
    </>
    );
};

Hero.propTypes = {
  storyBoard: PropTypes.object,
};

Hero.defaultProps = {
    storyBoard: {}
};

export default Hero;
