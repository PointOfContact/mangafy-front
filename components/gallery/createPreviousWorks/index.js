import React from 'react';

import { Upload } from 'antd';
import Card from 'components/card';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import GalleryCard from '../galleryCard';
import styles from '../styles.module.scss';

const CreatePreviousWorks = ({
  images,
  canEdit,
  canEditInit,
  user,
  userData,
  gallerySet,
  setUserData,
  fromPath,
  setImages,
  setSelectedGallery,
  setCreateGalleryModal,
  setIsModalVisible,
  onBeforeGalleryUpload,
  showUploadList,
}) => (
  <div className={styles.imagesBlock}>
    {images?.length ? (
      images.map((galleryItem, index) => (
        <GalleryCard
          key={index}
          {...{
            index,
            canEdit,
            canEditInit,
            user,
            userData,
            galleryItem,
            gallerySet,
            setUserData,
            fromPath,
            setImages,
            images,
            setSelectedGallery,
            setCreateGalleryModal,
            setIsModalVisible,
          }}
        />
      ))
    ) : (
      <div>
        {canEditInit ? (
          <Upload
            beforeUpload={onBeforeGalleryUpload}
            showUploadList={showUploadList}
            accept="image/jpg, image/png, application/pdf, image/jpeg">
            <Card
              description="Do you not want <br/> to add a gallery?"
              btnText=""
              items={[
                <Imgix
                  key="1"
                  width={124}
                  height={140}
                  layout="fixed"
                  src="https://mangafy.club/img/noGalere.webp"
                  alt="MangaFy no galere"
                />,
              ]}
            />
          </Upload>
        ) : (
          <Card
            description="Sorry, but there is nothing <br/> here (("
            btnText=""
            items={[
              <Imgix
                key="1"
                width={124}
                height={140}
                layout="fixed"
                src="https://mangafy.club/img/noGalere.webp"
                alt="MangaFy no galere"
              />,
            ]}
          />
        )}
      </div>
    )}
  </div>
);

CreatePreviousWorks.propTypes = {
  images: PropTypes.array.isRequired,
  canEdit: PropTypes.bool.isRequired,
  canEditInit: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  gallerySet: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  fromPath: PropTypes.string.isRequired,
  setImages: PropTypes.func.isRequired,
  setSelectedGallery: PropTypes.func.isRequired,
  setCreateGalleryModal: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  onBeforeGalleryUpload: PropTypes.func.isRequired,
  showUploadList: PropTypes.func.isRequired,
};

export default CreatePreviousWorks;
