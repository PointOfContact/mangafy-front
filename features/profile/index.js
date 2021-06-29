import React from 'react';

import cn from 'classnames';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ProfileContent from 'components/profile/profileContent';
import ProfileOpenCollabs from 'components/profile/profileOpenCollabs';
import ProfileTopBar from 'components/profile/profileTopBar';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Profile = (props) => {
  const { user, profile, originUrl } = props;
  const mangaStories = profile.mangaStories.data;
  const total = profile.mangaStories.data.length;
  const { genres: genresEnums } = props;
  const profileGenres = genresEnums.data.filter(
    (item) => profile.genresIds && profile.genresIds.includes(item._id)
  );
  const genres = profileGenres.map((item) => item.name);
  const gallerys = profile.gallery
    .filter((item) => !(item?.slice(-3) === 'pdf' || item?.slice(-3) === 'PDF'))
    .map((gallery) => ({
      url: `https://mangafy.club/api/v2/uploads/${gallery}`,
      width: 800,
      height: 600,
      alt: 'gallery',
    }));
  const userImg = {
    url: `https://mangafy.club/api/v2/uploads/${profile.avatar}`,
    width: 800,
    height: 600,
    alt: 'User avatar',
  };

  const images = [userImg, ...gallerys];
  return (
    <>
      <NextSeo
        title={`Let's give a big hello to ${profile.name}!`}
        description="Check their work or cool projects at MangaFY. Welcome aboard."
        canonical={`https://mangafy.club/profile/${profile._id}`}
        openGraph={{
          url: `https://mangafy.club/profile/${profile._id}`,
          title: `Let's give a big hello to ${profile.name}!`,
          description: 'Check their work or cool projects at MangaFY. Welcome aboard.',
          images,
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
          <Header path="profile" user={user} />
          <main>
            <section>
              <div className="container">
                <ProfileTopBar
                  {...{
                    user,
                    profile,
                    originUrl,
                  }}
                />
              </div>
            </section>

            <section>
              <div className={cn('container', styles.container_profile)}>
                <ProfileContent
                  {...{
                    user,
                    mangaStories,
                    profile,
                    total,
                    profileGenres,
                    genres,
                  }}
                />
              </div>
            </section>

            <section>
              <div className="container">
                <ProfileOpenCollabs
                  {...{
                    total,
                    mangaStories,
                    profile,
                  }}
                />
              </div>
            </section>
          </main>
        </div>
        <Footer />
        <FooterPolicy />
      </div>
    </>
  );
};

Profile.propTypes = {
  mangaStories: PropTypes.array,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
  total: PropTypes.number,
  limit: PropTypes.number,
  genres: PropTypes.object.isRequired,
  originUrl: PropTypes.string,
};

Profile.defaultProps = {
  mangaStories: [],
  user: null,
  search: '',
  limit: 9,
  originUrl: '',
  total: null,
};

export default Profile;
