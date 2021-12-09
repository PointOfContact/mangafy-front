import React, { useState } from 'react';

// Antd design

import client from 'api/client';
import Imgix from 'components/imgix';
import ShowImgModal from 'components/modals/showImg';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

// Styles
import EditCardHero from '../editCardHero';
import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const HeroCard = ({
  hero,
  changeHero,
  confirmDelete,
  setEdit,
  componentNames,
  clickDeleteHero,
}) => {
  const [showImg, setShowImg] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const imageType = hero?.imageUrl?.slice(-3) === 'pdf' || hero?.imageUrl?.slice(-3) === 'PDF';

  let defaultImage;
  let defaultColor;
  let titleButton;
  let buttonColor;

  switch (hero.type) {
    case 'personage':
      defaultImage = '/img/heroCard.png';
      defaultColor = '#D6CFFF';
      titleButton = hero?.heroType;
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
      <div
        className={styles.hero__top__section}
        onClick={() => {
          setEdit(true);
          changeHero(hero, hero?.type);
        }}>
        <div className={styles.hero__text__row}>
          <h3>{hero?.name}</h3>
        </div>
        <div className={styles.hero__text__row}>
          <p>{hero?.description}</p>
        </div>
        <button isRound={true} style={{ backgroundColor: buttonColor }}>
          {titleButton}
        </button>
        <EditCardHero
          editCard={() => {
            changeHero(hero, hero?.type);
          }}
          confirmDelete={() => {
            confirmDelete(hero);
          }}
          clickDelete={() => {
            clickDeleteHero(hero);
          }}
          client={client}
          hero={hero}
          url={showImg}
          setEdit={setEdit}
          componentNames={componentNames}
        />
      </div>

      <div className={styles.hero__img} style={{ backgroundColor: defaultColor }}>
        {imageType ? (
          <PDFViewer
            url={client.UPLOAD_URL + hero?.imageUrl}
            onClick={() => {
              setShowImg(client.UPLOAD_URL + hero?.imageUrl);
              setIsModalVisible(!!hero?.imageUrl?.length);
            }}
          />
        ) : (
          <Imgix
            layout="fill"
            onClick={() => {
              setShowImg(client.UPLOAD_URL + hero?.imageUrl);
              setIsModalVisible(!!hero?.imageUrl?.length);
            }}
            src={
              hero?.imageUrl
                ? client.UPLOAD_URL + hero?.imageUrl
                : client.API_ENDPOINT + defaultImage
            }
            alt="MangaFy hero card"
          />
        )}
      </div>
      <ShowImgModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        img={showImg}
        imageType={imageType}
      />
    </div>
  );
};

HeroCard.propTypes = {
  hero: PropTypes.object,
  changeHero: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  setEdit: PropTypes.func,
  componentNames: PropTypes.array,
  clickDeleteHero: PropTypes.func,
};

HeroCard.defaultProps = {
  hero: {},
  changeHero: () => {},
  confirmDelete: () => {},
  setEdit: () => {},
  componentNames: [],
  clickDeleteHero: () => {},
};

export default HeroCard;
