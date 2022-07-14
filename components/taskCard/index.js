import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Flash from 'components/icon/new/Flash';
import Cherry from 'components/icon/new/Cherry';
import Heart from 'components/icon/new/Heart';
import Clock from 'components/icon/new/Clock';
import Button from 'components/ui-new/Button';
import client from 'api/client';
import Dollar from 'components/icon/new/Dollar';

const index = ({ card }) => {
  let text = card.subTitle?.length > 200 ? card.subTitle.substr(0, 200) + '...' : card.subTitle;
  const title = card.type;

  const time = Math.floor((new Date() - new Date(card.createdAt)) / 1000 / 60 / 60);
  let timeMeasure = 'hours';
  if (time > 23) time = Math.floor(time / 24);
  timeMeasure = 'days';
  if (time > 6) time = Math.floor(time / 7);
  timeMeasure = 'weeks';

  const author = card.title;
  const budget = parseBudget(card.categories);
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
          {`${time} ${timeMeasure} ago`}
          <Clock color="#C3BAFA" />
        </div>
      </div>
      <div className={styles.card__footer}>
        <Button sm={1} iconRight={1} rounded={1} icon={<Heart color="#fff" />}>
          Apply
        </Button>
        {budget ? (
          <div className={styles.card__collab}>
            {budget + ' USD'}
            <Dollar color={'#C3BAFA'} className={styles.card__dollar} />
          </div>
        ) : (
          <div className={styles.card__collab}>
            Collab
            <Cherry color={'#C3BAFA'} />
          </div>
        )}
      </div>
    </div>
  );
};

function parseBudget(tags) {
  if (!Array.isArray(tags)) return;
  if (tags.length === 0) return;
  const budget = tags.filter((tag) => tag.includes('$'));
  if (budget.length === 0) return;
  return budget[0].slice(1, -1);
}

export default index;
