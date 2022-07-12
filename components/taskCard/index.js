import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Flash from 'components/icon/new/Flash';
import Cherry from 'components/icon/new/Cherry';
import Heart from 'components/icon/new/Heart';
import Clock from 'components/icon/new/Clock';
import Button from 'components/ui-new/Button';
import client from 'api/client';

const index = ({ card }) => {
  let text = card.subTitle?.length > 200 ? card.subTitle.substr(0, 200) + '...' : card.subTitle;
  const title = card.type;
  const time = new Date(new Date() - new Date(card.createdAt)).getHours();
  console.log(time);
  const author = card.title;
  const price = '-';
  const authorImage = card.logoUrl;
  return (
    <div className={styles.card}>
      <div className={cn(styles.card__content, styles.card__content_collab)}>
        <div className={styles.card__contentTitle}>{title}</div>
        {text ? <div className={styles.card__contentText}>{text}</div> : null}
      </div>
      <div className={styles.card__footer}>
        <div className={styles.card__author}>
          <img src={authorImage ? client.UPLOAD_URL + authorImage : 'img/feedTemp/avatar.png'} />
          <div>{author}</div>
        </div>
        <div className={styles.card__time}>
          {time + ' hours ago'}
          <Clock color="#C3BAFA" />
        </div>
      </div>
      <div className={styles.card__footer}>
        <Button sm={1} iconRight={1} rounded={1} icon={<Heart color="#fff" />}>
          Apply
        </Button>
        <div className={styles.card__collab}>{price + ' $'}</div>
      </div>
    </div>
  );
};

export default index;
