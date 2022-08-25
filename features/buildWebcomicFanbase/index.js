import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import HeaderNew from 'components/headerNew';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const BuildWebcomicFanbase = ({ user }) => (
  <>
    <NextSeo
      title="Build Webcomic Fanbase"
      description="Congratulations, you've published the first chapter of your manga or comics"
      canonical="https://mangafy.club/resources/build-webcomicw-fanbase"
      openGraph={{
        url: 'https://mangafy.club/resources/build-webcomicw-fanbase',
        title: 'Build Webcomic Fanbase',
        description: "Congratulations, you've published the first chapter of your manga or comics",
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/articleProjects.png',
            width: 800,
            height: 600,
            alt: 'Manga Story Image',
          },
        ],
        site_name: 'MangaFY',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    <ButtonToTop user={user} />
    <div className={'wrapper'}>
      <div className={'content'}>
        <HeaderNew user={user} />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>How to build your webcomic fanbase</h1>
          <br />
          <p className={styles.data}>
            {' '}
            <span>&#174;</span> Rami Rozen March 10, 2021 ·3 min read ★
          </p>
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons
                shareUrl="https://mangafy.club/resources/build-webcomic-fanbase"
                text=""
              />
            </div>
          </div>
          <div>
            <p>
              Congratulations, you've published the first chapter of your manga or comics, be it via
              self-hosting or self-publishing popular platforms (Webtoon, Tapas, etc.). Now comes
              the question - how do we get new readers and grow our webcomics fanbase?
            </p>
            <p>
              In this article, we dive into a few strategies that will help you promote your work.
            </p>
            <h2>Networking</h2>
            <p>
              Mingling with fellow creators on social media or online forums (FB, IG, Twitter,
              Pixiv, deviantART). Introduce yourself and offer to collaborate with the community on
              their work, posts, or share from your experience all while making sure you follow the
              community rules.
            </p>
            <p>
              Networking with other manga and comic-book creators is a key opportunity to learn from
              them on how they put new fresh eyes on their work, and how you can replicate it.
            </p>
            <h2>Multi-channel reach</h2>
            <p>
              Publish your comics on multiple platforms (MangaCat, Tapas, Webtoon, etc.) as you can.
              Also, share links to your work on relevant channels on Reddit, Discord, Twitter, FB,
              etc. The more places we post, the more we increase the potential of exposing our
              webcomic to new readers.
            </p>
            <p>Stand out, make posts of your work unique.</p>
            <h2>Frequency Posting</h2>
            <p>
              The more we update our work and meeting deadlines (like a new chapter every two
              weeks), we keep our readers engaged. On self-publishing platforms such as Webtoon and
              Tapas, the more frequently we update and upload new content of our webcomics, we
              increase the odds of new readers discovering our work.
            </p>
            <h2>Patience</h2>
            <p>
              An important virtue. The more experience we gain the more skilled we become. Our
              webcomics will not become an instant hit overnight, and attracting readers and
              standing out takes time. Develop your craft.
            </p>
          </div>
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons
                shareUrl="https://mangafy.club/resources/build-webcomic-fanbase"
                text="Liked? Share"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer user={user} />
      <FooterPolicy />
      <FooterLogin user={user} />
    </div>
  </>
);

BuildWebcomicFanbase.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BuildWebcomicFanbase;
