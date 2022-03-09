import React from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ChapterContent = ({ label }) => {
  const publishedChapter = label?.storyBoards?.data[0]?.chapters?.filter(
    (value) => value.published
  );

  return publishedChapter.length ? (
    <Link href={`/manga-view/${label?.storyBoards?.data[0]?._id}`}>
      <a
        target={'_blank'}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className={styles.colabWrap__publish}>
          Chapter:
          <span>{publishedChapter.length}</span>
        </div>
      </a>
    </Link>
  ) : (
    <div className={styles.colabWrap__publish}>
      Chapter:
      <span>Coming soon…</span>
    </div>
  );
};

ChapterContent.propTypes = {
  label: PropTypes.object,
};

ChapterContent.defaultProps = {
  label: {},
};

export default ChapterContent;
