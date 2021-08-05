import React from 'react';

import { Gallery } from 'components/gallery';
import SocialLinks from 'components/socialLinks';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const TabStory = (props) => {
  const { user, profile, ifMyProfile, mangaStories, mangaStoriesMyProfile } = props;
  return (
    <div className={styles.content_tab_profile_2}>
      <Gallery
        title="Previous works"
        fromPath="users"
        {...{
          user,
          profile,
          mangaStories,
          ifMyProfile,
          mangaStoriesMyProfile,
        }}
      />
      <SocialLinks
        {...{
          user,
          profile,
        }}
      />
      <SocialLinks
        {...{
          user,
          profile,
        }}
      />
    </div>
  );
};

TabStory.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
  mangaStoriesMyProfile: PropTypes.array.isRequired,
  mangaStories: PropTypes.array.isRequired,
  ifMyProfile: PropTypes.bool.isRequired,
};

TabStory.defaultProps = {
  profile: null,
};

export default TabStory;
