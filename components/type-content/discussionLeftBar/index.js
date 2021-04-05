import React, { useEffect, useState } from 'react';

import { COMMUNITY_SPOTLIGHTS, HAPPENINGS } from 'helpers/constant';
import PropTypes from 'prop-types';

import CommunitySpotlightsCard from './communitySpotlightsCard';
import HeppeningCard from './heppeningCard';
import styles from './styles.module.scss';

const DiscussionLeftBar = (props) => {
  const { members, collaborations } = props;
  const [heppenings, setHeppenings] = useState(HAPPENINGS);
  const [communitySpotlights, setCommunitySpotlights] = useState(COMMUNITY_SPOTLIGHTS);

  useEffect(() => {
    setHeppenings(collaborations);
  }, [collaborations]);

  useEffect(() => {
    setCommunitySpotlights(members);
  }, [members]);

  return (
    <>
      <div>
        <div className={styles.type_main__rightCol}>
          <div className={styles.tags}>
            <div className={styles.tagsTop}>
              <h4>What&apos;s Happening </h4>
            </div>
            <ul className={styles.tagsList}>
              {heppenings.map((heppening) => (
                <HeppeningCard
                  key={heppening._id}
                  id={heppening._id}
                  img={heppening.image}
                  title={heppening.title}
                  like={heppening.like}
                />
              ))}
            </ul>
            <div className={styles.tagsButtons}>
              <button className={styles.tagsPrev}>
                <span className={styles.prevArr}>❮</span>
                Prev
              </button>
              <button className={styles.tagsNext}>
                Next
                <span className={styles.prevArr}>❯</span>
              </button>
            </div>
          </div>

          <div className={styles.spotlight}>
            <div className={styles.spotlightTitle}>Community Spotlight </div>
            <ul className={styles.spotlightList}>
              {communitySpotlights.map((community) => (
                <CommunitySpotlightsCard
                  key={community._id}
                  id={community._id}
                  img={community.avatar}
                  title={community.name}
                  like={community.like}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

DiscussionLeftBar.propTypes = {
  members: PropTypes.array,
  collaborations: PropTypes.array,
};

DiscussionLeftBar.defaultProps = {
  members: [],
  collaborations: [],
};

export default DiscussionLeftBar;
