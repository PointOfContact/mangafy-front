import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Antd design
import { Input } from 'antd';
// Api
import { createHero, patchHero } from 'api/storyBoardClient';
// Styles
import styles from './styles.module.scss';

const { TextArea } = Input;

export const HeroTypes = {
  personage: 'personage',
  component: 'component'
}

const Hero = ({hero}) => {

  const [currentHero, setCurrentHero] = useState(hero);

  const handleTitleChange = (e) => {
    setCurrentHero({
      ...currentHero,
      name: e.target.value
    });
  };

  const handleTextChange = (e) => {
    setCurrentHero({
      ...currentHero,
      description: e.target.value
    });
  };

  const onBlur = () => {
    if(!currentHero?.name) {
      return;
    }
    const newHero = {
      ...currentHero,
    }

    if(newHero.newCreated) {
      delete newHero.newCreated;
      createHero(newHero, (res) => {
        delete newHero.storyBoard;
        setCurrentHero({
          ...newHero,
          _id: res?._id
        });
      }, (err) => {});
    } else {
      delete newHero?._id;
      patchHero(currentHero?._id, newHero, () => {}, (err) => {});
    }
  }

  return (
    <div className={styles.hero__container}>
      <div className={styles.hero__text__row}>
        <Input 
          className={styles.hero__text__input} 
          placeholder={currentHero.type === HeroTypes.personage ? 'Hero name:' : 'Component name:'}
          maxLength={100}
          value={currentHero?.name}
          onChange={handleTitleChange} 
          onBlur={onBlur}
        />
      </div>
      <div className={styles.hero__text__row}>
        <TextArea
          className={styles.hero__text__input} 
          placeholder={'text:'}
          autoSize={{ minRows: 3, maxRows: 10 }}
          maxLength={1000}
          value={currentHero?.description}
          onChange={handleTextChange} 
          onBlur={onBlur}
        />
      </div>
    </div>);
};

Hero.propTypes = {
  storyBoard: PropTypes.object,
};

Hero.defaultProps = {
    storyBoard: {}
};

export default Hero;
