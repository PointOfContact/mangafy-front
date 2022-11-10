import client from 'api/client';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Imgix from 'components/imgix';
import React, { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { Avatar } from 'antd';
import cn from 'classnames';
import Link from 'next/link';
import { buildShotURL } from 'helpers/shared';

const sliderItemWidth = 100;

const MangaSlider = ({ manga, activeChapterIndex }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const activeChapterRef = useRef(null);

  const shotsElements = manga?.chapters
    ?.filter((ch) => ch.published)
    .map((ch, i) => {
      return (
        <Link key={i} href={'/manga-view/' + manga?.id + '?ongoing=' + (i + 1)}>
          <a
            ref={i + 1 === activeChapterIndex ? activeChapterRef : null}
            className={cn(
              styles.slider__item,
              i + 1 === activeChapterIndex && styles.slider__item_active
            )}>
            {ch?.cover ? (
              <Imgix width={96} height={96} objectFit="cover" src={client.UPLOAD_URL + ch?.cover} />
            ) : (
              <Avatar size={96} style={{ background: '#7B65F3', color: '#fff' }}>
                {ch?.title?.length > 8 ? ch?.title?.slice(0, 8) + '...' : ch?.title}
              </Avatar>
            )}
            <div className={styles.slider__itemTitle}>Chapter {ch.order}</div>
          </a>
        </Link>
      );
    });

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
    shotsElements?.length * (sliderItemWidth + 10) < containerRef.current?.clientWidth;

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
            {shotsElements}
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
