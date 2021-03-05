import React from 'react';

import cn from 'classnames';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ProfileContent from 'components/profile/profileContent';
import ProfileOpenCollabs from 'components/profile/profileOpenCollabs';
import ProfileTopBar from 'components/profile/profileTopBar';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Head from 'next/head';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Profile = (props) => {
  const { user, profile, mangaStories, total, originUrl } = props;

  const { genres: genresEnums } = props;
  const profileGenres = genresEnums.data.filter(
    (item) => profile.genresIds && profile.genresIds.includes(item._id)
  );
  const genres = profileGenres.map((item) => item.name);
  return (
    <>
      <Head>
        <title>Say Hello to {profile.name}!</title>
        <meta name="description" content="Welcome to your professional Graphic Novel community" />
      </Head>
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
  total: PropTypes.number.isRequired,
  limit: PropTypes.number,
  genres: PropTypes.object.isRequired,
  originUrl: PropTypes.object,
};

Profile.defaultProps = {
  mangaStories: [],
  user: null,
  search: '',
  limit: 9,
  originUrl: '',
};

export default Profile;
