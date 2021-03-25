import React, { useState } from 'react';

// Antd design
import { Upload } from 'antd';
// Api
import restClient from 'api/restClient';
import { createHero, patchHero, deleteHero, uploadFile } from 'api/storyBoardClient';
import SvgCloud from 'components/icon/Cloud';
import SvgDustbin from 'components/icon/Dustbin';
import Popconfirm from 'components/popconfirm';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

// Components

const src = '/img/profile6.png';

const HeroCard = ({ hero, getStoryBoard, changeHero }) => {
  const [currentHero, setCurrentHero] = useState(hero);

  // eslint-disable-next-line no-shadow
  const onBlur = (hero = currentHero) => {
    if (!hero?.name) {
      return;
    }
    const newHero = {
      ...hero,
    };

    if (newHero.newCreated) {
      delete newHero.newCreated;
      createHero(
        newHero,
        (res) => {
          delete newHero.storyBoard;
          setCurrentHero({
            ...newHero,
            _id: res?._id,
          });
          getStoryBoard();
        },
        () => {}
      );
    } else {
      delete newHero?._id;
      patchHero(
        hero?._id,
        newHero,
        () => {
          getStoryBoard();
        },
        () => {}
      );
    }
  };

  const beforeUpload = (file) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      uploadFile(
        reader.result,
        (res) => {
          setCurrentHero({
            ...currentHero,
            imageUrl: res?.id,
          });
          onBlur({
            ...currentHero,
            imageUrl: res?.id,
          });
        },
        () => {}
      );
    });
  };

  const confirmDelete = () => {
    deleteHero(
      currentHero._id,
      () => {
        getStoryBoard();
      },
      () => {
        getStoryBoard();
      }
    );
  };

  return (
    <div className={styles.hero__container}>
      <div className={styles.hero__top__section} onClick={() => changeHero(hero)}>
        <div className={styles.hero__text__row}>
          <h3>{hero?.name}</h3>
        </div>
        <div className={styles.hero__text__row}>
          <p>{hero?.description}</p>
        </div>
      </div>
      <div className={styles.hero__img}>
        <Upload
          accept="image/jpg, image/png, image/jpeg "
          beforeUpload={beforeUpload}
          showUploadList={false}>
          <img
            src={
              currentHero.imageUrl
                ? `${restClient.API_ENDPOINT}/api/v2/uploads/${currentHero.imageUrl}`
                : src
            }
          />
          <span className={styles.uploadSvg}>
            <SvgCloud width="22px" height="22px" />
          </span>
        </Upload>
      </div>
      <Popconfirm
        title="Are you sure to delete this hero."
        className={styles.hero__popconfirm}
        onConfirm={() => confirmDelete()}
        item={
          <span>
            <SvgDustbin width="22px" height="22px" />
          </span>
        }
      />
    </div>
  );
};

HeroCard.propTypes = {
  hero: PropTypes.object,
  getStoryBoard: PropTypes.func.isRequired,
  changeHero: PropTypes.func.isRequired,
};

HeroCard.defaultProps = {
  hero: {},
};

export default HeroCard;
