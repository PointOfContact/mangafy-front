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
      title="Manga Paneling Basics"
      description="Hey All, in this first tutorial on MangaFY, we'd like to share with you the paneling basics for Manga, by our very own team member and consultant, Mina Petrovic."
      canonical="https://mangafy.club/resources/manga-paneling-basics"
      openGraph={{
        url: 'https://mangafy.club/resources/manga-paneling-basics',
        title: 'Manga Paneling Basics',
        description:
          "Hey All, in this first tutorial on MangaFY, we'd like to share with you the paneling basics for Manga, by our very own team member and consultant, Mina Petrovic.",
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
          <h1 className={styles.pageTitle}>Manga Paneling Basics</h1>
          <div className={styles.share}>
            <span className={styles.data}>
              <a href="https://mistiqarts.com/">Mina Petrovic </a> March 30, 2021 ·3 min read ★
            </span>
            <div className={styles.items}>
              <ShareButtons
                shareUrl="https://mangafy.club/resources/manga-paneling-basics"
                text=""
              />
            </div>
          </div>
          <div>
            <p>
              Hey All, in this tutorial on MangaFY, we'd like to share with you the paneling basics
              for Manga, by our very own team member and board consultant, Mina Petrovic. Mina (aka
              Mistiqarts) is a manga influencer, author of several books, and the founder of one of
              the first Manga schools outside of Japan.
            </p>
          </div>
          <div>
            <p>
              When we think about what is setting Manga apart from other comic or graphic novel
              variations, the first thing most likely to come to mind is the Japanese culture, and
              the fact we read it right to left, etc. But another key feature to set it apart is the
              paneling that makes it really stand out.
            </p>
            <p>
              So, what is a panel? Panels are being used in all forms of graphic novels from western
              comics to web-toon and Manga. A panel or multiple-panel sequence of a comic strip
              consists of a single drawing acting as a frozen moment. They use it to create an
              ongoing story.
            </p>
            <p>But, paneling also has many layers to it, which we will address in this tutorial.</p>
            <br />
            <Imgix
              width={860}
              height={1000}
              src={'https://mangafy.club/img/setovi.jpg'}
              alt="MangaFy setovi"
            />
            <Imgix
              width={860}
              height={1000}
              src={'https://mangafy.club/img/lesson_1.jpg'}
              alt="MangaFy lesson"
            />
            <br />
            <strong>CHECK LISTS AND TEMPLATES</strong>
            <p>There are several panel templates you can utilize.</p>
            <Imgix
              width={860}
              height={1000}
              src={'https://mangafy.club/img/Untitled.png'}
              alt="MangaFy untitled"
            />
            <p>But note:</p>
            <ul>
              <li>
                Thin panel edges are often used for Shōjo <b> manga (少女漫画) </b>
              </li>
              <li>
                Thick panel edges are often used for Shōnen <b> manga (少年漫画)</b>
              </li>
            </ul>
            <h2>Now let's try panels that serve a purpose</h2>
            <h2>Characters Introduction</h2>
            <p>
              When introducing a new character into the story, a vertical panel showing the
              character is the most efficient. Reactions to the character will add to the story.{' '}
            </p>
            <p>Some basic image elements are: </p>
            <ul>
              <li>Background for the environment but also for emotions.</li>
              <li>
                Character emotions with appropriate emotion symbols like arrows, sweat drops, blush
                lines and etc.
              </li>
            </ul>
            <p>
              Elements of note here is that you are always allowed to play with characters popping
              outside the frames.
            </p>
            <Imgix
              width={860}
              height={1000}
              src={'https://mangafy.club/img/3.jpg'}
              alt="MangaFy frames"
            />
            <Imgix
              width={860}
              height={1000}
              src={'https://mangafy.club/img/1.jpg'}
              alt="MangaFy frames"
            />
            <h2>Fast scene</h2>
            <p>
              This is a paneling choice when we want to show a quick scene playing out, like this
              scent of the characters hair getting chopped off.
            </p>
            <p>Some basics image elements are:</p>
            <ul>
              <li>
                Sound effect for a moving blade and right after we show the scent following the
                sound.
              </li>
            </ul>
            <p>
              The panels for such speedy scenes are usually draw slightly tilted, creating almost a
              tiny animated sequence of three images{' '}
            </p>
            <p>
              Even thought the scene is fast, try to add as much of emotion as possible. Manga
              panels always need to evoke a feeling with the audience{' '}
            </p>
            <Imgix
              width={860}
              height={860}
              src={'https://mangafy.club/img/2.jpg'}
              alt="MangaFy iframe"
            />
            <p>
              We hope you enjoyed the tutorial and you can also visit Mina's website for more
              awesome content: <a href="https://mistiqarts.com/">https://mistiqarts.com/.</a>
            </p>
            <p>
              Now, it's time to train and be creative, go to the MangaFY platform, and share with us
              a panel from your upcoming project/story. Have a friend who also dreams of learning
              cool things? loves comics or manga? or has a story he wants to turn into a graphic
              novel? bring him over to MangaFY :).
            </p>
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/manga-paneling-basics"
                  text="Liked? Share"
                />
              </div>
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

MangaPanelingBasics.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MangaPanelingBasics;
