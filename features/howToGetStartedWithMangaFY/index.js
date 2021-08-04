import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MangaPanelingBasics = ({ user }) => (
  <>
    <NextSeo
      title="Create your first projects"
      description="How to get started with MangaFY"
      canonical="https://mangafy.club/resources/how-to-get-started-with-MangaFY"
      openGraph={{
        url: 'https://mangafy.club/resources/how-to-get-started-with-MangaFY',
        title: 'Create your first projects',
        description: 'How to get started with MangaFY',
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/Untitled.png',
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
          <h1 className={styles.pageTitle}>How to Creating project</h1>
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons
                shareUrl="https://mangafy.club/resources/how-to-get-started-with-MangaFY"
                text=""
              />
            </div>
          </div>
          <div>
            <h1>How to get started with MangaFY</h1>
            <p>
              Hey, thank you for visiting MangaFY! Where we encourage creative creation in a
              collaborative environment. On MangaFY, aspiring and freelance artists do things
              together. Be it an amateur writer or illustrator or a freelancer inker, editor, or
              translator - open a project, and start collaborating on taking your manga or comic or
              novel idea from story to a ready to self-publication product.
            </p>
          </div>
          <div>
            <h2>Sounds cool? how do you get started, you ask?</h2>
            <p>
              Simply, as ABC! First, let's register to the site: A. Go to the -{' '}
              <a href="https://mangafy.club/sign-in](https://mangafy.club/sign-in">
                MangaFY log-in page
              </a>
              B. Go to the "No Account yet? start your journey, and press it.
            </p>
            <br />
            <Imgix
              width={860}
              height={1000}
              src={'https://mangafy.club/img/Untitled.png'}
              alt="MangaFy untitled"
            />
            <p>
              C. It will lead you to the start of your profile screen where you feel your name, your
              artist role (are you an illustrator, writer, editor, inker, translator, etc.), your
              email, and desired password. And no, worries you can change it later.
            </p>
            <br />
            <b>
              <Imgix
                width={860}
                height={1000}
                src={'https://mangafy.club/img/Untitled.png'}
                alt="MangaFy untitled"
              />{' '}
            </b>
            <p>
              D. Once done, you will get the following window - press the "Create Your First Story"
              button:
            </p>
            <br />
            <b>
              <Imgix
                width={860}
                height={1000}
                src={'https://mangafy.club/img/Untitled.png'}
                alt="MangaFy untitled"
              />
            </b>
            <br />
            <p>
              You will be directed to create your story page -
              https://mangafy.club/create-a-story/start. Press start and start building your user
              profile on MangaFY.
            </p>
            <Imgix
              width={860}
              height={1000}
              src={'https://mangafy.club/img/Untitled.png'}
              alt="MangaFy untitled"
            />
            <p>Note:</p>
            <p>
              <strong>Note:</strong> building a detailed user profile is extremely important - it is
              your calling card for people to reflect on your works, story, what collaborations you
              are looking for, and connections with the community. Hence, be as detailed as you can
              be.
            </p>
            <p>
              Here you will also share info about you, where you draw your aspirations, what types
              of collaborations you are looking for, and under which language.
            </p>
            <p>
              F. Once done - you'll be able to start working on your project and look for
              collaborations.
            </p>
            <p>
              That's it, you are now also officially logged into MangaFY - Mazal Tov! 🥳 You are
              also able to configure your personal profile by pressing in the upper banner on
              "Profile":
            </p>
            <p>
              <Imgix
                width={860}
                height={1000}
                src={'https://mangafy.club/img/Untitled.png'}
                alt="MangaFy untitled"
              />
            </p>
            {user?._id && <p>Or going directly here - https://mangafy.club/profile/{user?._id}</p>}
            <p>
              <strong>Under Portfolio</strong> - you can hyperlink your works from various places
              like Webtoon, Tapas, Behance, DeviantArt, etc.
            </p>
            <p>
              <strong>Under Services</strong> - what services you offer and what is your price-rate,
              i.e - illustrator - how much do you take for 1 page, color page, etc. What type of
              collaborations you look for, free, paid, etc.
            </p>
            <p>
              Welcome! Now, it's time to train and be creative, go to the MangaFY platform, and
              share with us a panel from your upcoming project/story. Have a friend who also dreams
              of learning cool things? loves comics or manga? or has a story he wants to turn into a
              graphic novel? bring him over to MangaFY :).
            </p>
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/how-to-get-started-with-MangaFY"
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

MangaPanelingBasics.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MangaPanelingBasics;
