import React, { useState } from 'react';

import { COMMUNITY_SPOTLIGHTS, HAPPENINGS } from 'helpers/constant';

import CommunitySpotlightsCard from './communitySpotlightsCard';
import HeppeningCard from './heppeningCard';
import styles from './styles.module.scss';

const DiscussionLeftBar = (props) => {
  const {} = props;
  const [heppenings, setHeppenings] = useState(HAPPENINGS);
  const [communitySpotlights, setCommunitySpotlights] = useState(COMMUNITY_SPOTLIGHTS);

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
                  key={heppening.id}
                  img={heppening.img}
                  title={heppening.title}
                  like={heppening.like}
                />
              ))}
            </ul>
            <div className={styles.tagsButtons}>
              <button className={styles.tagsPrev}>
                <span className={styles.tagsPrevArr}></span>
                Prev
              </button>
              <button className={styles.tagsNext}>
                Next
                <span className={styles.tagsPrevArr}></span>
              </button>
            </div>
          </div>

          <div className={styles.spotlight}>
            <div className={styles.spotlightTitle}>Community Spotlight </div>
            <ul className={styles.spotlightList}>
              {communitySpotlights.map((community) => (
                <CommunitySpotlightsCard
                  key={community.id}
                  img={community.img}
                  title={community.title}
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

DiscussionLeftBar.propTypes = {};

DiscussionLeftBar.defaultProps = {};

export default DiscussionLeftBar;
