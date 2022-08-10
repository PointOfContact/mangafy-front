import React from 'react';
import styles from './styles.module.scss';
import { highlightURLs } from 'helpers/shared';

const FeedCardTaskContent = ({ title, description }) => {
  return (
    <div className={styles.feedCardTaskContent}>
      <div className={styles.feedCardTaskContent__title}>{title}</div>
      {description && (
        <div
          className={styles.feedCardTaskContent__description}
          dangerouslySetInnerHTML={{ __html: highlightURLs(description) }}></div>
      )}
    </div>
  );
};

export default FeedCardTaskContent;
