import React, { useEffect, useRef, useCallback } from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import PropTypes from 'prop-types';

const Start = ({ user }) => {
  const typeformRef = useRef(null);

  const onSubmit = useCallback(async () => {
    Router.push(`/collaborations`);
  }, []);

  useEffect(() => {
    import('@typeform/embed').then((typeformEmbed) => {
      typeformEmbed.makeWidget(typeformRef.current, 'https://form.typeform.com/to/bAv7ReI7', {
        hideFooter: true,
        hideHeaders: true,
        opacity: 50,
        onSubmit,
      });
    });
  }, [typeformRef, onSubmit]);

  return (
    <>
      <NextSeo title="Support" description="Contact us, and I'm sure we will find a solution" />

      <div>
        <Header path="contact-us" user={user} />
        <div ref={typeformRef} style={{ height: '100vh', width: '100%' }}></div>
        <Footer user={user} />
        <FooterLogin user={user} />
      </div>
    </>
  );
};

Start.propTypes = {
  user: PropTypes.object,
};

Start.defaultProps = {
  user: null,
};

export default Start;
