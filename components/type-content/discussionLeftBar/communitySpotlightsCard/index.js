import React from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CommunitySpotlightsCard = (props) => {
  const { id, img, title, like } = props;

  return (
    <>
      <Link href={`/profile/${id}`}>
        <a>
          <li className={styles.spotlightListItem}>
            <div className={styles.spotlightLeft}>
              {/* <div
                className={styles.spotlightLeftImages}
                style={{
                  backgroundImage: `url(${img ? client.UPLOAD_URL + img : '/img/manga story.jpg'})`,
                }}></div> */}
              <div className={styles.spotlightLeftImages}>
                {img ? (
                  <Imgix
                    className="avatar"
                    width={104}
                    height={104}
                    src={client.UPLOAD_URL + img}
                  />
                ) : (
                  <Avatar text={title} size={40} />
                )}
              </div>
              <div className={styles.spotlightLeftDescr}>
                <div className={styles.spotlightLeftDescrName}>{title}</div>
                <div className={styles.spotlightLeftDescrRecords}>{like}</div>
              </div>
            </div>
            <div className={styles.spotlightFollow}>
              Follow <span style={{ marginLeft: '8px' }}>❯</span>
            </div>
          </li>
        </a>
      </Link>
    </>
  );
};

CommunitySpotlightsCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  like: PropTypes.string.isRequired,
};

CommunitySpotlightsCard.defaultProps = {};

export default CommunitySpotlightsCard;
