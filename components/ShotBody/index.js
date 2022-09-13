import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const ShotBody = ({ shot, className }) => {
  return (
    <div className={cn(styles.body, className)}>
      {shot.image && <img className={styles.body__image} src={client.UPLOAD_URL + shot.image} />}
      <div className={styles.body__text}>
        <div className={styles.body__title}>{shot.title}</div>
        <div className={styles.body__description}>{shot.description}</div>
      </div>
    </div>
  );
};

export default ShotBody;
