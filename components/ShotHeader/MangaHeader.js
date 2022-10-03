import client from 'api/client';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import cn from 'classnames';
import { notification } from 'antd';
import { buildShotURL } from 'helpers/shared';
import ShotAndMangaTitle from 'components/ShotAndMangaTitle';

const MangaHeader = ({ user, manga, className, authors, subscribe, isOwn, activeChapterIndex }) => {
  const prevChapterIndex = activeChapterIndex === 0 ? null : activeChapterIndex - 1;
  const nextChapterIndex =
    activeChapterIndex === manga.chapters.length ? null : activeChapterIndex + 1;

  return (
    <div className={className}>
      <div className={styles.header}>
        <ShotAndMangaTitle
          title={manga?.mangaStoryTitle}
          link={'/project/' + manga?.mangaStoryId}
          author={authors[0]}
          isOwn={isOwn}
          subscribe={subscribe}
        />

        <div className={styles.header__arrows}>
          <Link href={'/manga-view/' + manga.id + '?chapter=' + prevChapterIndex}>
            <a
              className={cn(
                styles.header__arrow,
                !prevChapterIndex && styles.header__arrow_disabled
              )}>
              <ArrowDown2 />
            </a>
          </Link>
          #{activeChapterIndex}
          <Link href={'/manga-view/' + manga.id + '?chapter=' + nextChapterIndex}>
            <a
              className={cn(
                styles.header__arrow,
                !nextChapterIndex && styles.header__arrow_disabled
              )}>
              <ArrowDown2 />
            </a>
          </Link>
        </div>

        {/* <Button rounded pink className={styles.header__tip}>
          Tip
        </Button> */}
      </div>

      <div className={styles.header__mobileArrowsAndTip}>
        <div className={cn(styles.header__arrows, styles.header__arrows_mobile)}>
          <Link href={'/manga-view/' + manga.id + '?chapter=' + prevChapterIndex}>
            <a
              className={cn(
                styles.header__arrow,
                !prevChapterIndex && styles.header__arrow_disabled
              )}>
              <ArrowDown2 />
            </a>
          </Link>
          #{activeChapterIndex}
          <Link href={'/manga-view/' + manga.id + '?chapter=' + nextChapterIndex}>
            <a
              className={cn(
                styles.header__arrow,
                !nextChapterIndex && styles.header__arrow_disabled
              )}>
              <ArrowDown2 />
            </a>
          </Link>
        </div>
        {/* <Button rounded pink sm className={cn(styles.header__tip, styles.header__tip_mobile)}>
          Tip
        </Button> */}
      </div>
    </div>
  );
};

export default MangaHeader;
