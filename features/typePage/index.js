import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import TypePage from 'components/type-content';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function LandingNew({
  user,
  posts,
  dailyWarmUps,
  members,
  collaborations,
  selectedCategories,
  selectedType,
}) {
  return (
    <>
      <Head>
        <title>MangaFY – From story buidling to a full digital release.</title>
        <meta
          name="description"
          content="The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release."
        />
        <meta property="og:url" content="https://www.mangafy.club" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Start your Graphic Novel Journey and Get Creative with MangaFY"
        />
        <meta
          property="og:description"
          content="The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release."
        />
        <meta property="og:image" content="https://i.postimg.cc/cCy8qTg7/manga.jpg" />
      </Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header user={user} />
          <main>
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
