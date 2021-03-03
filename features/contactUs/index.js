import React, { useEffect, useRef, useCallback } from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Head from 'next/head';
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
      <Head>
        <title>Contact Us</title>
      </Head>
      <div>
        <Header path="contact-us" user={user} />
        <div ref={typeformRef} style={{ height: '100vh', width: '100%' }}></div>
        <Footer />
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
