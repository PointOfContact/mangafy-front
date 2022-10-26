import React from 'react';

import ImgixClient from '@imgix/js-core';
import Image from 'next/image';

const imgixClient = new ImgixClient({
  domain: 'mangafy.imgix.net',
  secureURLToken: 'sppKpgrGRXTc2EEK',
});

export const myLoader = ({ src, width, quality }) =>
  process.env.NEXT_PUBLIC_GET_IMGIX === 'true'
    ? imgixClient.buildURL(src, { w: width, q: quality, auto: 'format', fit: 'max' })
    : src;
// imgixClient.buildURL(src, {
//   w: width,
//   q: quality,
//   auto: 'format',
//   fit: 'min',
// });

// const optimized = process.env.NEXT_PUBLIC_GET_IMGIX === 'true';
const optimized = true;

const Imgix = (props) => <Image loader={myLoader} {...props} unoptimized={!optimized} />;

export default Imgix;
export { imgixClient };
