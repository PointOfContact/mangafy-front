import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { formatHtml } from 'helpers/shared';
import Button from 'components/ui-new/Button';
import Share from 'components/icon/new/Share';
import { ShareButtons } from 'components/share';
import Edit from 'components/icon/new/Edit';
import Close from 'components/icon/new/Close';

const FeedCardText = ({ title, description, className, isOwned, shareUrl, textOnly }) => {
  const [areShareButtonsVisible, setAreShareButtonsVisible] = useState(false);

  return (
    <div className={styles.feedCardText}>
      <div className={cn(styles.feedCardTitle, description && styles.feedCardTitle_withMargin)}>
        {title}
      </div>
      {description && (
        <div
          className={styles.feedCardDescription}
          dangerouslySetInnerHTML={{ __html: formatHtml(description) }}></div>
      )}
      {textOnly && (
        <div className={styles.share__hover}>
          {!isOwned ? (
            <div className={styles.share__buttons}>
              <Button
                rounded
                pink
                iconRight
                icon={<Share color="#fff" />}
                onClick={(e) => {
                  e.stopPropagation();
                  setAreShareButtonsVisible((old) => !old);
                }}>
                Share
              </Button>
              <ShareButtons
                className={cn(
                  styles.share__shareButtons,
                  areShareButtonsVisible && styles.share__shareButtons_active
                )}
                shareUrl={shareUrl}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          ) : (
            <div className={styles.share__buttons}>
              <Button rounded pink iconRight icon={<Edit color="#fff" />}>
                Edit
              </Button>
              <Button outline rounded pink iconRight icon={<Close color="#d11e8e" />}>
                Delete
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedCardText;
