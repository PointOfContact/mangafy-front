import React from 'react';

import { NextSeo } from 'next-seo';

const PasswordSuccessChanged = () => (
  <>
    <NextSeo
      title="MangaFY Password Changed"
      description="MangaFY Password Changed"
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ]}
    />
    <h2>Password successfully changed</h2>
  </>
);
export default PasswordSuccessChanged;
