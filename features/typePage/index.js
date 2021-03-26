import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import TypePage from 'components/type-content';
import ButtonToTop from 'components/ui-elements/button-toTop';

export default function LandingNew() {
  return (
    <>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header />
          <main>
            <TypePage />
          </main>
        </div>
        <Footer />
        <FooterPolicy />
      </div>
    </>
  );
}
