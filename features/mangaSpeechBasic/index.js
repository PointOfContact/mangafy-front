import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Head from 'next/head';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MangaSpeechBasic = ({ user }) => (
  <>
    <Head>
      <title>Manga Speech Basic</title>
      <meta
        name="Manga Speech and SFX basics"
        content="Hey All, and welcome to yet another Manga basics tutorial thanks to our in-house resident advisor and staff member, 
        Mina Petrovic (aka Mistiqarts) 😊 This time, we will cover the basics of doing Speech and SFX basics when writting/illustrating a Manga.
        Ready to start reading? we hope you enjoy."
      />
      <meta property="og:url" content="https://mangafy.club/resources/manga-speech-basic" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="Manga Speech and SFX basics" />
      <meta
        property="og:description"
        content="Hey All, and welcome to yet another Manga basics tutorial thanks to our in-house resident advisor and staff member, 
        Mina Petrovic (aka Mistiqarts) 😊 This time, we will cover the basics of doing Speech and SFX basics when writting/illustrating a Manga.
        Ready to start reading? we hope you enjoy."
      />
      <meta property="og:image" content="https://mangafy.club/img/manga-speech-basic/1.png" />
    </Head>
    <ButtonToTop />
    <div className={'wrapper'}>
      <div className={'content'}>
        <Header user={user} />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Manga Speech Basic</h1>
          <div className={styles.share}>
            <span className={styles.data}>
              <a href="https://mistiqarts.com/">Mina Petrovic </a> March 30, 2021 ·3 min read ★
            </span>
            <div className={styles.items}>
              <ShareButtons shareUrl="https://mangafy.club/resources/manga-speech-basic" text="" />
            </div>
          </div>
          <div>
            <p>
              Hey All, and welcome to yet another Manga basics tutorial thanks to our in-house
              resident advisor and staff member, Mina Petrovic (aka Mistiqarts) 😊 This time, we
              will cover the basics of doing Speech and SFX basics when writting/illustrating a
              Manga. Ready to start reading? we hope you enjoy.
            </p>
            <br />
            <Imgix
              width={879}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/1.png'}
            />
          </div>
          <div>
            <p>
              In this article, we will teach you about creating sound effects (or “onomatopoeia”).
              Such a process of creating a word that phonetically suggests the sound it comes to
              describe. For example – “Crash”, “Swoosh”, “Meow” or “Bang”.
            </p>
            <p>
              So, what is a panel? Panels are being used in all forms of graphic novels from western
              comics to web-toon and Manga. A panel or multiple-panel sequence of a comic strip
              consists of a single drawing acting as a frozen moment. They use it to create an
              ongoing story.
            </p>
            <p>Here are a few examples:</p>
            <br />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/2.png'}
            />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/3.png'}
            />
            <br />
            <strong>So...what are the basics? how do we get started?</strong>
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/4.png'}
            />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/5.png'}
            />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/6.png'}
            />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/7.png'}
            />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/8.png'}
            />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/9.png'}
            />
            <Imgix
              width={621}
              height={879}
              src={'https://mangafy.club/img/manga-speech-basic/10.png'}
            />

            <p>
              We hope you enjoyed reading. Give a warm thanks to Mina for sharing or experience with
              us.
            </p>
            <p>
              Make sure to check out or website, books and other cool content on her website:{' '}
              <a href="https://mistiqarts.com/">https://mistiqarts.com/.</a>and social channels,
              including Youtube.
            </p>
            <p>
              Now, let's get creative, show us how you emphasis effects in scenes in your story.
              More to come :)
            </p>
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/manga-speech-basic"
                  text="Liked? Share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterPolicy />
    </div>
  </>
);

MangaSpeechBasic.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MangaSpeechBasic;
