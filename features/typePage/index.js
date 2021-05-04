import React from 'react';

import AnimePlatform from 'components/anime-platform';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import TypePage from 'components/type-content';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export default function LandingNew(props) {
  const {
    user,
    posts,
    dailyWarmUps,
    members,
    collaborations,
    selectedCategories,
    selectedType,
  } = props;
  return (
    <>
      <NextSeo
        title="MangaFY – From story buidling to a full digital release."
        description="The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release."
        canonical=""
        openGraph={{
          url: 'https://www.mangafy.club',
          title: 'Start your Graphic Novel Journey and Get Creative with MangaFY',
          description:
            'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.',
          images: [
            {
              url: 'https://i.postimg.cc/cCy8qTg7/manga.jpg',
              width: 800,
              height: 600,
              alt: 'manga',
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
          <main className={styles.main}>
            {!user && <AnimePlatform />}
            <TypePage
              user={user}
              posts={posts}
              dailyWarmUps={dailyWarmUps}
              members={members}
              collaborations={collaborations}
              selectedCategories={selectedCategories}
              selectedType={selectedType}
            />
          </main>
        </div>
        <Footer />
        <FooterPolicy />
      </div>
    </>
  );
}

LandingNew.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  dailyWarmUps: PropTypes.array,
  members: PropTypes.array,
  collaborations: PropTypes.array,
};

LandingNew.defaultProps = {
  user: null,
  posts: [],
  dailyWarmUps: [],
  members: [],
  collaborations: [],
};
