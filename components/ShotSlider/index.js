import client from 'api/client';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Imgix from 'components/imgix';
import React, { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { Avatar } from 'antd';
import cn from 'classnames';
import Link from 'next/link';
import { buildShotURL } from 'helpers/shared';
import Lock from 'components/icon/new/Lock';
import ShotItems from './shotItems';

const sliderItemWidth = 100;

const ShotSlider = ({ className, shot, allShots, user }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const activeShotRef = useRef(null);

  function scrollToActiveShot() {
    if (activeShotRef.current && sliderRef.current) {
      const activeRect = activeShotRef.current.getBoundingClientRect();
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

  const hideArrows = allShots?.length * (sliderItemWidth + 10) < containerRef.current?.clientWidth;

  return (
    <div className={cn(className, styles.moreShots)}>
      <div className={styles.moreShots__container}>
        <div className={styles.moreShots__title}>More shots from {shot?.authorInfo?.name}</div>
        <div className={styles.slider} ref={containerRef}>
          <div
            className={cn(styles.slider__arrow, hideArrows && styles.slider__arrow_hidden)}
            onClick={scrollLeft}>
            <ArrowDown2 />
          </div>
          <div className={styles.slider__content} ref={sliderRef}>
            <ShotItems shot={shot} user={user} allShots={allShots} activeShotRef={activeShotRef} />
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

export default ShotSlider;
