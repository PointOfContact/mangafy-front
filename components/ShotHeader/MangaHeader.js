import client from 'api/client';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import cn from 'classnames';
import { notification } from 'antd';
import { buildShotURL } from 'helpers/shared';
import ShotAndMangaTitle from 'components/ShotAndMangaTitle';
import Close from 'components/icon/new/Close';

const MangaHeader = ({ user, manga, className, authors, subscribe, isOwn, activeChapterIndex }) => {
  const prevChapterIndex = activeChapterIndex === 0 ? null : activeChapterIndex - 1;
  const nextChapterIndex =
    activeChapterIndex === manga?.chapters?.length ? null : activeChapterIndex + 1;
  const chapterCount = useMemo(() => {
    const publishedData = manga.chapters.filter((item) => {
      return item.published && item.deletedAt === '1969-12-31T23:59:59.999Z';
    });
    return publishedData.length;
  }, [manga.chapters]);

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

        {/* <div className={styles.header__arrows}>
          <Link href={'/project/view/' + manga.id + '?ongoing=' + prevChapterIndex}>
            <a
              className={cn(
                styles.header__arrow,
                !prevChapterIndex && styles.header__arrow_disabled
              )}>
              <ArrowDown2 />
            </a>
          </Link>
          #{chapterCount}
          <Link href={'/project/view/' + manga.id + '?ongoing=' + nextChapterIndex}>
            <a
              className={cn(
                styles.header__arrow,
                !nextChapterIndex && styles.header__arrow_disabled
              )}>
              <ArrowDown2 />
            </a>
          </Link>
        </div> */}

        {/* <Button rounded pink className={styles.header__tip}>
          Tip
        </Button> */}
        <div className={styles.header__close}>
          <Link href={'/feed'}>
            <a>
              <Close />
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.header__mobileArrowsAndTip}>
        <div className={cn(styles.header__arrows, styles.header__arrows_mobile)}>
          <Link href={'/project/view/' + manga.id + '?ongoing=' + prevChapterIndex}>
            <a
              className={cn(
                styles.header__arrow,
                !prevChapterIndex && styles.header__arrow_disabled
              )}>
              <ArrowDown2 />
            </a>
          </Link>
          #{activeChapterIndex}
          <Link href={'/project/view/' + manga.id + '?ongoing=' + nextChapterIndex}>
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
