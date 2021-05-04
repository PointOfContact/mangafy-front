import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Imgix from 'components/imgix';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Terms = ({ user }) => (
  <>
    <NextSeo
      title="MangaFY Terms of Service"
      description="MangaFY Terms of Service"
      canonical=""
      openGraph={{
        url: 'http://mangafy.club/terms',
        title: 'MangaFY Terms of Service',
        description: 'MangaFY Terms of Service',
        type: 'article',
        images: [
          {
            url: 'http://mangafy.club/img/indexMobSec3.webp',
            width: 800,
            height: 600,
            alt: '',
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
        <Header path="terms" user={user} />
        <main>
          <div className={styles.terms_page}>
            <div className={styles.title_section}>
              <div className={styles.title_inner}>
                <div className={styles.page_title}>Terms MangaFY</div>
                <div className={styles.page_description}>
                  Hi There! If you’re reading this, you’re probably like me – spending most of your
                  time writing at your desk, in-front of a computer or a notebook, hoping to one day
                  see your vision turning into a graphic novel (comic or even a manga!).
                </div>
              </div>
              <div className={styles.image_block}>
                <Imgix
                  width={240}
                  height={310}
                  layout="fixed"
                  src="https://mangafy.club/img/about_image.webp"
                  alt=""
                />
              </div>
            </div>
            <div className={styles.info_section}>
              <div className={styles.update_block}>Updated March 04, 2021</div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>TERMS OF SERVICE</div>
                <div className={styles.info_description}>
                  And, if you ever thought about self-publishing your work, you have multiple
                  windows opened all over the place – browser for Google docs, Power Point, Word,
                  Excel, and on, and on… <br></br>
                  <br></br>1.1 https://mangafy.club/, hereinafter referred to as "the Seller",
                  publishes the Public Offer on realization of Services placed on the Seller's
                  official website https://mangafy.club/.
                  <br></br>
                  <br></br>We take steps designed to ensure that only those employees who need
                  access to your personal information to fulfil their employment duties will have
                  access to it. We may use and disclose your personal or account information for the
                  following purposes:
                  <br></br>
                  <br></br>Meet MangaFY, a digital platform for the artists, viewing each (aspiring
                  or freelancer) as a potential business, inspiring you to connect with fellow
                  community members, open a project and collaborate, all while utilising our
                  in-platform management tools to take your idea from story to a fully digital
                  product, ready to be monetised and published. Come and make the next big IP, our
                  platform is for you.
                  <br></br>
                  <br></br>Our team has vast experience in the online scene, and we are all avid
                  fans of all comic, manga and anime…and our vision is clear – to grant a platform
                  that simplifies the self-publishing process by encouraging collaboration between
                  artists, remove the skill gap, and deliver in-platform production tools that will
                  ease the production process. Thus, nurturing the artist community, making new
                  authors, and generating new, original content.
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>Terms us</div>
                <div className={styles.info_description}>
                  Rights and obligations of User and Supplier, arising from this offer, may not be
                  transferred to third parties without written consent of the other party. I, User,
                  have read and agree with this agreement of use of "Recurring payments" service,
                  with automatic writing off of funds from bank card for Supplier's services under
                  the Agreement.
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>Contact Information</div>
                <div className={styles.info_description}>Fikus 28/9, Tel Aviv Israel</div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  </>
);

Terms.propTypes = {
  user: PropTypes.object,
};

Terms.defaultProps = {
  user: null,
};

export default Terms;
