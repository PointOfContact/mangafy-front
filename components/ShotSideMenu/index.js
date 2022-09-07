import Avatar from 'components/Avatar';
import Comment from 'components/icon/new/Comment';
import Fire from 'components/icon/new/Fire';
import Send from 'components/icon/new/Send';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';

const ShotSideMenu = ({ shot, toggleComments }) => {
  return (
    <div className={styles.menu}>
      <Avatar
        size={60}
        image={shot.authorInfo.avatar}
        text={shot.authorInfo.name[0]}
        className={styles.menu__avatar}
      />
      <div className={styles.menu__buttons}>
        <Button
          onClick={toggleComments}
          rounded
          outline
          iconRight
          icon={<Comment color="#7B65F3" />}>
          99
        </Button>
        <Button rounded outline iconRight icon={<Fire color="#7B65F3" />}>
          99
        </Button>
        <Button rounded outline iconRight icon={<Send color="#7B65F3" />} />
      </div>
    </div>
  );
};

export default ShotSideMenu;
