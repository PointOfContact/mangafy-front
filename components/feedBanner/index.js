import Avatar from 'components/Avatar';
import Check from 'components/icon/new/Check';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const FeedBanner = ({ className }) => {
  return (
    <div className={cn(styles.banner, className)}>
      <div className={styles.banner__leftContainer}>
        <div className={styles.banner__lTitle}>Top Graphic novels</div>
        <div className={styles.banner__lDescription}>
          Find new, handpicked graphic novels you’ll love, updated daily.
        </div>
        <div className={styles.banner__image}>
          <Imgix objectFit={'cover'} src="img/feedTemp/cover.png" layout="fill" />
        </div>
        <div className={styles.banner__projectTitle}>
          Title asd fasdfasdf sfa sdf asdfasd fasdfas fsdfasdf asdfasdfasdfads f
        </div>
        <div className={styles.banner__projectDescription}>
          Description Description Description Description Description Description Description
          Description Description Description
          Descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
        </div>
        <div className={styles.banner__projectAuthor}>
          <Avatar className={styles.banner__projectAuthorAvatar} size={50} text={'U'} />
          <div className={styles.banner__projectAuthorName}>
            Authorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
          </div>
          <div className={styles.banner__projectAuthorLastSeen}>About 30 minutes ago</div>
        </div>
      </div>
      <div className={styles.banner__rightContainer}>
        <div className={styles.banner__rTitle}>
          Unleash Your Creativity and Support Independent Manga Artists
        </div>
        <div className={styles.banner__rDescription}>
          Mangafy: The Ultimate Platform for Sharing Your Graphic Novels and Earning Revenue
        </div>
        <Button rounded white shadow className={styles.banner__button}>
          Become a creator
        </Button>
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
