import styles from './styles.module.scss';
import React from 'react';
import Avatar from 'components/Avatar';
import Link from 'next/link';
import cn from 'classnames';

const ShotAndMangaTitle = ({ className, title, link, author, isOwn, subscribe }) => {
  return (
    <div className={cn(className, styles.header__container)}>
      <div className={styles.header__image}>
        <Avatar image={author?.avatar} text={author?.name} size={80} />
      </div>

      <div className={styles.header__info}>
        <Link href={link}>
          <a className={styles.header__title}>{title}</a>
        </Link>

        <div className={styles.header__subtitle}>
          <Link href={'/profile/' + author?._id}>
            <a className={styles.header__author}>{author?.name}</a>
          </Link>
          {!isOwn && (
            <>
              <span>{' | '}</span>
              <button className={styles.header__subscribe} onClick={() => subscribe(author._id)}>
                {author.isFollowed ? 'Unfollow' : 'Follow'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShotAndMangaTitle;
