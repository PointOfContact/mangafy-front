import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import ProfileContent from 'components/profile/profileContent';
import ProfileOpenCollabs from 'components/profile/profileOpenCollabs';
import ProfileTopBar from 'components/profile/profileTopBar';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const { user, profile, mangaStories, total } = props;

  const { genres: genresEnums } = props;
  const profileGenres = genresEnums.data.filter(
    (item) => profile.genresIds && profile.genresIds.includes(item._id)
  );
  const genres = profileGenres.map((item) => item.name);
  return (
    <main className="main_back_2">
      <Header path="profile" user={user} />
      <ProfileTopBar
        {...{
          user,
          profile,
        }}
      />
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
      <ProfileOpenCollabs
        {...{
          total,
          mangaStories,
          profile,
        }}
      />
      <section>
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12">
                <div className="show_all">
                  <button >Show all</button>
                </div>
              </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
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
