import React from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MangeStoryCard = ({ mangaStories, client }) =>
  mangaStories.map((label, index) => (
    <Link key={index} href={`/manga-story/${label._id}`}>
      <div className={styles.MangeStoryCard}>
        <div>
          <h3 className={styles.title}>{label.title}</h3>
          <div className={styles.description}>
            <p>{label.introduce}</p>
          </div>
          <img
            alt="mangafy"
            src={label.image ? client.UPLOAD_URL + label.image : '/img/mangastory.jpg'}
          />
        </div>
      </div>
    </Link>
  ));

MangeStoryCard.propTypes = {
  mangaStories: PropTypes.array,
  client: PropTypes.object,
};

export default MangeStoryCard;
