import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import ResponsiveImgix from 'components/imgix/responsiveImgix';

const MangaBody = ({ images, className }) => {
  return (
    <div className={cn(styles.body, className)}>
      {/* {shot.image && <ResponsiveImgix src={client.UPLOAD_URL + shot.image} />} */}
      {images.map((image) => (
        <ResponsiveImgix key={image} src={client.UPLOAD_URL + image} />
      ))}
    </div>
  );
};

export default MangaBody;
