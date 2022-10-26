import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import ResponsiveImgix from 'components/imgix/responsiveImgix';
import { myLoader } from 'components/imgix';

const MangaBody = ({ images, className }) => {
  const a = myLoader(client.UPLOAD_URL + images[0], 20, 1);
  console.log('🚀 ~ file: MangaBody.js ~ line 10 ~ MangaBody ~ images', a);
  return (
    <div className={cn(styles.body, className)}>
      {/* {shot.image && <ResponsiveImgix src={client.UPLOAD_URL + shot.image} />} */}
      {images?.map((image) => (
        <ResponsiveImgix key={image} src={client.UPLOAD_URL + image} />
      ))}
    </div>
  );
};

export default MangaBody;
