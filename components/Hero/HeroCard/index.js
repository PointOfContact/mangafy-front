import React, { useState } from 'react';

// Antd design

import client from 'api/client';
import ShowImgModal from 'components/modals/showImg';
import PropTypes from 'prop-types';

// Styles
import EditCard from './editCard';
import styles from './styles.module.scss';

const HeroCard = ({ hero, changeHero, confirmDelete }) => {
  const [showImg, setShowImg] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  let defaultImage;
  let defaultColor;
  let titleButton;
  let buttonColor;
  switch (hero.type) {
    case 'personage':
      defaultImage = '/img/heroCard.png';
      defaultColor = '#D6CFFF';
      titleButton = 'Hero';
      buttonColor = '#7B65F3';
      break;
    case 'component':
      defaultImage = '/img/componentCard.png';
      defaultColor = '#FEE5B0';
      titleButton = 'Components';
      buttonColor = '#FEC447';
      break;
    default:
      defaultImage = '/img/backDefImage.png';
      defaultColor = '#6FD257';
      titleButton = 'Background';
      buttonColor = '#6FD257';
  }

  return (
    <div className={styles.hero__container}>
      <div className={styles.hero__top__section} onClick={() => changeHero(hero, hero?.type)}>
        <div className={styles.hero__text__row}>
          <h3>{hero?.name}</h3>
        </div>
        <div className={styles.hero__text__row}>
          <p>{hero?.description}</p>
        </div>
        <button isRound={true} style={{ backgroundColor: buttonColor }}>
          {titleButton}
        </button>
        <EditCard
          editCard={() => {
            changeHero(hero, hero?.type);
          }}
          confirmDelete={() => {
            confirmDelete(hero);
          }}
          client={client}
          hero={hero}
          url={showImg}
        />
      </div>

      <div className={styles.hero__img} style={{ backgroundColor: defaultColor }}>
        <img
          onClick={() => {
            setShowImg(client.UPLOAD_URL + hero?.imageUrl);
            setIsModalVisible(!!hero?.imageUrl?.length);
          }}
          src={hero?.imageUrl ? client.UPLOAD_URL + hero?.imageUrl : defaultImage}
          alt="MangaFy hero card"
        />
      </div>
      <ShowImgModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        img={showImg}
      />
    </div>
  );
};

HeroCard.propTypes = {
  hero: PropTypes.object,
  changeHero: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

HeroCard.defaultProps = {
  hero: {},
  changeHero: () => {},
  confirmDelete: () => {},
};

export default HeroCard;
