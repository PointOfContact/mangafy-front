import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Footer from '../../components/footer';
import Header from '../../components/header';

const NotFound = () => (
  <>
    <Head>
      <title>Not to worry! MangaFY with you.</title>
      <meta
        name="description"
        content="We searched high and low but couldn't find what you are looking for. Not to worry!"></meta>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://cdn.jsdelivr.net/npm/scroll-snap@3.0.2/dist/index.min.js"></script>
    </Head>

    <div className="main_back_2 err_page">
      <Header />
      <div className="row justify-content-center">
        <div
          className="col-lg-6 login_page"
          className="notFoundCode"
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <img
            src="/img/notFound.webp"
            alt=""
            style={{
              width: 'fit-content',
              margin: 'auto',
            }}
          />
          <div className="pageNotCode">404</div>
          <div className="pageNotFound">Ooops, we lost this page</div>
          <div className="info404Cont">
            <div className="info404">
              We searched high and low but couldn't find what you are looking for. Not to worry!
            </div>
            <div className="info404">Let's find a better place for you to go</div>
          </div>
          <Link href="/">
            <button id="button404Id" className="button404">
              MangaFY Home
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  </>
);

export default NotFound;
