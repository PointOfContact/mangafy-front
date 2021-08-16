import React, { useMemo, useState } from 'react';

// import { createHero, patchHero, deleteHero, uploadFile } from 'api/storyBoardClient';
import { deleteHero } from 'api/storyBoardClient';
import ModalHero from 'components/modals/createEditHero';
import PropTypes from 'prop-types';

// Styles
import CreateBoard from './createBoard';
import createButtons from './createButtons/createButtons';
import HeroCard from './HeroCard';
import styles from './styles.module.scss';

export const HeroTypes = {
  personage: 'personage',
  component: 'component',
  background: 'background',
};

const Hero = ({ storyBoard, getStoryBoard, user }) => {
  const [showModal, changeShowModal] = useState(false);
  const [selectedHero, setSelectedHero] = useState({});
  const [selectedType, setSelectedType] = useState('');

  const { allowPersonageCreate, allowComponentCreate, allowBackgroundCreate } = useMemo(() => {
    const allow = {
      allowPersonageCreate: true,
      allowComponentCreate: true,
      allowBackgroundCreate: true,
    };
    storyBoard?.heroes?.forEach((hero) => {
      if (hero.name === '') {
        switch (hero.type) {
          case HeroTypes.personage:
            allow.allowPersonageCreate = false;
            break;
          case HeroTypes.component:
            allow.allowComponentCreate = false;
            break;
          default:
            allow.allowBackgroundCreate = false;
        }
      }
    });
    return allow;
  }, [storyBoard]);

  const getAllowCreate = (type) => {
    switch (type) {
      case HeroTypes.personage:
        return allowPersonageCreate;
      case HeroTypes.component:
        return allowComponentCreate;
      default:
        return allowBackgroundCreate;
    }
  };

  const changeHero = (newhero, type) => {
    setSelectedHero(newhero);
    setSelectedType(type);
    changeShowModal(true);
  };

  const confirmDelete = (hero) => {
    deleteHero(hero._id, getStoryBoard, getStoryBoard);
  };

  const getLists = (type) => {
    const heroes = [];

    storyBoard?.heroes?.map((hero, index) => {
      if (hero?.type === type) {
        heroes.push(
          <HeroCard
            changeHero={changeHero}
            hero={hero}
            key={hero?._id || index}
            getStoryBoard={getStoryBoard}
            confirmDelete={confirmDelete}
          />
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
    changeHero(newHero);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        {!!storyBoard?.heroes?.length ? (
          <div className={styles.cardContainer}>
            {
              <CreateBoard
                title="Heroes"
                list={() => getLists(HeroTypes.personage)}
                addHero={addHero}
                heroTypes={HeroTypes.personage}
                getAllowCreate={getAllowCreate}
              />
            }
            {
              <CreateBoard
                title="Component"
                list={() => getLists(HeroTypes.component)}
                addHero={addHero}
                heroTypes={HeroTypes.component}
                getAllowCreate={getAllowCreate}
              />
            }
            {
              <CreateBoard
                title="Background"
                list={() => getLists(HeroTypes.background)}
                addHero={addHero}
                heroTypes={HeroTypes.background}
                getAllowCreate={getAllowCreate}
              />
            }
            <div className={styles.buttonContainerListValid}>
              <div className={styles.border}></div>
              {createButtons(addHero, HeroTypes, getAllowCreate, false)}
            </div>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            {createButtons(addHero, HeroTypes, getAllowCreate, true)}
          </div>
        )}
      </div>

      <ModalHero
        changeShowModal={changeShowModal}
        showModal={showModal}
        getStoryBoard={getStoryBoard}
        hero={selectedHero}
        type={selectedType}
        user={user}
      />
    </div>
  );
};

Hero.propTypes = {
  storyBoard: PropTypes.object,
  setStoryBoard: PropTypes.func,
  getStoryBoard: PropTypes.func,
  user: PropTypes.object,
};

Hero.defaultProps = {
  storyBoard: {},
  setStoryBoard: () => {},
  getStoryBoard: () => {},
  user: null,
};

export default Hero;
