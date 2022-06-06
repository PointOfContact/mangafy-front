import React, { useEffect, useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import DescriptionBestProfile from './descriptionBestProfile';
import ModalBestProfile from './modalBestProfile';
import styles from './styles.module.scss';

const BestProfile = ({ gallery, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [topGallery, setTopGallery] = useState(gallery);

  const adaptImages = (g) =>
  g.map((item, index) => (
      <div
        key={item._id}
        className={cn(styles.item, item?._id.slice(-3) === 'png' && styles.itemForPNG)}
        onClick={() => {
          setShowModal(true);
          setStartIndex(index);
        }}>
        <Imgix
          priority={index <= 1}
          src={client.UPLOAD_URL + item?._id}
          alt="mangaFy gallery"
          layout='fill'
        />
        <DescriptionBestProfile
          item={item}
          setStartIndex={setStartIndex}
          user={user}
          topGallery={topGallery}
          setTopGallery={setTopGallery}
        />
        <span className={styles.opacity}></span>
      </div>
  ));

  const [images, setImages] = useState(adaptImages(gallery));

  useEffect(() => {
    setImages(adaptImages(topGallery));
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
          setStartIndex={setStartIndex}
        />
      </div>
    </div>
  );
};

BestProfile.propTypes = {
  gallery: PropTypes.array.isRequired,
  user: PropTypes.object,
};

BestProfile.defaultProps = {
  user: {},
};

export default BestProfile;
