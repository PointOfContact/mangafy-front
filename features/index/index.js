import React, { useState } from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Home from 'features/index/home';
import PropTypes from 'prop-types';

const Landing = ({ user }) => {
  const { showCookies, setShowCookies } = useState(true);

  return (
    <>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header />
          <main>
            <Home />
          </main>
        </div>
        <Footer />
        <FooterPolicy />
      </div>
    </>
  );
};

Landing.prototype = {
  user: PropTypes.object,
};

export default Landing;
