import React, { useState } from 'react';

// Antd design
import { notification, Upload } from 'antd';
// Api
import restClient from 'api/restClient';
import { createHero, patchHero, deleteHero, uploadFile } from 'api/storyBoardClient';
import SvgCloud from 'components/icon/Cloud';
import SvgDustbin from 'components/icon/Dustbin';
import Imgix from 'components/imgix';
import ShowImgModal from 'components/modals/showImg';
import Popconfirm from 'components/popconfirm';
import PropTypes from 'prop-types';

// Styles
import styles from './styles.module.scss';

// Components

const src = '/img/profile6.webp';

const HeroCard = ({ hero, getStoryBoard, changeHero }) => {
  const [currentHero, setCurrentHero] = useState(hero);
  const [showImg, setShowImg] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    const openNotification = (type, message) => {
      notification[type]({
        message,
        placement: 'bottomLeft',
      });
    };

    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';

    if (!isJpgOrPng) {
      openNotification('error', 'You can only upload JPG, JPEG, PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      openNotification('error', 'Image must smaller than 2MB!');
    }

    if (isJpgOrPng && isLt2M) {
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
    }
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
        <Imgix
          onClick={() => {
            setShowImg(
              currentHero.imageUrl
                ? `${restClient.API_ENDPOINT}/api/v2/uploads/${currentHero.imageUrl}`
                : `https://mangafy.club${src}`
            );
            setIsModalVisible(true);
          }}
          width={104}
          height={95}
          layout="fixed"
          src={
            currentHero.imageUrl
              ? `${restClient.API_ENDPOINT}/api/v2/uploads/${currentHero.imageUrl}`
              : `https://mangafy.club${src}`
          }
        />
        <Upload
          accept="image/jpg, image/png, image/jpeg "
          beforeUpload={beforeUpload}
          showUploadList={false}>
          <span className={styles.uploadSvg}>
            <SvgCloud width="22px" height="22px" />
          </span>
        </Upload>
      </div>
      <ShowImgModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        img={showImg}
      />
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
