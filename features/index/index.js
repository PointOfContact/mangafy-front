import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import HeaderNew from 'components/headerNew';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import Home from 'features/index/home';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

const Landing = ({ user }) => (
  <>
    <NextSeo
      title="MangaFY – From story buidling to a full digital release."
      description="The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release."
      canonical="https://www.mangafy.club"
      openGraph={{
        url: 'https://www.mangafy.club',
        title: 'MangaFY – From story buidling to a full digital release.',
        description:
          'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.',
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/api/v2/uploads/1646134866432-334418070-metaData.png',
            width: 800,
            height: 600,
            alt: 'Manga Story Image',
          },
        ],
        site_name: 'MangaFY',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    <ButtonToTop user={user} />
    <div className={'wrapper'}>
      <div className={'content'}>
        <HeaderNew user={user} />
        <main style={{ overflowX: 'hidden' }}>
          <Home />
        </main>
      </div>
      <Footer user={user} />
      <FooterPolicy />
      <FooterLogin user={user} />
    </div>
  </>
);

Landing.propTypes = {
  user: PropTypes.object,
};

Landing.defaultProps = {
  user: null,
};

export default Landing;
