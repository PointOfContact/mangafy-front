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
        content="The digital hub designed to help you produce your very owm comic or manga."
      />
      <meta property="og:url" content="https://www.mangafy.club" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="When Great Minds Don’t Think Alike" />
      <meta
        property="og:description"
        content="How much does culture influence creative thinking?"
      />
      <meta
        property="og:image"
        content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
      />
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
