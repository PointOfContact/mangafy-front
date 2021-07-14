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

const CreatingProjectAndCollaborating = ({ user }) => (
  <>
    <NextSeo
      title="Creating A Project and Collaborating"
      description="MangaFY makes project management and collaboration on your web-comic or manga as simply and efficient as possible."
      canonical="https://mangafy.club/resources/creating-project-and-collaborating"
      openGraph={{
        url: 'https://mangafy.club/resources/creating-project-and-collaborating',
        title: 'Creating A Project and Collaborating',
        description:
          'MangaFY makes project management and collaboration on your web-comic or manga as simply and efficient as possible.',
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
          <h1 className={styles.pageTitle}>Creating A Project and Collaborating </h1>
          <br />
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons
                shareUrl="https://mangafy.club/resources/creating-project-and-collaborating"
                text=""
              />
            </div>
          </div>
          <div>
            <p>
              MangaFY makes project management and collaboration on your web-comic or manga as
              simply and efficient as possible.
            </p>
            <p>Before finding your desired collaboration partner, you need to open up a project.</p>
            <h3>How to open a project on MangaFY?</h3>
            <p>
              First Enter MangaFY and open a project (free or paid collaboration). Once you are at
              your folder - click on the project you wish to start with:
            </p>
          </div>
          <div>
            <br />
            <img src="/img/articleProjects.png" alt="projects" />
            <img src="/img/articleCardStory.png" alt="card story" />
            <p>
              After that, go to the <strong>STORYBOARD</strong> slide and begin to work on your
              project (story, characters, etc.) and you are also able to invite people to
              collaborate by pressing the <strong>FIND A PARTNER</strong> tab:
            </p>
            <h3>How to invite collaborations to your project on MangaFY.</h3>
            <img src="/img/articleCardStoryBoard.png" alt="card story board" />
            <br />
            <p>
              This will open up the <strong>FIND A MEMBER</strong> section of the MangaFY community,
              allowing you to search for the relevant person you see fit for your project (be it a
              writer, illustrator, editor, translator, inker, etc.):
            </p>
            <br />
            <img src="/img/articleSearch.png" alt="search" />
            <br />
            <p>
              Enter a members profile and invite them for a collaboration by pressing the
              <strong>INVITE TO COLLABORATE </strong> button:
            </p>
            <br />
            <img src="/img/articlePortfolio.png" alt="portfolio" />
            <br />
            <p>
              Once pressed a window will open up so you can reach the member with what type of
              collaboration you are looking for. Once done - press <strong>SEND INVITE</strong>.
            </p>
            <br />
            <img className={styles.sendInvite} src="/img/articleSendInvite.png" alt="send invite" />
            <br />
            <p>
              <b>Note:</b> it is important to fill out the "your message" section to keep it as
              personal and detailed as possible.
            </p>
            <p>
              Once done, the member you shared an invite with will get both an{' '}
              <strong>EMAIL NOTIFICATION</strong>
              and an <strong>ALERT</strong> on site, notifying them of your reach.
            </p>
            <br />
            <img
              className={styles.notification}
              src="/img/articleNotification.png"
              alt="notification"
            />
            <br />
            <p>
              Once they approved you will get notified as well and can begin communication and work
              on the project together.
            </p>
            <p>
              We can't wait to see what your collaborative efforts and team will achieve. Ready to
              work on your project?
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
      <Footer />
      <FooterPolicy />
      <FooterLogin user={user} />
    </div>
  </>
);

CreatingProjectAndCollaborating.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CreatingProjectAndCollaborating;
