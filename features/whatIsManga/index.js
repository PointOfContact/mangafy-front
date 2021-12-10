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

const WhatIsManga = ({ user }) => (
  <>
    <NextSeo
      title="What is Manga"
      description="So, you are thinking about starting to write a manga? you came to the right place, MangaFY is here to help."
      canonical="https://mangafy.club/resources/what-is-manga"
      openGraph={{
        url: 'https://mangafy.club/resources/what-is-manga',
        title: 'What is Manga',
        description:
          'So, you are thinking about starting to write a manga? you came to the right place, MangaFY is here to help.',
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/wathIsManga.png',
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
          <h1 className={styles.pageTitle}>What is Manga? a starters guide</h1>
          <br />
          <p className={styles.data}>
            <span>&#174;</span> Rami Rozen March 10, 2021 ·3 min read ★
          </p>
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons shareUrl="https://mangafy.club/resources/what-is-manga" text="" />
            </div>
          </div>
          <div>
            <p className={styles.desc1}>
              <strong>So, you are thinking about starting to write a manga?</strong> you came to the
              right place, MangaFY is here to help. Here, we present a breakdown as to what is Manga
              and its various genres.
            </p>
            <br />
            <img src={'/img/wathIsManga.png'} alt="MangaFy speech basic" />
          </div>
          <div>
            <br />
            <p>
              <strong>First, what is Manga?</strong> Manga is a term describing a variety of
              Japanese comic books and graphic novels. Unlike American comics, which are full color,
              Manga&apos;s are often always published in black and white. Full-color manga is
              reserved for special releases. In addition, Manga series are long-running, spanning
              multiple volumes.
            </p>
            <p>
              The manga became popular worldwide with massive consumption digitally and on printed
              media, surpassing even other forms of comics.
            </p>
            <p>
              <strong>Connecting Manga to Anime.</strong> Anime is a term describing Japanese
              cartoons that are more than often adaptations based on Japanese Manga or graphic
              novels. This became a global phenomenon when Anime started airing in the west on TV
              during the 90s.
            </p>
            <p>Anime is animation. Manga is print. That is the difference.</p>
            <strong>There are five demographics of Manga:</strong>
            <p>
              <strong>Shonen</strong>: A manga that is aimed at tween and teen boys. Common themes
              include coming of age, action, adventure, and friendship. Examples: My Hero Academia,
              Naruto, and Dragon Ball.
            </p>
            <p>
              The plots often use features of action and comedy, with some sort of coming-of-age
              interactions between characters.
            </p>
            <p>
              <strong>Shojo</strong>: A manga that is aimed at tween and teen girls. Common themes
              include Romance, Drama, and Coming of Age. Examples: Salir Moon, Love Hina, Fruits
              Basket.
            </p>
            <p>
              The focus in Shojo is less on the action and more on drama, emotions, and romance.
              Like Shonen, it also features a coming of age story of a young protagonist. The focus
              here is less on the action and more on drama, emotion, and, almost always, idealized
              romance. Like shonen manga, shojo manga usually features the coming-of-age story of a
              young protagonist.
            </p>
            <p>
              <strong>Seinen</strong>: A manga that is targeted at adult men at the ages of 18+.
              Common themes include Action, Violence, Sex, Adult themes. Examples: Akira and
              Berserk.
            </p>
            <p>
              Like Shonen, seinen manga features action and violence, but with a darker and edgier
              content and tone. Whereas the Shonen series often features characters with an
              idealized or innocent worldview, the seinen series will follow a protagonist who must
              face reality and not always save the day.
            </p>
            <p>
              <strong>Josei</strong>: A manga that is targeted at adult women at the ages of 18+.
              Common themes include Sex, Romance, and Drama. Examples: Loveless.
            </p>
            <p>
              Josei manga features mature narratives that explore romance and personal
              relationships, told in a deeper depth than their Shojo counterparts. Unlike Shojo,
              which often follows a female main character, Josei features both male and female
              protagonists.
            </p>
            <p>
              <strong>Kodomomuke</strong>: A manga that is targeted at children. Examples: Pokemon.
            </p>
            <p>Such a manga will feature cutesy, moralistic, and fun characters and plots.</p>
            <p>
              We hope you enjoyed the article. Have a story idea that you want to pan out and
              produce to a manga? check us out at https://mangafy.club.
            </p>
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/what-is-manga"
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

WhatIsManga.propTypes = {
  user: PropTypes.object.isRequired,
};

WhatIsManga.defaultProps = {
  user: {},
};

export default WhatIsManga;
