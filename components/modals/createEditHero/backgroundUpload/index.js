import React, { useState } from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import HeroUpload from '../heroUpload';
import styles from './styles.module.scss';

const EditBackground = ({ ifIsEdit, hero, imageUrl, setImgId }) => {
  const [showUpload, setShowUpload] = useState(false);

  return ifIsEdit && !!hero.imageUrl ? (
    <div className={styles.editImageContainer}>
      <Imgix
        layout="fill"
        onMouseEnter={() => {
          setShowUpload(!showUpload);
        }}
        className={styles.editImage}
        src={client.UPLOAD_URL + hero.imageUrl}
        alt="MangaFy hero card img"
      />
      {showUpload ? (
        <div className={styles.loadContainer}>
          <div className={styles.backgroundColor}></div>
          <div
            className={styles.upload}
            onMouseLeave={() => {
              setShowUpload(!showUpload);
            }}>
            <HeroUpload setImgId={setImgId} imageUrl={imageUrl} titleLoad={ifIsEdit && ifIsEdit} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <HeroUpload setImgId={setImgId} imageUrl={imageUrl} titleLoad={ifIsEdit && ifIsEdit} />
  );
};

EditBackground.propTypes = {
  setImgId: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  ifIsEdit: PropTypes.bool.isRequired,
  hero: PropTypes.object.isRequired,
};

EditBackground.defaultProps = {
  setImgId: () => {},
  imageUrl: '',
  ifIsEdit: false,
  hero: {},
};

export default EditBackground;
