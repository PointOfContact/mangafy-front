import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Home from 'features/index/home';
import PropTypes from 'prop-types';

const Landing = ({ user }) => (
  <>
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
