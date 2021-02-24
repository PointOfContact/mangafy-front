import React, { useState } from 'react';

// Antd design
import { Input, Upload } from 'antd';
// Api
import client from 'api/client';
import restClient from 'api/restClient';
import { createHero, patchHero } from 'api/storyBoardClient';
import PropTypes from 'prop-types';

// Styles
import { HeroTypes } from '../index';
import styles from './styles.module.scss';

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
    console.log('beforeUpload > ', file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/uploads')
          .create(
            { uri: reader.result },
            {
              headers: { Authorization: `Bearer ${jwt}` },
              mode: 'no-cors',
            }
          )
          .then((response) => {
            console.log('response > ', response);
            setCurrentHero({
              ...currentHero,
              imageUrl: response?.id,
            });
            onBlur({
              ...currentHero,
              imageUrl: response?.id,
            });
          });
      });
    });
  };

  const onPreview = (file) => {
    console.log('onPreview url > ', file.url);
  };

  const onChange = (info) => {
    console.log('onChange !!> ', info.file.status);
    if (info.file.status === 'done') {
    }
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
        </Upload>
      </div>
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
