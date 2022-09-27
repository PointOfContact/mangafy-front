import client from 'api/client';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import cn from 'classnames';
import Avatar from 'components/Avatar';
import { notification } from 'antd';
import { buildShotURL } from 'helpers/shared';

const MangaHeader = ({ user, manga, className, authors, subscribe, isOwn, activeChapterIndex }) => {
  const prevChapterIndex = activeChapterIndex === 0 ? null : activeChapterIndex - 1;
  const nextChapterIndex =
    activeChapterIndex === manga.chapters.length ? null : activeChapterIndex + 1;

  return (
    <div className={className}>
      <div className={styles.header}>
        <div className={styles.header__shot}>
          <div className={styles.header__image}>
            <Avatar image={authors[0]?.avatar} text={authors[0]?.name} size={80} />
          </div>

          <div className={styles.header__info}>
            <div className={styles.header__title}>{manga?.mangaStoryTitle}</div>

            <div className={styles.header__subtitle}>
              <Link href={'/profile/' + authors[0]?._id}>
                <a className={styles.header__author}>{authors[0]?.name}</a>
              </Link>
              {/* {authors.length === 1 && (
                <> */}
              {!isOwn && (
                <>
                  <span>{' | '}</span>
                  <button
                    className={styles.header__subscribe}
                    onClick={() => subscribe(authors[0]._id)}>
                    {authors[0].isFollowed ? 'Unfollow' : 'Follow'}
                  </button>
                </>
              )}
              {/* </>
              )} */}
            </div>
          </div>
        </div>

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
