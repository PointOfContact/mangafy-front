import React, { useState } from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import ShowImgModal from 'components/modals/showImg';
import PropTypes from 'prop-types';

import SettingsPage from './settingsPage';
import styles from './styles.module.scss';

const Pages = ({ pages }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const imageType = pages?.imageUrl?.slice(-3) === 'pdf' || pages?.imageUrl?.slice(-3) === 'PDF';

  const pagesArray = pages?.map((value) => {
    const image = !!value.imageIrl ? value.imageIrl : 'https://mangafy.club/img/collab_baner.webp';
    return (
      <div key={value?._id}>
        <div className={styles.itemPage}>
          <div className={styles.content}>
            <h2>{value.title}</h2>
            <p>{value.text}</p>
            <SettingsPage />
          </div>
          <div className={styles.pageImage} onClick={() => setIsModalVisible(true)}>
            <Imgix layout="fill" src={image} alt={'MangaFy page image'} />
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
};

Pages.defaultProps = {
  pages: [],
};

export default Pages;
