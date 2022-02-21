import React from 'react';

import SvgHeart from 'components/icon/Heart';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ChapterRatings = ({ chapter, like, likeChapter, countLike }) => (
  <div className={styles.footerRatings}>
    <div className={styles.chapterRating}>
      <SvgHeart className={like && styles.likeItem} onClick={likeChapter} width={20} height={20} />
      {!!countLike ? `${countLike}` : ''}
    </div>
    <div className={styles.chapterRating}>
      <p className={styles.viewCount}>
        <span>Views</span> {!!chapter?.view ? chapter?.view : ''}
      </p>
    </div>
  </div>
);

ChapterRatings.propTypes = {
  chapter: PropTypes.object.isRequired,
  like: PropTypes.bool.isRequired,
  likeChapter: PropTypes.func.isRequired,
  countLike: PropTypes.number.isRequired,
};

export default ChapterRatings;
