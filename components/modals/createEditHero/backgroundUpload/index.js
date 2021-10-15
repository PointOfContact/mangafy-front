import React, { useState } from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import HeroUpload from '../heroUpload';
import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const EditBackground = ({
  text,
  disabled,
  ifIsEdit,
  hero,
  imageUrl,
  setImgId,
  typeCard,
  onChangeHero,
  className,
  setSubmitButton,
  requestAuto,
  uploadVideo,
  setUploadLoading,
}) => {
  const [showUpload, setShowUpload] = useState(false);
  const typePdf = hero?.imageUrl?.slice(-3);
  const ifPdf = typePdf === 'pdf' || typePdf === 'PDF';

  return ifIsEdit && !!hero?.imageUrl ? (
    <div className={styles.editImageContainer}>
      {ifPdf ? (
        <PDFViewer url={client.UPLOAD_URL + hero?.imageUrl} />
      ) : (
        <Imgix
          layout="fill"
          onMouseEnter={() => {
            setShowUpload(!showUpload);
          }}
          className={styles.editImage}
          src={client.UPLOAD_URL + hero?.imageUrl}
          alt="MangaFy hero card img"
        />
      )}
      {showUpload ? (
        <div className={styles.loadContainer}>
          <div className={styles.backgroundColor}></div>
          <div
            className={styles.upload}
            onMouseLeave={() => {
              setShowUpload(!showUpload);
            }}>
            <HeroUpload
              text={text}
              disabled={disabled}
              mangaUrl={imageUrl}
              setImgId={setImgId}
              titleLoad={ifIsEdit && ifIsEdit}
              typeCard={typeCard}
              onChangeHero={onChangeHero}
              className={className}
              setSubmitButton={setSubmitButton}
              requestAuto={requestAuto}
              uploadVideo={uploadVideo}
              setUploadLoading={setUploadLoading}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <HeroUpload
      text={text}
      disabled={disabled}
      mangaUrl={imageUrl}
      setImgId={setImgId}
      titleLoad={ifIsEdit && ifIsEdit}
      typeCard={typeCard}
      onChangeHero={onChangeHero}
      className={className}
      setSubmitButton={setSubmitButton}
      requestAuto={requestAuto}
      uploadVideo={uploadVideo}
      setUploadLoading={setUploadLoading}
    />
  );
};

EditBackground.propTypes = {
  setImgId: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  ifIsEdit: PropTypes.bool.isRequired,
  hero: PropTypes.object.isRequired,
  typeCard: PropTypes.string,
  onChangeHero: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  setSubmitButton: PropTypes.func,
  requestAuto: PropTypes.bool,
  uploadVideo: PropTypes.bool,
  setUploadLoading: PropTypes.func,
};

EditBackground.defaultProps = {
  setImgId: () => {},
  imageUrl: '',
  ifIsEdit: false,
  hero: {},
  typeCard: '',
  onChangeHero: () => {},
  disabled: false,
  text: '',
  className: '',
  setSubmitButton: () => {},
  requestAuto: true,
  uploadVideo: false,
  setUploadLoading: () => {},
};

export default EditBackground;
