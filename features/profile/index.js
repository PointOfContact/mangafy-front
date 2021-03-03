import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import ProfileContent from 'components/profile/profileContent';
import ProfileOpenCollabs from 'components/profile/profileOpenCollabs';
import ProfileTopBar from 'components/profile/profileTopBar';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterPolicy from 'components/footer-policy';
import styles from './styles.module.scss';

const Profile = (props) => {
  const { user, profile, mangaStories, total } = props;

  const { genres: genresEnums } = props;
  const profileGenres = genresEnums.data.filter(
    (item) => profile.genresIds && profile.genresIds.includes(item._id)
  );
  const genres = profileGenres.map((item) => item.name);
  return (
    <>
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
                }}
              />
            </div>
          </section>
            
          <section>
              <div className={cn("container", styles.container_profile)}>
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
  mangaStories: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  genres: PropTypes.object.isRequired,
};

export default Profile;
