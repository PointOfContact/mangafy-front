import React from 'react';

import { Gallery } from 'components/gallery';
import SocialLinks from 'components/socialLinks';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const TabStory = (props) => {
  const { user, profile, mangaStories } = props;
  return (
    <div className={styles.content_tab_profile_2}>
      <Gallery
        title="Previous works"
        fromPath="users"
        {...{
          user,
          profile,
          mangaStories,
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
  mangaStories: PropTypes.array.isRequired,
};

TabStory.defaultProps = {
  profile: null,
};

export default TabStory;
