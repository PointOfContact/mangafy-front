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

const ShotSlider = ({ className, shot, allShots }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const activeShotRef = useRef(null);

  const shotsElements = allShots?.map((sh) => {
    return (
      <Link key={sh._id} href={sh.isOld ? buildShotURL(sh._id, sh.authorId) : '/shot/' + sh._id}>
        <a
          ref={sh._id === shot._id ? activeShotRef : null}
          className={cn(styles.slider__item, sh._id === shot._id && styles.slider__item_active)}
          key={sh._id}>
          {sh?.image ? (
            <Imgix width={96} height={96} objectFit="cover" src={client.UPLOAD_URL + sh?.image} />
          ) : (
            <Avatar size={96} style={{ background: '#7B65F3', color: '#fff' }}>
              {sh?.title?.length > 8 ? sh?.title?.slice(0, 8) + '...' : sh?.title}
            </Avatar>
          )}
          {/* {sh?.title && <div className={styles.slider__itemTitle}>{sh?.title}</div>} */}
        </a>
      </Link>
    );
  });

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

export default ShotSlider;
