import React from 'react';

import ImgixClient from '@imgix/js-core';
import Image from 'next/image';

const imgixClient = new ImgixClient({
  domain: 'mangafy.imgix.net',
  secureURLToken: 'sppKpgrGRXTc2EEK',
});

const myLoader = ({ src, width, quality }) =>
  imgixClient.buildURL(src, { w: width, q: quality, auto: 'format' });

const Imgix = (props) => <Image loader={myLoader} {...props} />;

export default Imgix;
