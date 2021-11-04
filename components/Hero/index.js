/* eslint-disable no-param-reassign */
import React, { useMemo, useState } from 'react';

// import { createHero, patchHero, deleteHero, uploadFile } from 'api/storyBoardClient';
import { notification } from 'antd';
import { createHero, deleteHero, patchHero } from 'api/storyBoardClient';
import ModalComponent from 'components/modals/createEditHero';
import ModalHeroes from 'components/modals/modalHeroes';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
// Styles
import myAmplitude from 'utils/amplitude';

import CreateBoard from './createBoard';
import createButtons from './createButtons/createButtons';
import HeroCard from './HeroCard';
import styles from './styles.module.scss';

export const HeroTypes = {
  personage: 'personage',
  component: 'component',
  background: 'background',
};

const Hero = ({ storyBoard, setStoryBoard, getStoryBoard, user }) => {
  const [showModal, changeShowModal] = useState(false);
  const [showModalHeroes, changeShowModalHeroes] = useState(false);
  const [selectedHero, setSelectedHero] = useState({});
  const [ifIsEdit, setEdit] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [componentNames, setComponentNames] = useState([]);

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

  const changeHero = (newHero, type) => {
    setSelectedHero(newHero);
    setSelectedType(type);
    type === 'personage' ? changeShowModalHeroes(true) : changeShowModal(true);
  };

  const clickDeleteHero = (hero) => {
    const componentNameArray = [];
    storyBoard?.heroes?.forEach((element) => {
      if (!!element?.characterArray?.length && element?.characterArray?.includes(hero._id)) {
        componentNameArray.push(`"${element.name}"`);
      }
    });

    storyBoard?.chapters?.map((value) => {
      value.pages.forEach((element) => {
        if (!!element?.characterArray?.length && element?.characterArray?.includes(hero._id)) {
          componentNameArray.push(`"${element.title}"`);
        }
      });
    });

    setComponentNames(componentNameArray);
  };

  const confirmDelete = (hero) => {
    const getLastCreateHeroId = storyBoard?.heroes[storyBoard?.heroes?.length - 1]?._id;
    const heroId = !!hero?._id ? hero?._id : getLastCreateHeroId;
    deleteHero(heroId, getStoryBoard, getStoryBoard);
    changeShowModalHeroes(false);
    changeShowModal(false);
    // upgrade all
    setStoryBoard({ ...storyBoard });
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
            setEdit={setEdit}
            componentNames={componentNames}
            clickDeleteHero={clickDeleteHero}
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
      heroType: [],
      quality: [],
      description: '',
      appearance: '',
      imageUrl: '',
      storyBoard: storyBoard?._id,
      type,
    };
    changeHero(newHero, type);
  };

  const onChangeHeroLogic = (newHero, hero, newCreated, setIdCardHero, idCardHero) => {
    if (!newHero?.name || newHero?.name.length < 2) {
      return;
    }

    if (newHero.newCreated || newCreated) {
      delete newHero?.newCreated;
      delete hero?.newCreated;
      if (newCreated) {
        delete newHero?._id;
        newHero.storyBoard = storyBoard?._id;
      }
      createHero(
        newHero,
        (res) => {
          let eventType;
          switch (hero.type) {
            case 'personage':
              eventType = EVENTS.CREATE_BOARD_CHARACTER;
              break;
            case 'component':
              eventType = EVENTS.CREATE_BOARD_TOOL;
              break;
            default:
              eventType = EVENTS.CREATE_BOARD_BACKGROUND;
              break;
          }
          const data = {
            event_type: eventType,
            event_properties: { newHero },
            user_id: user._id,
            user_properties: {
              ...user,
            },
          };
          myAmplitude(data);
          delete newHero.storyBoard;
          setIdCardHero(res?._id);
          getStoryBoard();
        },
        (err) => {
          notification.error({
            message: err.message,
          });
        }
      );
    } else {
      delete newHero?._id;
      delete newHero?.storyBoard;
      patchHero(
        idCardHero,
        newHero,
        () => {
          getStoryBoard();
        },
        (err) => {
          notification.error({
            message: err.message,
          });
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        {!!storyBoard?.heroes?.length ? (
          <div className={styles.cardContainer}>
            {
              <CreateBoard
                title="Characters"
                list={getLists(HeroTypes.personage)}
                addHero={addHero}
                heroTypes={HeroTypes.personage}
                getAllowCreate={getAllowCreate}
              />
            }
            {
              <CreateBoard
                title="Component"
                list={getLists(HeroTypes.component)}
                addHero={addHero}
                heroTypes={HeroTypes.component}
                getAllowCreate={getAllowCreate}
              />
            }
            {
              <CreateBoard
                title="Background"
                list={getLists(HeroTypes.background)}
                addHero={addHero}
                heroTypes={HeroTypes.background}
                getAllowCreate={getAllowCreate}
              />
            }
            <div className={styles.buttonContainerListValid}>
              <div className={styles.border}></div>
              {createButtons(addHero, HeroTypes, getAllowCreate, false, setEdit)}
            </div>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            {createButtons(addHero, HeroTypes, getAllowCreate, true, setEdit)}
          </div>
        )}
      </div>

      <ModalComponent
        changeShowModal={changeShowModal}
        showModal={showModal}
        hero={selectedHero}
        type={selectedType}
        user={user}
        ifIsEdit={ifIsEdit}
        setEdit={setEdit}
        confirmDelete={confirmDelete}
        heroItems={getLists(HeroTypes.personage)}
        onChangeHeroLogic={onChangeHeroLogic}
      />
      <ModalHeroes
        changeShowModalHeroes={changeShowModalHeroes}
        showModal={showModalHeroes}
        hero={selectedHero}
        type={selectedType}
        user={user}
        ifIsEdit={ifIsEdit}
        setEdit={setEdit}
        confirmDelete={confirmDelete}
        onChangeHeroLogic={onChangeHeroLogic}
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
