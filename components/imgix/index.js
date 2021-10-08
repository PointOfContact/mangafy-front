import React from 'react';

import ImgixClient from '@imgix/js-core';
import Image from 'next/image';

const imgixClient = new ImgixClient({
  domain: 'mangafy.imgix.net',
  secureURLToken: 'sppKpgrGRXTc2EEK',
});

const myLoader = ({ src, width, quality }) =>
  process.env.NEXT_GET_IMAGES_IMGIX
    ? imgixClient.buildURL(src, { w: width, q: quality, auto: 'format', fit: 'max' })
    : src;

const Imgix = (props) => <Image loader={myLoader} {...props} />;

export default Imgix;
