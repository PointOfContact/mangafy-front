import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CommunitySpotlightsCard = (props) => {
  const { img, title, like } = props;

  return (
    <>
      <li className={styles.spotlightListItem}>
        <div className={styles.spotlightLeft}>
          <div
            className={styles.spotlightLeftImages}
            style={{ backgroundImage: `url(${img})` }}></div>
          <div className={styles.spotlightLeftDescr}>
            <div className={styles.spotlightLeftDescrName}>{title}</div>
            <div className={styles.spotlightLeftDescrRecords}>{like}</div>
          </div>
        </div>
        <div className={styles.spotlightFollow}>Follow</div>
      </li>
    </>
  );
};

CommunitySpotlightsCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  like: PropTypes.string.isRequired,
};

CommunitySpotlightsCard.defaultProps = {};

export default CommunitySpotlightsCard;
