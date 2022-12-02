import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

import Link from 'next/link';
import Avatar from 'components/Avatar';
import Fire from 'components/icon/new/Fire';
import Comment from 'components/icon/new/Comment';
import Button from 'components/ui-new/Button';
import Lock from 'components/icon/new/Lock';

const Chapter = ({ project, subscribedChapter, chapter, isLiked, subscribedProject }) => {
  const ifSubscribedProject = !subscribedProject && project.planId;

  if (ifSubscribedProject) {
    if (subscribedChapter) {
      return (
        <div className={styles.blur}>
          <div className={styles.blur__container}>
            <Lock className={styles.blur__lock} />
            <div className={styles.blur__text}>To unlock this chapter, become a subscriber</div>
          </div>
          <div key={chapter._id} className={styles.chapters__chapter}>
            <div className={styles.chapters__cover}>
              <Avatar
                size={70}
                image={chapter.chapterImg}
                text={chapter.title[0]}
                borderRadius={10}
              />
            </div>
            <div className={styles.chapters__title}>{chapter.title}</div>
            <div className={styles.chapters__subtitle}>Chapter {chapter.order}</div>
            <div className={styles.chapters__info}></div>
          </div>
        </div>
      );
    }
  }

  return (
    <Link
      key={chapter._id}
      href={
        client.API_ENDPOINT +
        '/project/view/' +
        project.storyBoards.data[0]._id +
        '?chapter=' +
        chapter.order
      }>
      <a
        key={chapter._id}
        className={cn(
          styles.chapters__chapter,
          !chapter.published && styles.chapters__chapter_disabled
        )}>
        <div className={styles.chapters__cover}>
          <Avatar size={70} image={chapter.chapterImg} text={chapter.title[0]} borderRadius={10} />
        </div>
        <div className={styles.chapters__title}>{chapter.title}</div>
        <div className={styles.chapters__subtitle}>Chapter {chapter.order}</div>
        <div className={styles.chapters__info}>
          <div
            className={styles.chapters__comments}
            onClick={(e) => {
              e.preventDefault();
              onCommentClick(chapter._id);
            }}>
            {chapter.comment?.length} <Comment color="#C3BAFA" />
          </div>
          {chapter.likedUsers && (
            <div
              className={cn(
                styles.chapters__likes,
                isLiked(chapter) && styles.chapters__likes_liked
              )}
              onClick={(e) => {
                e.preventDefault();
                onLike(chapter);
              }}>
              {chapter.likedUsers.length} <Fire color="#C3BAFA" />
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default Chapter;
