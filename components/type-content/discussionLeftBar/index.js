import React, { useEffect, useState } from 'react';

import LargeButton from 'components/ui-elements/large-button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import CommunitySpotlightsCard from './communitySpotlightsCard';
import HeppeningCard from './heppeningCard';
import styles from './styles.module.scss';

const DiscussionLeftBar = (props) => {
  const { members, collaborations } = props;
  const [heppenings, setHeppenings] = useState(collaborations);
  const [communitySpotlights, setCommunitySpotlights] = useState(members);

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
              <h4>Latest collaboration requests</h4>
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
              <Link href="/collaborations">
                <a>
                  <LargeButton text="All Collabs" className={styles.more} />
                </a>
              </Link>
            </div>
          </div>

          <div className={styles.spotlight}>
            <div className={styles.spotlightTitle}>Our members </div>
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
                <LargeButton text="All Members" className={styles.more} />
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
