import React, { useEffect, useState } from 'react';

import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import CommunitySpotlightsCard from './communitySpotlightsCard';
import HappeningCard from './happeningCard';
import styles from './styles.module.scss';

const DiscussionLeftBar = (props) => {
  const { members, collaborations } = props;
  const [happenings, setHappenings] = useState(collaborations);
  const [communitySpotlights, setCommunitySpotlights] = useState(members);

  useEffect(() => {
    setHappenings(collaborations);
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
              <h4>Latest collaboration requests</h4>
            </div>
            <ul className={styles.tagsList}>
              {happenings.map((happening) => (
                <HappeningCard
                  key={happening._id}
                  id={happening._id}
                  img={happening.image}
                  title={happening.title}
                  like={happening.like}
                />
              ))}
            </ul>
            <div className={styles.tagsButtons}>
              <Link href="/collaborations">
                <a>
                  <PrimaryButton text="All Collabs" className={styles.more} />
                </a>
              </Link>
            </div>
          </div>

          <div className={styles.spotlight}>
            <div className={styles.spotlightTitle}>Explore creators</div>
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
            <Link href="/profiles">
              <a>
                <PrimaryButton text="All Members" className={styles.more} />
              </a>
            </Link>
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
