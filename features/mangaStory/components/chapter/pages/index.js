import React, { useState } from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import ShowImgModal from 'components/modals/showImg';
import PropTypes from 'prop-types';

import SettingsPage from './settingsPage';
import styles from './styles.module.scss';

const Pages = ({ pages, setVisibleModal, setModalTitle }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const imageType = pages?.imageUrl?.slice(-3) === 'pdf' || pages?.imageUrl?.slice(-3) === 'PDF';

  const pagesArray = pages?.map((value) => {
    const image = !!value.imageUrl
      ? client.UPLOAD_URL + value.imageUrl
      : 'https://mangafy.club/img/collab_baner.webp';

    return (
      <div key={value?._id}>
        <div
          className={styles.itemPage}
          onClick={() => {
            setVisibleModal(true);
            setModalTitle('Edit page');
          }}>
          <div className={styles.content}>
            <h2>{value.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: value.text }} />
            <SettingsPage setVisibleModal={setVisibleModal} setModalTitle={setModalTitle} />
          </div>
          <div className={styles.pageImage} onClick={() => setIsModalVisible(true)}>
            <Imgix className={styles.image} layout="fill" src={image} alt={'MangaFy page image'} />
          </div>
        </div>
        <ShowImgModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          img={client.UPLOAD_URL + pages?.imageUrl}
          imageType={imageType}
        />
      </div>
    );
  });

  return <div className={styles.containerPage}>{pagesArray}</div>;
};

Pages.propTypes = {
  pages: PropTypes.array,
  setVisibleModal: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
};

Pages.defaultProps = {
  pages: [],
};

export default Pages;
