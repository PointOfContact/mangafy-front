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

const ProductionManagementTool = ({ user }) => (
  <>
    <NextSeo
      title="Production Management Tool"
      description="Now that you opened your profile, added your portfolio and defined your project, outlined your story and type of collaboration you are looking for - it is time to get to work."
      canonical={`https://mangafy.club/resources/production-management-tool`}
      openGraph={{
        url: `https://mangafy.club/resources/production-management-tool`,
        title: 'Production Management Tool',
        description:
          'Now that you opened your profile, added your portfolio and defined your project, outlined your story and type of collaboration you are looking for - it is time to get to work.',
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/articleProProject.png',
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
          <h1 className={styles.pageTitle}>MangaFY's Production Management Tool </h1>
          <br />
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons
                shareUrl="https://mangafy.club/resources/production-management-tool"
                text=""
              />
            </div>
          </div>
          <div>
            <p>
              Now that you opened your profile, added your portfolio and defined your project,
              outlined your story and type of collaboration you are looking for - it is time to get
              to work. Upon assembling your team, the next step will lead you into the MangaFY
              production management tool.
            </p>
            <h3>First, what is the MangaFY Production Management Tool?</h3>
            <p>
              MangaFY is a collaboration platform, but also a management tool to provide artists
              with a one-stop shop for the production of your story from an idea into a fully
              ready-to-be publishing novel. The tool allows you to easily manage your script, page
              outline, characters, and proper flow to work and communicate with your fellow team
              members (be it illustrators, editors, translators, etc).
            </p>
            <h3>How can I reach the mangmant tool on MangaFY?</h3>
            <p>Easily, go stright into your desired project and enter it:</p>
          </div>
          <div>
            <Imgix
              width={860}
              height={400}
              src={'https://mangafy.club/img/articleProProject.png'}
              alt="MangaFy projects"
            />
            <p>
              Once you are inside your project go to upper bar and select
              <strong> STORY BOARD</strong> option:
            </p>
            <Imgix
              width={860}
              height={740}
              src={'https://mangafy.club/img/articleProStoryBoard.png'}
              alt="MangaFy card story board"
            />
            <p>
              From here, it's pretty straightforward as we kept it simple and organized to have a
              suitable follow to for you and your team to work on your project through 6 simple
              sections:
            </p>
            <div className={styles.smallPhoto}>
              <Imgix
                width={560}
                height={600}
                src={'https://mangafy.club/img/articleProStoryBoardTwo.png'}
                alt="MangaFy card story board"
              />
            </div>
            <p>
              The first section is the <strong>story bible and plot management</strong>. Here you
              write the bible (world overview) of your story).
            </p>
            <p>
              Second section of the story bible is to <strong>define your characters:</strong>
            </p>
            <Imgix
              width={860}
              height={750}
              src={'https://mangafy.club/img/articleCreateCards.png'}
              alt="MangaFy create cards"
            />
            <p>
              Enter characters of your tale, from main to secondary and background characters you
              wish to include into the production of your tale. Give them names and story
              backgrounds that will help your team and illustrators understanding the concept you
              aim to achieve.
            </p>
            <p>
              Third stage is the <strong>Manga and Page layout script</strong>. Define how many
              pages your work will include, add the text and scene description for each page so your
              team can draw and illustrate it.
            </p>
            <Imgix
              width={860}
              height={720}
              src={'https://mangafy.club/img/articleCreateScript.png'}
              alt="MangaFy create script"
            />
            <p>
              The fourth stage is the <strong>digital illustration</strong> section. You can use any
              of the sample templates provided and of course you and your team can upload and
              customize your own. Matching between the page and scene scripts and their panel
              illustrations smoothly and easily in one accessible place.
            </p>
            <Imgix
              width={860}
              height={840}
              src={'https://mangafy.club/img/articleBackground.png'}
              alt="MangaFy background"
            />
            <p>
              The next step is to <strong>upload and organize your team's digital work</strong>.
              Compiling it into one finalized and ready to be published manga or comic book.
            </p>
            <Imgix
              width={860}
              height={820}
              src={'https://mangafy.club/img/articleUpload.png'}
              alt="MangaFy upload"
            />
            <p>
              At any moment you can timely manage your team by adding tasks on the{' '}
              <strong>"Add a Task"</strong>
              button, or if you wish to expand your team via the{' '}
              <strong>"Find a Partner" button"</strong> on the right of the screen, during any stage
              of the production management tool.
            </p>
            <p>
              The <strong>comments section</strong>, the tabe right to the story board, team members
              can leave comments to one another.
            </p>
            <Imgix
              width={860}
              height={600}
              src={'https://mangafy.club/img/articleComment.png'}
              alt="MangaFy comment"
            />
            <p>
              In the <strong>team chat</strong> you can easily communicate with your fellow team
              members constantly, all is accessible to you in terms of talking with your time,
              adding tasks, getting key inputs, uploading panels, and more -{' '}
              <strong>to ensure YOUR COLLABORATION is a success.</strong>
            </p>
            <div className={styles.smallPhoto}>
              <Imgix
                width={520}
                height={720}
                src={'https://mangafy.club/img/articleMessage.png'}
                alt="MangaFy message"
              />
            </div>
            <p>
              Once done, the final stage is - <strong>PUBLISH</strong>, where you take your final
              work and upload it to any of the top self-publishing platforms to begin sharing your
              work with the world, gain followers and monetize.
            </p>
            <div className={styles.smallPhoto}>
              <Imgix
                width={660}
                height={500}
                src={'https://mangafy.club/img/articleShare.png'}
                alt="MangaFy share"
              />
            </div>
            <br />
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/production-management-tool"
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

ProductionManagementTool.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProductionManagementTool;
