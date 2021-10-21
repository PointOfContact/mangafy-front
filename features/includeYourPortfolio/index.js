import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const IncludeYourPortfolio = ({ user }) => (
  <>
    <NextSeo
      title="Include Your Portfolio"
      description="It's all about the portfolio! Consider creating portfolio pieces that will demonstrate everything you can do for an editor or possible co-book."
      canonical="https://mangafy.club/resources/include-your-portfolio"
      openGraph={{
        url: 'https://mangafy.club/resources/include-your-portfolio',
        title: 'Include Your Portfolio',
        description:
          "It's all about the portfolio! Consider creating portfolio pieces that will demonstrate everything you can do for an editor or possible co-book.",
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/include.png',
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
            What To Include In Your Portfolio: Ultimate Guide for Graphic Novel Creators
          </h1>
          <br />
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons
                shareUrl="https://mangafy.club/resources/include-your-portfolio"
                text=""
              />
            </div>
          </div>
          <div>
            <p>
              It's all about the portfolio! Consider creating portfolio pieces that will demonstrate
              everything you can do for an editor or possible co-book. creator's You want to show
              off anything that will set you apart from the competition, and having interesting
              backgrounds and being competent at all the other things will undoubtedly make you an
              exceptional candidate. At MangaFY, we considered the most convenient option to host
              your portfolio and greet the globe with your strongly "Hello world" greeting.
            </p>
          </div>
          <div>
            <br />
            <Imgix
              width={860}
              height={1300}
              src={'https://mangafy.club/img/include.png'}
              alt="MangaFy include"
            />
            <br />
            <br />
            <p>
              We understand that putting your information out there in the public eye can be scary,
              but editors and creators are always looking for new talent and agree before any
              collaboration you would love to have with this talent. Seriously, your portfolio is
              the finest method to show off your personality.
            </p>
            <br />
            <p>
              Although the list of creators outnumbers the amount of labor, it's useful to know who
              to contact for any project that arises. As a result, if you want to be such a person,
              you should concentrate solely on your portfolio.
            </p>
            <p>
              There's no need for a spectacular website with a fancy domain or anything. At MangaFY,
              you may create a profile for your work that includes a brief bio, previous works (both
              images and scripts), social media links, and, most importantly, genres you enjoy
              working with.
            </p>
            <p>
              There are a ton of factors that go into whether or not someone is a good fit for a
              project and most of those come from seeing sequential page samples.
            </p>
            <p>
              If you don’t have art to work on and practice with, there are templates and such you
              can use to practice your colouring and lettering skills.
            </p>
            <p>
              But again, no matter what: the most important thing is always to have a way that you
              can be contacted - so use chat and happy collaboration!
            </p>
            <br />
            <p>
              If you have questions, corrections, or any tips you’d like to add to this piece,
              please reach out to info@mangafy.club and us know.
            </p>
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/include-your-portfolio"
                  text="Liked? Share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterPolicy />
      {/* <FooterLogin user={user} /> */}
    </div>
  </>
);

IncludeYourPortfolio.propTypes = {
  user: PropTypes.object.isRequired,
};

export default IncludeYourPortfolio;
