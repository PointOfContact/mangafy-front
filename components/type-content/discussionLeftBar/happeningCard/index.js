import React from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const HappeningCard = (props) => {
  const { id, img, title } = props;
  const titleChars = title?.slice(0, 2);

  return (
    <>
      <Link href={`/project/production/${id}?tab=details`}>
        <a className={styles.href}>
          <li className={styles.tagsListItem}>
            <div className={styles.tagsDescr}>
              {img ? (
                <Imgix
                  className={styles.tagsImages}
                  layout="fixed"
                  width={35}
                  height={43}
                  src={client.UPLOAD_URL + img}
                  alt="MangaFy club tags"
                />
              ) : (
                <div className={styles.defStyle}>{titleChars}</div>
              )}
              <div className={styles.tagsDescrText}>{title}</div>
            </div>
            <div className={styles.tagsCount}>
              Join <span style={{ marginLeft: '8px' }}>❯</span>
            </div>
          </li>
        </a>
      </Link>
    </>
  );
};

HappeningCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
};

HappeningCard.defaultProps = {
  img: null,
};

export default HappeningCard;
