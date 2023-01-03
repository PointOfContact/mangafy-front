import Avatar from 'components/Avatar';
import Check from 'components/icon/new/Check';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import moment from 'moment';
import { formatHtml } from 'helpers/shared';
import Link from 'next/link';
import client from 'api/client';

const FeedBanner = ({ className, project }) => {
  // const humanifiedDate = new Intl.RelativeTimeFormat('en', { style: 'narrow' }).format(-3, 'day');
  const humanifiedDate = moment(project?.authorInfo?.lastLoginDate).fromNow();
  const text =
    project?.story.length > 200
      ? project?.story.slice(0, 200).replace(/<[^>]*>?/gm, '') + '...'
      : project?.story.replace(/<[^>]*>?/gm, '');
  return (
    <div className={cn(styles.banner, className)}>
      <div className={styles.banner__leftContainer}>
        <div className={styles.banner__lTitle}>Top Graphic novels</div>
        <div className={styles.banner__lDescription}>
          Find new, handpicked graphic novels you’ll love, updated daily.
        </div>
        <div className={styles.banner__image}>
          <Imgix
            objectFit={'cover'}
            src={client.API_ENDPOINT + '/img/loginCover.jpg'}
            layout="fill"
          />
        </div>
        <Link href={'/project/' + project?._id}>
          <a className={styles.banner__project}>
            <div className={styles.banner__projectTitle}>{project?.title}</div>
            <div className={styles.banner__projectDescription}>{text}</div>
          </a>
        </Link>
        <Link href={'/profile/' + project?.author}>
          <a className={styles.banner__projectAuthor}>
            <Avatar
              className={styles.banner__projectAuthorAvatar}
              image={project?.authorInfo?.avatar}
              size={50}
              text={project?.authorInfo?.name[0]}
            />
            <div className={styles.banner__projectAuthorName}>{project?.authorInfo?.name}</div>
            <div className={styles.banner__projectAuthorLastSeen}>About {humanifiedDate}</div>
          </a>
        </Link>
      </div>
      <div className={styles.banner__rightContainer}>
        <div className={styles.banner__rTitle}>
          Unleash Your Creativity and Support Independent Manga Artists
        </div>
        <div className={styles.banner__rDescription}>
          Mangafy: The Ultimate Platform for Sharing Your Graphic Novels and Earning Revenue
        </div>
        <Link href="/sign-up?page=feed">
          <a>
            <Button rounded white shadow className={styles.banner__button}>
              Become a creator
            </Button>
          </a>
        </Link>
        <div className={styles.banner__rSubtitle}>Why creators choose MangaFY:</div>
        <ul className={styles.banner__advantages}>
          <li className={styles.banner__advantage}>
            <Check color={'#fff'} />
            <div className={styles.banner__advantageText}>
              Mangafy: Platform for Supporting Independent Graphic Novel Creators
            </div>
          </li>
          <li className={styles.banner__advantage}>
            <Check color={'#fff'} />
            <div className={styles.banner__advantageText}>
              Join the Mangafy Community and Grow Your Audience
            </div>
          </li>
          <li className={styles.banner__advantage}>
            <Check color={'#fff'} />
            <div className={styles.banner__advantageText}>
              Mangafy: The Go-To Platform for Earning Revenue as a Graphic Novel Creator
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeedBanner;
