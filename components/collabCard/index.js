import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Flash from 'components/icon/new/Flash';
import Cherry from 'components/icon/new/Cherry';
import Button from 'components/ui-new/Button';
import Clock from 'components/icon/new/Clock';

const CollabCard = ({ text, title, author, time }) => {
  return (
    <div className={styles.card}>
      <div className={cn(styles.card__content, styles.card__content_collab)}>
        <div className={styles.card__contentTitle}>{title}</div>
        {text ? <div className={styles.card__contentText}>{text}</div> : null}
      </div>
      <div className={styles.card__footer}>
        <div className={styles.card__author}>
          <img src="img/feedTemp/avatar.png" />
          <div>{author}</div>
        </div>
        <div className={styles.card__time}>
          {time + ' hours ago'}
          <Clock color="#C3BAFA" />
        </div>
      </div>
      <div className={styles.card__footer}>
        <Button sm={1} rounded={1} iconRight={1} icon={<Flash color="#fff" bold={1} />}>
          Apply
        </Button>
        <div className={styles.card__collab}>
          Collab <Cherry color="#C3BAFA" />
        </div>
      </div>
    </div>
  );
};

export default CollabCard;
