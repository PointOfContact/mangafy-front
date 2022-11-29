import client from 'api/client';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Imgix from 'components/imgix';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { Avatar } from 'antd';
import cn from 'classnames';
import Link from 'next/link';
import { buildShotURL } from 'helpers/shared';
import Lock from 'components/icon/new/Lock';
import ChapterItems from './chapterItems';

const sliderItemWidth = 100;

const MangaSlider = ({ manga, activeChapterIndex, user }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const activeChapterRef = useRef(null);
  const [publishedChapters, setPublishedChapters] = useState([]);

  useEffect(() => {
    const publishedChaptersArray = manga?.chapters?.filter((ch) => ch.published);
    setPublishedChapters(publishedChaptersArray);
  }, [manga.chapters]);

  function scrollToActiveShot() {
    if (activeChapterRef.current && sliderRef.current) {
      const activeRect = activeChapterRef.current.getBoundingClientRect();
      const sliderRect = sliderRef.current.getBoundingClientRect();
      sliderRef.current.scrollTo({
        left:
          sliderRef.current.scrollLeft +
          (activeRect.x - sliderRect.x) -
          sliderRect.width / 2 +
          (sliderItemWidth + 10) / 2,
        behavior: 'smooth',
      });
    }
  }

  function scrollRight() {
    sliderRef.current.scrollTo({
      left: sliderRef.current.scrollLeft + (sliderItemWidth + 10) * 2,
      behavior: 'smooth',
    });
  }

  function scrollLeft() {
    sliderRef.current.scrollTo({
      left: sliderRef.current.scrollLeft - (sliderItemWidth + 10) * 2,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scrollToActiveShot();
  });

  const hideArrows =
    publishedChapters?.length * (sliderItemWidth + 10) < containerRef.current?.clientWidth;

  return (
    <div className={styles.moreShots}>
      <div className={styles.moreShots__container}>
        <div className={styles.moreShots__title}>All chapters:</div>
        <div className={styles.slider} ref={containerRef}>
          <div
            className={cn(styles.slider__arrow, hideArrows && styles.slider__arrow_hidden)}
            onClick={scrollLeft}>
            <ArrowDown2 />
          </div>
          <div className={styles.slider__content} ref={sliderRef}>
            <ChapterItems
              manga={manga}
              activeChapterIndex={activeChapterIndex}
              user={user}
              activeChapterRef={activeChapterRef}
              publishedChapters={publishedChapters}
            />
          </div>
          <div
            className={cn(styles.slider__arrow, hideArrows && styles.slider__arrow_hidden)}
            onClick={scrollRight}>
            <ArrowDown2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaSlider;
