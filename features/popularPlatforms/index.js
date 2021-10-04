import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const PopularPlatforms = ({ user }) => (
  <>
    <NextSeo
      title="Popular Platforms"
      description="The most popular self-publishing platforms for graphic novels"
      canonical="https://mangafy.club/resources/popular-platforms"
      openGraph={{
        url: 'https://mangafy.club/resources/popular-platforms',
        title: 'Popular Platforms',
        description: 'The most popular self-publishing platforms for graphic novels',
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/setovi.jpg',
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
    <ButtonToTop />
    <div className={'wrapper'}>
      <div className={'content'}>
        <Header user={user} />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>
            The most popular self-publishing platforms for graphic novels
          </h1>
          <br />
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons shareUrl="https://mangafy.club/resources/popular-platforms" text="" />
            </div>
          </div>
          <div>
            <h2>The most popular self-publishing platforms for graphic novels</h2>
          </div>
          <div>
            <br />
            <br />
            <p>
              In order to choose the best self-publishing platform for your graphic novel, you
              should first learn about the two major types of platforms
            </p>
            <br />
            <ul>
              <li>
                <b>Do-it-yourself self-publishing platform</b>: This type of platform is exactly
                what it sounds like. In our opinion, DIY options are severely limiting for authors.
                You’ll need to handle all the pre-production stages yourself (or collaborate at
                MangaFY), including book cover design, editing, interior layout, marketing and more.
              </li>
              <br />
              <li>
                <b>One-stop shop self-publishing platform:</b> This platform will cover all your
                self-publishing needs under one company’s roof. This option is especially suitable
                for folks who either don’t have the time or inclination to do all the work
                themselves but still want to enjoy the benefits of self-publishing such as retaining
                their copyright and publishing rights and keeping creative control.
              </li>
            </ul>
            <br />
            <p>
              Do you prefer to do everything on your own? If so, the do-it-yourself platforms are
              most likely ideal for you.
            </p>
            <br />
            <p>
              When we created{' '}
              <a href={'https://mangafy.club'} className={styles.href}>
                MangaFY{' '}
              </a>{' '}
              we marked a target - to provide simple and dedicated tools for aspiring artists to
              collaborate and manage their production cycle to turn their story from an idea to a
              digital comic or manga ready for publishing.
            </p>
            <p>
              We know artists often find themselves being challenged in a number of various ways.
              Not only by how to self-produce but also where to self-publish once your work is done.
              Luckily, the internet has blessed us with many solutions for artists to monetize their
              work.
            </p>
            <p>
              At MangaFY, once you are done with your comic or manga project - you can easily upload
              it to any of the major platforms available. We breakdown our recommended platforms
              below:
            </p>
            <p>
              <a href="https://webtoon.com" className={styles.href}>
                <b>Webtoon</b>
              </a>
              : Leading the front are Webtoon, a mobile platform that is constantly rising in
              popularity with over 100 billion views annually while while averaging over 55 million
              monthly active visitors. In addition, they have 15M daily readers - a perfect place to
              publish your work and monetize it.
            </p>
            <br />
            <br />
            <p>
              <a href="https://tapas.io" className={styles.href}>
                <b>Tapas</b>
              </a>
              : Another major platform, Tapas was recently acquired by Korean giants Kakao. Tapas
              has a large creators community with over 92,000 published stories. With several ways
              to monetize your work - you can easily publish your work on the platform and expose it
              to millions of readers.
            </p>
            <br />
            <br />
            <p>
              <strong>MangaCat:</strong> Another great platform to showcase your work. Allowing
              artists to receive 50% of the revenues when their work is being read. Their community
              can also assist in translating your work into multiple languages, allowing your work
              to spread across the globe.
            </p>
            <p>
              Link to MangaCat:{' '}
              <a href="https://www.mangacat.io/stories" className={styles.href}>
                https://www.mangacat.io/stories
              </a>
            </p>
            <p>
              <a href="https://about.lezhin.com/" className={styles.href}>
                <b>Lezhin</b>
              </a>
              :Hosting hundreds of webtoon and cartoons, cartoons, Lezhin is one of South Korea's
              largest webtoon publishers. Their content is created by professional and amateur
              creators alike,
            </p>
            <br />
            <br />
            <p>
              <a href="https://www.kobo.com/us/en/p/writinglife" className={styles.href}>
                <b>Kobo Writing Life</b>:
              </a>{' '}
              Less known than the above, Kobo is a self-publishing platform for manga writers. Users
              can publish their manga through Kobo Writing Life. It is more popular in Japan, but
              creators from all over the world can publish manga.
            </p>
            <br />
            <br />
            <p>
              <a href="https://www.voyce.me/" className={styles.href}>
                <b>VoyceMe</b>
              </a>
              : a great new self-publishing platform for graphic novel writers, they host
              high-quality novels (manga and comics) and allow creators easy signup and posting
              within minutes. They also offer great opportunities for creators to generate and
              promote their work.
            </p>
            <br />
            <br />
            <p>
              We look forward to seeing your work. Got a great story to tell? publishing it in any
              of those great self-publishing platforms above.
            </p>
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/popular-platforms"
                  text="Liked? Share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterPolicy />
      <FooterLogin user={user} />
    </div>
  </>
);

PopularPlatforms.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PopularPlatforms;
