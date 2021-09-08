import React, { useEffect, useState } from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import DescriptionBestProfile from './descriptionBestProfile';
import ModalBestProfile from './modalBestProfile';
import styles from './styles.module.scss';

const BestProfile = ({ gallery, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [topGallery, setTopGallery] = useState(gallery);

  useEffect(() => {
    setImages(
      topGallery.map((item, index) => (
        <div
          key={item._id}
          className={styles.item}
          onClick={() => {
            setShowModal(true);
            setStartIndex(index);
          }}>
          <Imgix layout="fill" src={client.UPLOAD_URL + item?._id} alt="mangaFy gallery" />
          <DescriptionBestProfile
            item={item}
            user={user}
            topGallery={topGallery}
            setTopGallery={setTopGallery}
          />
          <span className={styles.opacity}></span>
        </div>
      ))
    );
  }, [topGallery]);

  return (
    <div className={styles.container}>
      <div className={styles.card_wrap}>
        <h2> &#x2606; New this Week </h2>
        <div className={styles.imagesForMobile}>{images}</div>
        <div className={styles.imagesForDesktop}>{images}</div>
        <ModalBestProfile
          showModal={showModal}
          setShowModal={setShowModal}
          gallery={gallery}
          startIndex={startIndex}
          user={user}
          topGallery={topGallery}
          setTopGallery={setTopGallery}
        />
      </div>
    </div>
  );
};

BestProfile.propTypes = {
  gallery: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default BestProfile;
