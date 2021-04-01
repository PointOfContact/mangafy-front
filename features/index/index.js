import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Home from 'features/index/home';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Landing = ({ user }) => (
  <>
    <Head>
      <title>MangaFY – From story buidling to a full digital release.</title>
      <meta
        name="description"
        content="The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release."
      />
      <meta property="og:url" content="https://www.mangafy.club" />
      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content="Start your Graphic Novel Journey and Get Creative with MangaFY"
      />
      <meta
        property="og:description"
        content="The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release."
      />
      <meta property="og:image" content="https://i.postimg.cc/cCy8qTg7/manga.jpg" />
    </Head>
    <ButtonToTop />
    <div className={'wrapper'}>
      <div className={'content'}>
        <Header path="" user={user} />
        <main>
          <Home />
        </main>
      </div>
      <Footer />
      <FooterPolicy />
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
