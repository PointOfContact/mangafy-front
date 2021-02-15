import React from 'react';

import Head from 'next/head';
// import styles from "./styles.module.scss";

const About = () => (
  <>
    <Head>
      <title>When MangaFY stories begin.</title>
      <meta name="description" content="Where and when does a story start?!"></meta>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="terms">
      <header id="header" className="gnb" style={{ backgroundColor: 'rgb(123, 100, 242)' }}>
        <a className="MangaFY-logo" href="/">
          MangaFY
        </a>
      </header>
      <link rel="stylesheet" href="styles/css.css" />{' '}
      <div className="wrap" data-sticky-wrap>
        <div className="medium-style">
          <section className="about">
            <div className="block">
              СOVID19 impacted lives around us, and while many need to adapt to new working methods
              away from the office, new social norms allow for greater online opportunities.{' '}
            </div>
            <div className="block">
              Communities and socialism now play a major role to allow anyone to aspire towards
              pursuing their dreams - even aspiring artists who dream of releasing their graphic
              novel or comic to life.
            </div>
            <div className="block">
              Enter MangaFy, where we support YOU! the aspiring or freelance artists, be it a writer
              or an illustrator looking to collaborate together and unify your skills sets by
              building a full production cycle to your story idea - from storyboard to digital
              publication, releasing your joint work, monetizing it and building your brand.
            </div>
            <div className="block">
              Today's dreams aren't limited to one's personal journey, as working as a team can
              drive major success to help you complete your road.
            </div>
            <div className="block">
              To learn more, check us out in{' '}
              <a href="#" target="_blank">
                Medium
              </a>
              ,{' '}
              <a href="#" target="_blank">
                Product Hunt
              </a>
            </div>
            <div className="block">
              Apply to be a MangaFY{' '}
              <a href="https://mangafy.club/sign-up" target="_blank">
                here
              </a>
              .
            </div>
          </section>
        </div>
      </div>
      <footer data-sticky-footer className="footer">
        <div className="footer-left" style={{ width: '70%' }}>
          <span style={{ color: 'rgb(47, 47, 47)' }}>
            MangaFY , Inc. © 2020. All rights reserved.
          </span>
          <span>
            <a href="/rules">Community Guidelines</a>
          </span>
          <span>/</span>
          <span>
            <a href="/content">Content</a>
          </span>
          <span>/</span>
          <span>
            <a href="/terms">Terms</a>
          </span>
          <span>/</span>
          <span>
            <a href="/privac-policy">Privacy Policy</a>
          </span>
        </div>
        <div className="footer-right">
          <a className="link" target="_blank" href="https://mangafy.herokuapp.com/sign-a">
            Write on MangaFY
          </a>{' '}
          <a className="link icon" target="_blank" href="https://www.facebook.com/mangafyy">
            {' '}
            <i className="fa fa-facebook" aria-hidden="true" />
          </a>
          <a className="link icon" target="_blank" href="https://twitter.com/Mangafy1">
            {' '}
            <i className="fa fa-twitter" aria-hidden="true" />
          </a>
          <a className="link icon" target="_blank" href="//instagram.com/MangaFYfiction/">
            <i className="fa fa-instagram" aria-hidden="true" />
          </a>
          <a className="link icon" target="_blank" href="//blog.MangaFY.club/">
            <i className="fa fa-tumblr" aria-hidden="true" />
          </a>
          <a className="link icon" href="mailto:info@MangaFY.club">
            <i className="fa fa-envelope" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  </>
);

export default About;
