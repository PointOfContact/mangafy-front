import React from 'react';

import client from 'api/client';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const HeppeningCard = (props) => {
  const { id, img, title } = props;

  return (
    <>
      <Link href={`/manga-story/${id}`}>
        <a className={styles.href}>
          <li className={styles.tagsListItem}>
            <div className={styles.tagsDescr}>
              <div
                className={styles.tagsImages}
                style={{
                  backgroundImage: `url(${img ? client.UPLOAD_URL + img : '/img/mangastory.jpg'})`,
                }}></div>
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

HeppeningCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
};

HeppeningCard.defaultProps = {
  img: null,
};

export default HeppeningCard;
