import React from 'react';

import Imgix from 'components/imgix';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MangeStoryCard = ({ mangaStories, client }) =>
  mangaStories?.map((label, index) => (
    <Link key={index} href={`/manga-story/${label._id}`}>
      <a>
        <div className={styles.MangeStoryCard}>
          <div>
            <h3 className={styles.title}>{label.title}</h3>
            <div className={styles.description}>
              <p>{label.story}</p>
            </div>
            <Imgix
              width={304}
              height={172}
              layout="fixed"
              src={
                label.image
                  ? client.UPLOAD_URL + label.image
                  : 'https://mangafy.club/img/mangastory.webp'
              }
              alt="mangafy"
            />
          </div>
        </div>
      </a>
    </Link>
  ));

MangeStoryCard.propTypes = {
  mangaStories: PropTypes.array,
  client: PropTypes.object,
};

export default MangeStoryCard;
