import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Imgix from 'components/imgix';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const About = (props) => {
  const { user } = props;

  return (
    <div className="">
      <NextSeo
        title="MangaFY About Policy"
        description="MangaFY About Policy"
        openGraph={{
          url: 'http://mangafy.club',
          title: 'MangaFY About Policy',
          description: 'MangaFY About Policy',
          type: 'article',
          images: [
            {
              url: 'http://mangafy.club/img/indexMobSec3.webp',
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
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />
      <main className="main_back_2">
        <Header path="myProfile" user={user} />
        <div className={styles.about_page}>
          <div className={styles.title_section}>
            <div className={styles.title_inner}>
              <div className={styles.page_title}>About MangaFY</div>
              <div className={styles.page_description}>
                Hi There! If you’re reading this, you’re probably like me – spending most of your
                time writing at your desk, in-front of a computer or a notebook, hoping to one day
                see your vision turning into a graphic novel (comic or even a manga!).
              </div>
            </div>
            <div className={styles.image_block}>
              <Imgix
                width={301}
                height={390}
                layout="fixed"
                src="https://mangafy.club/img/about_image.webp"
                alt="MangaFy about image"
              />
            </div>
          </div>
          <div className={styles.info_section}>
            <div className={styles.update_block}>Update May 12, 2021</div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>A story of tools and the future of work</div>
              <div className={styles.info_description}>
                And, if you ever thought about self-publishing your work, you have multiple windows
                opened all over the place – browser for Google docs, Power Point, Word, Excel, and
                on, and on… <br></br>
                <br></br>We want to make the dreamers dream come true, and help aspiring authors and
                freelancers’ journey to self-publication as simple as it can be. After all, this is
                the digital age, where the internet grants us countless opportunities.<br></br>
                <br></br>We take steps designed to ensure that only those employees who need access
                to your personal information to fulfil their employment duties will have access to
                it. We may use and disclose your personal or account information for the following
                purposes:<br></br>
                <br></br>Meet MangaFY, a digital platform for the artists, viewing each (aspiring or
                freelancer) as a potential business, inspiring you to connect with fellow community
                members, open a project and collaborate, all while utilising our in-platform
                management tools to take your idea from story to a fully digital product, ready to
                be monetised and published. Come and make the next big IP, our platform is for you.
                <br></br>
                <br></br>Our team has vast experience in the online scene, and we are all avid fans
                of all comic, manga and anime…and our vision is clear – to grant a platform that
                simplifies the self-publishing process by encouraging collaboration between artists,
                remove the skill gap, and deliver in-platform production tools that will ease the
                production process. Thus, nurturing the artist community, making new authors, and
                generating new, original content.
              </div>
              <div className={styles.info_description}>
                MangaFY is currently at the beta and experimental stage. The user acknowledges there
                might be upgrades or added features to the website, as well as maintenance. The user
                owns all content and is able to remove or add his work or projects. MangaFY has no
                claim on the user's work.
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>About us</div>
              <div className={styles.info_description}>
                MangaFY was established by online marketing professionals with over a decade of
                experience in the online scene. With great passion and love for all things Manga,
                Comics, and yes, even Anime, our desire is to establish a digital platform for the
                artists, viewing each (aspiring or freelancer) as a potential business, inspiring
                you to connect with fellow community members, open a project and collaborate, all
                while utilising our in-platform management tools to take your idea from story to a
                fully digital product, ready to be monetised and published. Come and make the next
                big IP, our platform is for you.
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>Contact Us</div>
              <div className={styles.info_description}>
                If you have any questions or comments about this Privacy Policy or your personal
                information, to make an access or correction request, to exercise any applicable
                rights, to make a complaint, or to obtain information about our policies and
                practices with respect to any service providers outside Israel, our Privacy Officer
                (or Data Protection Officer) can be reached by mail or email using the following
                contact information: by email at info@mangafy.club
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {/* <FooterLogin user={user} /> */}
      </main>
    </div>
  );
};

About.propTypes = {
  user: PropTypes.object,
};

About.defaultProps = {
  user: {},
};

export default About;
