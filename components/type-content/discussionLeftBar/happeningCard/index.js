import React from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const HappeningCard = (props) => {
  const { id, img, title } = props;

  return (
    <>
      <Link href={`/manga-story/${id}`}>
        <a className={styles.href}>
          <li className={styles.tagsListItem}>
            <div className={styles.tagsDescr}>
              <Imgix
                className={styles.tagsImages}
                layout="fixed"
                width={35}
                height={43}
                src={img ? client.UPLOAD_URL + img : 'https://mangafy.club/img/mangastory.webp'}
                alt="MangaFy club tags"
              />
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
