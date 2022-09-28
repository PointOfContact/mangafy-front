import React from 'react';
import styles from './styles.module.scss';
import { formatHtml } from 'helpers/shared';

const FeedCardTaskContent = ({ title, description }) => {
  return (
    <div className={styles.feedCardTaskContent}>
      <div className={styles.feedCardTaskContent__title}>{title}</div>
      {description && (
        <div
          className={styles.feedCardTaskContent__description}
          dangerouslySetInnerHTML={{ __html: formatHtml(description) }}></div>
      )}
    </div>
  );
};

export default FeedCardTaskContent;
