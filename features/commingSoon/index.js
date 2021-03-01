import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Pricing = (props) => {
  const { user } = props;

  return (
    <div className="">
      <Head>
        <title>MangaFY Pricing</title>
        <meta name="MangaFY Pricing"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header path="comming-soon" user={user} />
        <Footer />
      </main>
    </div>
  );
};

Pricing.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Pricing;
