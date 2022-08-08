import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const FeedCardText = ({ title, description, className }) => {
  return (
    <div className={className}>
      <div className={cn(styles.feedCardTitle, description && styles.feedCardTitle_withMargin)}>
        {title}
      </div>
      {description && <div className={styles.feedCardDescription}>{description}</div>}
    </div>
  );
};

export default FeedCardText;
