import React from 'react';
import styles from './styles.module.scss';

const FeedCardTaskContent = ({ title, description }) => {
  return (
    <div className={styles.feedCardTaskContent}>
      <div className={styles.feedCardTaskContent__title}>{title}</div>
      <div className={styles.feedCardTaskContent__description}>{description}</div>
    </div>
  );
};

export default FeedCardTaskContent;
