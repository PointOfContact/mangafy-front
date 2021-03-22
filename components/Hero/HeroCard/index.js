import React, { useState } from 'react';

// Antd design
import { Input, Upload } from 'antd';

// Api
import restClient from 'api/restClient';
import { createHero, patchHero, deleteHero, uploadFile } from 'api/storyBoardClient';
import SvgCloud from 'components/icon/Cloud';
import SvgDustbin from 'components/icon/Dustbin';
import Popconfirm from 'components/popconfirm';
import PropTypes from 'prop-types';

// Styles
import { HeroTypes } from '../index';
import styles from './styles.module.scss';

// Components

const { TextArea } = Input;
const src = '/img/profile6.png';

const HeroCard = ({ hero, getStoryBoard }) => {
  const [currentHero, setCurrentHero] = useState(hero);

  const handleTitleChange = (e) => {
    setCurrentHero({
      ...currentHero,
      name: e.target.value,
    });
  };

  const handleTextChange = (e) => {
    setCurrentHero({
      ...currentHero,
      description: e.target.value,
    });
  };

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
        (err) => {}
      );
    } else {
      delete newHero?._id;
      patchHero(
        hero?._id,
        newHero,
        () => {
          getStoryBoard();
        },
        (err) => {}
      );
    }
  };

  const beforeUpload = (file) => {
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
        (err) => {}
      );
    });
  };

  const onPreview = (file) => {};

  const onChange = (info) => {
    if (info.file.status === 'done') {
    }
  };

  const confirmDelete = () => {
    deleteHero(
      currentHero._id,
      (res) => {
        getStoryBoard();
      },
      (err) => {
        getStoryBoard();
      }
    );
  };

  return (
    <div className={styles.hero__container}>
      <div className={styles.hero__top__section}>
        <div className={styles.hero__text__row}>
          <Input
            className={styles.hero__text__input}
            placeholder={
              currentHero.type === HeroTypes.personage ? 'Hero name:' : 'Component name:'
            }
            maxLength={100}
            value={currentHero?.name}
            onChange={handleTitleChange}
            onBlur={() => onBlur(currentHero)}
          />
        </div>
        <div className={styles.hero__text__row}>
          <TextArea
            className={styles.hero__text__input}
            placeholder={'text:'}
            autoSize={{ minRows: 1, maxRows: 3 }}
            maxLength={1000}
            value={currentHero?.description}
            onChange={handleTextChange}
            onBlur={() => onBlur(currentHero)}
          />
        </div>
      </div>
      <div className={styles.hero__img}>
        <Upload
          accept="image/jpg, image/png, image/jpeg "
          beforeUpload={beforeUpload}
          onChange={onChange}
          onPreview={onPreview}
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
};

HeroCard.defaultProps = {
  hero: {},
};

export default HeroCard;
