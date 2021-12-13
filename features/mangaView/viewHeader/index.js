import React from 'react';

import SvgRightArrow from 'components/icon/RightArrow';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import Pagination from 'components/ui-elements/pagination';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ViewHeader = ({
  user,
  chapters,
  storyBoardId,
  mangaStoryTitle,
  currentChapter,
  setCurrentChapter,
  shareUrl,
  shareOnClick,
}) => (
  <div className={styles.headerContainer}>
    <div className={styles.leftContainer}>
      <Link href={user ? '/feed' : '/'}>
        <a>
          <Imgix
            priority
            layout="intrinsic"
            width={185}
            height={30}
            quality={50}
            src="https://mangafy.club/img/logo-new.webp"
            alt="MangaFy logo"
          />
        </a>
      </Link>
      <p className={styles.mangaTitle}>{mangaStoryTitle}</p>
      <SvgRightArrow width="14" height="14" />
      <p className={styles.chapterCount}>{`CH ${currentChapter}`} |</p>
      <p className={styles.chapterTitle}> {chapters[currentChapter - 1]?.title}</p>
    </div>
    <div className={styles.paginationContainer}>
      <Pagination
        currentNumber={currentChapter}
        setCurrentNumber={setCurrentChapter}
        data={chapters}
        user={user}
      />
    </div>
    <ShareButtons className={styles.shareButtons} shareUrl={shareUrl} onClick={shareOnClick} />
  </div>
);

ViewHeader.propTypes = {
  user: PropTypes.object,
  chapters: PropTypes.array.isRequired,
  storyBoardId: PropTypes.string.isRequired,
  mangaStoryTitle: PropTypes.string.isRequired,
  currentChapter: PropTypes.number.isRequired,
  setCurrentChapter: PropTypes.func.isRequired,
  shareUrl: PropTypes.string,
  shareOnClick: PropTypes.func,
};

ViewHeader.defaultProps = {
  user: {},
  shareUrl: '',
  shareOnClick: () => {},
};

export default ViewHeader;
